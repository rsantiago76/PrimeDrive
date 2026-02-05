from datetime import date
from sqlalchemy import select, and_, or_
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.booking import Booking
from app.models.blackout import VehicleBlackout
from app.models.vehicle import Vehicle

class AvailabilityService:
    @staticmethod
    async def check_availability(
        db: AsyncSession, 
        vehicle_id: str, 
        start_date: date, 
        end_date: date
    ) -> bool:
        """
        Check if a vehicle is available for the given date range.
        
        Rules:
        - start_date < end_date
        - No overlap with CONFIRMED bookings
        - No overlap with blackout_dates
        - Adjacent ranges allowed
        
        Overlap logic: (ExistingStart < RequestedEnd) AND (ExistingEnd > RequestedStart)
        """
        if start_date >= end_date:
            raise ValueError("Start date must be before end date")
        
        # 1. Check for overlapping CONFIRMED bookings
        # We assume status 'CONFIRMED' blocks availability. 
        # 'PENDING_PAYMENT' might also block for a short window, but let's stick to CONFIRMED for now or blocked statuses.
        blocking_statuses = ["CONFIRMED", "PENDING_PAYMENT"] 
        
        stmt_bookings = select(Booking).where(
            Booking.vehicle_id == vehicle_id,
            Booking.status.in_(blocking_statuses),
            and_(
                Booking.start_date < end_date,
                Booking.end_date > start_date
            )
        )
        result_bookings = await db.execute(stmt_bookings)
        if result_bookings.scalars().first():
            return False

        # 2. Check for overlapping Blackout dates
        stmt_blackouts = select(VehicleBlackout).where(
            VehicleBlackout.vehicle_id == vehicle_id,
            and_(
                VehicleBlackout.start_date < end_date,
                VehicleBlackout.end_date > start_date
            )
        )
        result_blackouts = await db.execute(stmt_blackouts)
        if result_blackouts.scalars().first():
            return False
            
        return True

    @staticmethod
    async def lock_vehicle_for_booking(db: AsyncSession, vehicle_id: str):
        """
        Acquire a row-level lock on the vehicle to prevent concurrent booking race conditions.
        This should be called inside a transaction before the final availability check and booking creation.
        """
        # PostgreSQL syntax: FOR UPDATE
        stmt = select(Vehicle).where(Vehicle.id == vehicle_id).with_for_update()
        await db.execute(stmt)
