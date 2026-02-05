import pytest
import datetime
from app.services.availability import AvailabilityService
# Mocks would be used in a real scenario, here we'll define a simple test structure
# assuming an async session fixture 'db'

@pytest.mark.asyncio
async def test_availability_no_conflicts(db_session, create_vehicle):
    vehicle = await create_vehicle()
    available = await AvailabilityService.check_availability(
        db_session, 
        vehicle.id, 
        datetime.date(2024, 1, 1), 
        datetime.date(2024, 1, 5)
    )
    assert available is True

@pytest.mark.asyncio
async def test_availability_overlap_booking(db_session, create_vehicle, create_booking):
    vehicle = await create_vehicle()
    # Create existing booking: Jan 10 - Jan 15
    await create_booking(vehicle.id, datetime.date(2024, 1, 10), datetime.date(2024, 1, 15))
    
    # Test overlap: Jan 12 - Jan 14
    available = await AvailabilityService.check_availability(
        db_session, 
        vehicle.id, 
        datetime.date(2024, 1, 12), 
        datetime.date(2024, 1, 14)
    )
    assert available is False

@pytest.mark.asyncio
async def test_availability_adjacency_allowed(db_session, create_vehicle, create_booking):
    vehicle = await create_vehicle()
    # Create existing booking: Jan 10 - Jan 15
    await create_booking(vehicle.id, datetime.date(2024, 1, 10), datetime.date(2024, 1, 15))
    
    # Test adjacent before: Jan 5 - Jan 10
    available_before = await AvailabilityService.check_availability(
        db_session, 
        vehicle.id, 
        datetime.date(2024, 1, 5), 
        datetime.date(2024, 1, 10)
    )
    assert available_before is True
    
    # Test adjacent after: Jan 15 - Jan 20
    available_after = await AvailabilityService.check_availability(
        db_session, 
        vehicle.id, 
        datetime.date(2024, 1, 15), 
        datetime.date(2024, 1, 20)
    )
    assert available_after is True

@pytest.mark.asyncio
async def test_start_date_ge_end_date(db_session, create_vehicle):
    vehicle = await create_vehicle()
    with pytest.raises(ValueError):
        await AvailabilityService.check_availability(
            db_session, 
            vehicle.id, 
            datetime.date(2024, 1, 10), 
            datetime.date(2024, 1, 10) # Same day
        )
