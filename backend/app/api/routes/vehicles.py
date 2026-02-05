from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional
from datetime import date
from app.db.session import get_db
from app.models.vehicle import Vehicle
from app.schemas.booking import BookingQuote, AddOnSelection
from app.services.pricing import PricingService

router = APIRouter()

@router.post("/{vehicle_id}/quote", response_model=BookingQuote)
async def calculate_quote(
    vehicle_id: str,
    start_date: date = Body(...),
    end_date: date = Body(...),
    add_ons: List[AddOnSelection] = Body(default=[]),
    db: AsyncSession = Depends(get_db)
):
    """
    Calculate a price quote for a vehicle booking.
    """
    stmt = select(Vehicle).where(Vehicle.id == vehicle_id)
    result = await db.execute(stmt)
    vehicle = result.scalars().first()
    
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")

    try:
        quote = PricingService.calculate_quote(
            vehicle_daily_cents=vehicle.daily_cents,
            vehicle_weekly_discount_pct=vehicle.weekly_discount_pct,
            start_date=start_date,
            end_date=end_date,
            addons=add_ons
        )
        quote.vehicle_id = vehicle_id
        return quote
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
