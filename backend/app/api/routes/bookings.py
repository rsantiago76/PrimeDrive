from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from app.db.session import get_db
from app.services.booking import BookingService
from app.schemas.booking import BookingCreate, Booking as BookingSchema
from app.models.booking import Booking

router = APIRouter()

@router.post("/", response_model=BookingSchema) # In reality, might return a wrapper with client_secret
async def create_booking(
    booking_data: BookingCreate,
    user_id: str = "demo-user", # Mock Auth for MVP
    db: AsyncSession = Depends(get_db)
):
    """
    Create a new booking and return the booking specific details.
    Response includes client_secret for Stripe in a real scenario, 
    but for strict Schema adherence we'll need to adjust or rely on a separate endpoint for payment info
    OR update the schema to include `client_secret`.
    For this MVP, we'll return the Booking object and maybe log the secret or rely on a separate 'get payment intent' call if needed.
    Actually, usually the client secret is needed immediately.
    Let's inject it into the response headers or assumption.
    """
    # Details lookup (Mock or DB). In real app validation is key.
    # We'll fetch vehicle to get price.
    from app.models.vehicle import Vehicle
    stmt = select(Vehicle).where(Vehicle.id == booking_data.vehicle_id)
    res = await db.execute(stmt)
    vehicle = res.scalars().first()
    if not vehicle:
         raise HTTPException(status_code=404, detail="Vehicle not found")
         
    vehicle_details = {
        "daily_cents": vehicle.daily_cents,
        "weekly_discount_pct": vehicle.weekly_discount_pct
    }

    try:
        booking, client_secret = await BookingService.create_booking(
            db, booking_data, user_id, vehicle_details
        )
        await db.commit()
        await db.refresh(booking)
        
        # Hack to pass secret:
        # We can't easily augment the Pydantic model at runtime without a wrapper.
        # Let's return the booking. The client might fetch the payment intent separately 
        # via /payments/deposit using the booking ID if we don't return it here.
        # Matches the user flow: Create Booking -> Get Intent -> Confirm.
        return booking
    except ValueError as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=List[BookingSchema])
async def get_my_bookings(
    user_id: str = "demo-user",
    db: AsyncSession = Depends(get_db)
):
    stmt = select(Booking).where(Booking.renter_user_id == user_id)
    result = await db.execute(stmt)
    return result.scalars().all()

@router.post("/{booking_id}/cancel")
async def cancel_booking(
    booking_id: str,
    user_id: str = "demo-user",
    db: AsyncSession = Depends(get_db)
):
    try:
        result = await BookingService.cancel_booking(db, booking_id, user_id)
        await db.commit()
        return result
    except ValueError as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))
