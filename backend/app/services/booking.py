from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import date, datetime, timedelta
import uuid

from app.models.booking import Booking
from app.models.booking_addon import BookingAddon
from app.models.payment import Payment as PaymentModel
from app.models.audit import AuditLog
from app.services.availability import AvailabilityService
from app.services.pricing import PricingService
from app.services.payment import PaymentService
from app.schemas.booking import BookingCreate, Booking as BookingSchema

class BookingService:
    @staticmethod
    async def create_booking(db: AsyncSession, booking_data: BookingCreate, user_id: str, vehicle_details: dict) -> Booking:
        """
        Orchestrate booking creation:
        1. Lock vehicle
        2. Check Availability
        3. Calculate Price (re-verification)
        4. Create Booking, Addons, Audit records
        5. Create Payment Intent
        6. Return Booking with client_secret context if needed (usually returned separately)
        """
        # 1. Lock & check
        await AvailabilityService.lock_vehicle_for_booking(db, booking_data.vehicle_id)
        is_avail = await AvailabilityService.check_availability(
            db, booking_data.vehicle_id, booking_data.start_date, booking_data.end_date
        )
        if not is_avail:
            raise ValueError("Vehicle is no longer available for these dates.")

        # 2. Calculate Price (Server side truth)
        # We need vehicle details. Caller usually provides object or we fetch.
        # Assuming caller passed dict or we fetch here. Let's fetch to be safe/clean in service.
        # However, for efficiency, passing vehicle_details from router is better.
        quote = PricingService.calculate_quote(
            vehicle_daily_cents=vehicle_details['daily_cents'],
            vehicle_weekly_discount_pct=vehicle_details['weekly_discount_pct'],
            start_date=booking_data.start_date,
            end_date=booking_data.end_date,
            addons=booking_data.add_ons
        )

        booking_id = str(uuid.uuid4())
        
        # 3. Create Booking DB Object
        new_booking = Booking(
            id=booking_id,
            vehicle_id=booking_data.vehicle_id,
            renter_user_id=user_id,
            start_date=booking_data.start_date,
            end_date=booking_data.end_date,
            status="PENDING_PAYMENT",
            total_cents=quote.total_cents,
            deposit_cents=quote.deposit_cents,
            payment_status="REQUIRES_PAYMENT"
        )
        db.add(new_booking)

        # 4. Create Addons
        for addon in booking_data.add_ons:
            # Assuming addon.name could be mapped to an ID or we generate a placeholder/mock ID if real catalog isn't enforced strictly yet.
            # In a real app we'd query the Addon table.
            # For now, let's create a BookingAddon record assuming we have an ID or use name as ID scaffold.
            # We'll rely on the fact that for MVP we might not have seeded all addons yet, so we'll be careful.
            # Ideally: addon_id = lookup(addon.name).id
            # Scaffold:
            new_addon = BookingAddon(
                id=str(uuid.uuid4()),
                booking_id=booking_id,
                addon_id=addon.name, # Using name as FK placeholder if UUIDs not strictly enforced in code yet or we trust it matches
                qty=1, # Schema defaults to list of selections, assuming qty 1
                price_cents=addon.daily_rate_cents,
                pricing_model="PER_DAY" # Simplified assumption as per PricingService logic
            )
            db.add(new_addon) 

        # 5. Create Payment Intent
        pi_id, client_secret = PaymentService.create_deposit_intent(
            amount_cents=quote.deposit_cents,
            metadata={"booking_id": booking_id, "env": "test"}
        )

        # 6. Create Payment Record
        payment = PaymentModel(
            id=str(uuid.uuid4()),
            booking_id=booking_id,
            stripe_payment_intent_id=pi_id,
            amount_cents=quote.deposit_cents,
            type="DEPOSIT",
            status="CREATED",
            idempotency_key=booking_data.idempotency_key
        )
        db.add(payment)

        # 7. Audit Log
        audit = AuditLog(
            id=str(uuid.uuid4()),
            actor_user_id=user_id,
            action="CREATE_BOOKING",
            entity_type="BOOKING",
            entity_id=booking_id,
            metadata_json={"total": quote.total_cents, "deposit": quote.deposit_cents}
        )
        db.add(audit)

        await db.flush() # get IDs if needed
        # We attach client_secret to the object temporarily for response, 
        # or return it as part of a wrapper schema.
        # Since SQLAlchemy models don't hold arbitrary data well without ignore, 
        # we'll return a tuple or special structure in the router.
        
        return new_booking, client_secret

    @staticmethod
    async def cancel_booking(db: AsyncSession, booking_id: str, user_id: str) -> dict:
        """
        Cancel booking and handle refund logic.
        """
        stmt = select(Booking).where(Booking.id == booking_id)
        result = await db.execute(stmt)
        booking = result.scalars().first()
        
        if not booking:
            raise ValueError("Booking not found")
            
        if booking.renter_user_id != user_id: # Simple auth check, Admin should skip this
             raise ValueError("Not authorized")

        if booking.status in ["CANCELLED", "COMPLETED"]:
             raise ValueError("Cannot cancel this booking")

        # Refund Logic
        refund_amount = 0
        now = datetime.now().date()
        # Ensure dates are compatible types. mapped_column(Date) returns python date objects.
        days_until_start = (booking.start_date - now).days
        
        # Payment to refund?
        # Find succeeded deposit payment
        stmt_pymt = select(PaymentModel).where(
            PaymentModel.booking_id == booking_id, 
            PaymentModel.status == "SUCCEEDED",
            PaymentModel.type == "DEPOSIT"
        )
        res_pymt = await db.execute(stmt_pymt)
        payment = res_pymt.scalars().first()
        
        refund_status = "NONE"
        
        if payment:
            if days_until_start >= 2: # > 48 hours
                refund_amount = payment.amount_cents
                refund_status = "FULL"
            elif days_until_start >= 0: # Within 48 hours but before start
                refund_amount = int(payment.amount_cents * 0.5)
                refund_status = "PARTIAL"
            else:
                refund_amount = 0
                refund_status = "NO_REFUND"

            if refund_amount > 0:
                PaymentService.refund_payment(payment.stripe_payment_intent_id, refund_amount)
        
        booking.status = "CANCELLED"
        booking.payment_status = f"REFUNDED_{refund_status}"
        
        # Audit
        audit = AuditLog(
            id=str(uuid.uuid4()),
            actor_user_id=user_id,
            action="CANCEL_BOOKING",
            entity_type="BOOKING",
            entity_id=booking_id,
            metadata_json={"refund_amount": refund_amount, "days_before": days_until_start}
        )
        db.add(audit)
        
        return {"id": booking_id, "status": "CANCELLED", "refund_amount": refund_amount}
