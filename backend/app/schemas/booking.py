from pydantic import BaseModel, Field, field_validator
from typing import List, Optional
from datetime import date
from app.schemas.vehicle import Vehicle

class AddOnSelection(BaseModel):
    name: str
    daily_rate_cents: int

class BookingBase(BaseModel):
    start_date: date
    end_date: date

class BookingCreate(BookingBase):
    vehicle_id: str
    add_ons: List[AddOnSelection] = []
    idempotency_key: str

    @field_validator('end_date')
    def end_date_must_be_after_start_date(cls, v, values):
        if 'start_date' in values.data and v <= values.data['start_date']:
            raise ValueError('end_date must be after start_date')
        return v

class BookingQuote(BaseModel):
    vehicle_id: str
    start_date: date
    end_date: date
    total_days: int
    base_price_cents: int
    discount_cents: int
    add_ons_total_cents: int
    total_cents: int
    deposit_cents: int

class Booking(BookingBase):
    id: str
    vehicle_id: str
    renter_user_id: str
    status: str
    total_cents: int
    deposit_cents: int
    payment_status: str
    add_ons: List[dict] = []
    
    vehicle: Optional[Vehicle] = None

    class Config:
        from_attributes = True
