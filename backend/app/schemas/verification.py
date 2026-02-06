from pydantic import BaseModel
from typing import Optional
from enum import Enum

class VerificationStatus(str, Enum):
    UNVERIFIED = "UNVERIFIED"
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"

class DriverVerificationRequest(BaseModel):
    license_front_url: str
    license_back_url: str
    selfie_url: Optional[str] = None

class VerificationStatusUpdate(BaseModel):
    status: VerificationStatus
    
class DriverVerificationResponse(BaseModel):
    user_id: str
    status: VerificationStatus
    license_front_url: Optional[str]
    license_back_url: Optional[str]
