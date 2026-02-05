import secrets
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.session import get_db
from app.models.booking import Booking
from app.models.vehicle import Vehicle
from app.models.addon import Addon
from app.services.pricing import quote_total

router = APIRouter()

@router.get("/bookings")
async def list_bookings(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Booking))
    bookings = res.scalars().all()
    out = []
    for b in bookings:
        v = await db.get(Vehicle, b.vehicle_id)
        out.append({
            "id": b.id,
            "vehicle_id": b.vehicle_id,
            "vehicle_title": f"{v.make} {v.model}" if v else "Unknown",
            "start_date": b.start_date,
            "end_date": b.end_date,
            "status": b.status,
            "total_cents": b.total_cents,
            "deposit_cents": b.deposit_cents,
            "payment_status": b.payment_status,
        })
    return out

@router.post("/bookings")
async def create_booking(payload: dict, db: AsyncSession = Depends(get_db)):
    v = await db.get(Vehicle, payload["vehicle_id"])
    if not v: raise HTTPException(status_code=404, detail="Vehicle not found")
    a_res = await db.execute(select(Addon))
    catalog = {a.id: {"id": a.id, "name": a.name, "pricing_model": a.pricing_model, "price_cents": a.price_cents} for a in a_res.scalars().all()}
    days, base, discount, addons_total, fees, total, deposit, lines = quote_total(
        v.daily_cents, v.weekly_discount_pct, payload["start_date"], payload["end_date"], payload.get("addons", []), catalog
    )
    booking = Booking(
        id=f"bk_{secrets.token_hex(6)}",
        vehicle_id=v.id,
        start_date=payload["start_date"],
        end_date=payload["end_date"],
        status="PENDING_PAYMENT",
        total_cents=total,
        deposit_cents=deposit,
        payment_status="REQUIRES_PAYMENT",
    )
    db.add(booking)
    await db.commit()
    return {"booking_id": booking.id}
