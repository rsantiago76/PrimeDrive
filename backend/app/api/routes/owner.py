from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.session import get_db
from app.models.vehicle import Vehicle
from app.models.booking import Booking
from app.models.damage_report import DamageReport

router = APIRouter()

@router.get("/vehicles")
async def vehicles(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Vehicle))
    return [v.__dict__ | {"_sa_instance_state": None} for v in res.scalars().all()]

@router.get("/bookings")
async def bookings(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Booking))
    return [b.__dict__ | {"_sa_instance_state": None} for b in res.scalars().all()]

@router.get("/damage-reports")
async def reports(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(DamageReport))
    return [r.__dict__ | {"_sa_instance_state": None} for r in res.scalars().all()]
