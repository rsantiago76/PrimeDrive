from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_
from typing import List
from datetime import date
from app.db.session import get_db
from app.models.vehicle import Vehicle
from app.models.booking import Booking
from app.models.damage_report import DamageReport
from app.schemas.owner import OwnerMetrics, VehicleCreate
from app.schemas.vehicle import Vehicle as VehicleSchema

router = APIRouter()

# Mock Auth dependency
def get_current_owner_id():
    return "demo-owner-id"

@router.get("/metrics", response_model=OwnerMetrics)
async def get_metrics(
    user_id: str = Depends(get_current_owner_id),
    db: AsyncSession = Depends(get_db)
):
    # Active Vehicles
    stmt_v = select(func.count(Vehicle.id)).where(Vehicle.owner_id == user_id, Vehicle.is_active == True)
    active_vehicles = (await db.execute(stmt_v)).scalar() or 0
    
    # Upcoming Bookings
    stmt_b = select(func.count(Booking.id)).where(
        Booking.vehicle_id.in_(select(Vehicle.id).where(Vehicle.owner_id == user_id)),
        Booking.start_date > date.today(),
        Booking.status == "CONFIRMED"
    )
    upcoming = (await db.execute(stmt_b)).scalar() or 0
    
    # Active Rentals
    stmt_r = select(func.count(Booking.id)).where(
        Booking.vehicle_id.in_(select(Vehicle.id).where(Vehicle.owner_id == user_id)),
        Booking.start_date <= date.today(),
        Booking.end_date >= date.today(),
        Booking.status == "CONFIRMED"
    )
    active_rentals = (await db.execute(stmt_r)).scalar() or 0
    
    # Earnings (Total) - Simplistic generic sum
    # Real app would filter by payout status
    stmt_e = select(func.sum(Booking.total_cents)).where(
        Booking.vehicle_id.in_(select(Vehicle.id).where(Vehicle.owner_id == user_id)),
        Booking.payment_status == "PAID" # Assuming we settle
    )
    earnings = (await db.execute(stmt_e)).scalar() or 0
    
    # Open Reports
    # Damage report doesn't link to owner directly, but via booking -> vehicle -> owner
    # For MVP we might cheat or do the join
    # stmt_d = select(func.count(DamageReport.id)).join(Booking).join(Vehicle).where(
    #     Vehicle.owner_id == user_id,
    #     DamageReport.status == "OPEN"
    # )
    # Since damage report uses booking_id, and Booking has vehicle_id:
    # DamageReport -> Booking -> Vehicle
    stmt_d = select(func.count(DamageReport.id)).where(
        DamageReport.booking_id.in_(
            select(Booking.id).where(
                Booking.vehicle_id.in_(select(Vehicle.id).where(Vehicle.owner_id == user_id))
            )
        ),
        DamageReport.status == "OPEN"
    )
    open_reports = (await db.execute(stmt_d)).scalar() or 0
    
    return OwnerMetrics(
        active_vehicles=active_vehicles,
        upcoming_bookings=upcoming,
        active_rentals=active_rentals,
        total_earnings_cents=int(earnings) if earnings else 0,
        open_damage_reports=open_reports
    )

@router.post("/vehicles", response_model=VehicleSchema)
async def create_vehicle(
    vehicle_data: VehicleCreate,
    user_id: str = Depends(get_current_owner_id),
    db: AsyncSession = Depends(get_db)
):
    import uuid
    vehicle = Vehicle(
        id=str(uuid.uuid4()),
        owner_id=user_id,
        make=vehicle_data.make,
        model=vehicle_data.model,
        year=vehicle_data.year,
        category=vehicle_data.category,
        location_city=vehicle_data.location_city,
        location_state=vehicle_data.location_state,
        daily_cents=vehicle_data.daily_cents,
        features=vehicle_data.features,
        images=vehicle_data.images,
        is_active=True
    )
    db.add(vehicle)
    await db.commit()
    await db.refresh(vehicle)
    return vehicle
    
# Listing endpoints for Owner specific view
@router.get("/my-vehicles", response_model=List[VehicleSchema])
async def my_vehicles(
    user_id: str = Depends(get_current_owner_id),
    db: AsyncSession = Depends(get_db)
):
    stmt = select(Vehicle).where(Vehicle.owner_id == user_id)
    res = await db.execute(stmt)
    return res.scalars().all()
