import secrets
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.models.booking import Booking
from app.models.damage_report import DamageReport

router = APIRouter()

@router.post("")
async def create_report(payload: dict, db: AsyncSession = Depends(get_db)):
    booking = await db.get(Booking, payload["booking_id"])
    if not booking: raise HTTPException(status_code=404, detail="Booking not found")

    report = DamageReport(
        id=f"dr_{secrets.token_hex(6)}",
        booking_id=booking.id,
        vehicle_id=booking.vehicle_id,
        reporter_user_id="demo-user",
        notes=payload.get("notes", ""),
        status="OPEN",
    )
    db.add(report)
    await db.commit()
    return {"report_id": report.id}
