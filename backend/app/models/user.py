from sqlalchemy import String, Enum
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base
import enum

class UserRole(str, enum.Enum):
    DRIVER = "DRIVER"
    OWNER = "OWNER"
    ADMIN = "ADMIN"

class VerificationStatus(str, enum.Enum):
    UNVERIFIED = "UNVERIFIED"
    PENDING_REVIEW = "PENDING_REVIEW"
    VERIFIED = "VERIFIED"
    REJECTED = "REJECTED"

class UserProfile(Base):
    __tablename__ = "user_profiles"
    
    id: Mapped[str] = mapped_column(String, primary_key=True)  # Cognito SUB
    email: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    role: Mapped[UserRole] = mapped_column(Enum(UserRole), default=UserRole.DRIVER, nullable=False)
    verification_status: Mapped[VerificationStatus] = mapped_column(
        Enum(VerificationStatus), 
        default=VerificationStatus.UNVERIFIED,
        nullable=False
    )
    license_front_url: Mapped[str] = mapped_column(String, nullable=True)
    license_back_url: Mapped[str] = mapped_column(String, nullable=True)
