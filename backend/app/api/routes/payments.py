import secrets
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.session import get_db
from app.models.booking import Booking
from app.models.payment import Payment

router = APIRouter()

@router.post("/deposit")
async def deposit(payload: dict, db: AsyncSession = Depends(get_db)):
    booking = await db.get(Booking, payload["booking_id"])
    if not booking: raise HTTPException(status_code=404, detail="Booking not found")

    existing = await db.execute(select(Payment).where(Payment.booking_id == booking.id))
    p = existing.scalars().first()
    if p:
        return {"client_secret": p.stripe_payment_intent_id or "pi_existing", "deposit_cents": booking.deposit_cents, "status": p.status}

    idempotency_key = secrets.token_hex(16)
    fake_intent = f"pi_{secrets.token_hex(8)}_secret_{secrets.token_hex(12)}"

    payment = Payment(
        id=f"pay_{secrets.token_hex(6)}",
        booking_id=booking.id,
        stripe_payment_intent_id=fake_intent,
        amount_cents=booking.deposit_cents,
        status="SUCCEEDED",
        idempotency_key=idempotency_key,
    )
    db.add(payment)

    # Demo: mark paid immediately. Production: confirm client-side + webhook.
    booking.payment_status = "PAID"
    booking.status = "CONFIRMED"

    await db.commit()
    return {"client_secret": fake_intent, "deposit_cents": booking.deposit_cents, "status": payment.status}
