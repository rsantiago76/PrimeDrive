from pydantic import BaseModel
from typing import List, Optional
from datetime import date
from app.schemas.vehicle import Vehicle
from app.schemas.booking import Booking
from app.schemas.damage_report import DamageReport

class OwnerMetrics(BaseModel):
    active_vehicles: int
    upcoming_bookings: int
    active_rentals: int
    total_earnings_cents: int
    open_damage_reports: int

class VehicleCreate(BaseModel):
    make: str
    model: str
    year: int
    category: str
    location_city: str
    location_state: str
    daily_cents: int
    features: List[str] = []
    images: List[str] = []

class VehicleUpdate(BaseModel):
    daily_cents: Optional[int] = None
    is_active: Optional[bool] = None
    # ... other fields
