from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class DamageReportBase(BaseModel):
    description: str

class DamageReportCreate(DamageReportBase):
    booking_id: str
    vehicle_id: str
    photo_urls: List[str] = []

class DamageReportUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None

class DamageReport(DamageReportBase):
    id: str
    booking_id: str
    vehicle_id: str
    reporter_user_id: str
    status: str
    photo_urls: List[str]
    # created_at: datetime # If we add timestamp to model

    class Config:
        from_attributes = True

class PresignedUrlRequest(BaseModel):
    filename: str
    content_type: str
    use_case: str = "DAMAGE_REPORT" # or VEHICLE_IMAGE
