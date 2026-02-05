from sqlalchemy import String, Date, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base
import datetime

class VehicleBlackout(Base):
    __tablename__ = "vehicle_blackouts"
    id: Mapped[str] = mapped_column(String, primary_key=True)
    vehicle_id: Mapped[str] = mapped_column(String, ForeignKey("vehicles.id"), index=True, nullable=False)
    
    start_date: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    end_date: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    reason: Mapped[str] = mapped_column(String, nullable=False, default="Maintenance")

    # Relationships
    vehicle = relationship("Vehicle", backref="blackouts")
