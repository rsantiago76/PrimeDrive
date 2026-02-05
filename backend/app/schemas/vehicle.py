from pydantic import BaseModel, RootModel, Field
from typing import List, Optional

class VehicleBase(BaseModel):
    make: str
    model: str
    year: int
    category: str
    location_city: str
    location_state: str
    daily_cents: int
    weekly_discount_pct: int = 0
    mileage_limit_per_day: int = 200
    features: List[str] = []
    images: List[str] = []

class VehicleCreate(VehicleBase):
    pass

class VehicleUpdate(BaseModel):
    daily_cents: Optional[int] = None
    is_active: Optional[bool] = None
    features: Optional[List[str]] = None
    images: Optional[List[str]] = None

class Vehicle(VehicleBase):
    id: str
    owner_id: str
    is_active: bool

    class Config:
        from_attributes = True

class VehicleList(Vehicle):
    pass
