from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from enum import Enum

class UserRole(str, Enum):
    DRIVER = "DRIVER"
    OWNER = "OWNER"
    ADMIN = "ADMIN"

class VerificationStatus(str, Enum):
    UNVERIFIED = "UNVERIFIED"
    PENDING_REVIEW = "PENDING_REVIEW"
    VERIFIED = "VERIFIED"
    REJECTED = "REJECTED"

class UserBase(BaseModel):
    email: EmailStr

class UserProfile(UserBase):
    id: str
    role: UserRole
    verification_status: VerificationStatus
    license_front_url: Optional[str] = None
    license_back_url: Optional[str] = None

    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    # Only for verification updates in this MVP
    license_front_url: Optional[str] = None
    license_back_url: Optional[str] = None
