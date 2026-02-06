from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.session import get_db
from app.models.user import UserProfile
from app.schemas.verification import DriverVerificationRequest, DriverVerificationResponse, VerificationStatusUpdate
from app.services.uploads import UploadService
from app.schemas.damage_report import PresignedUrlRequest

router = APIRouter()

@router.post("/upload-url")
async def get_verification_upload_url(
    filename: str = Body(..., embed=True),
    content_type: str = Body(..., embed=True)
):
    """
    Get presigned URL specifically for driver docs.
    """
    return UploadService.generate_presigned_url(
        filename=filename, 
        content_type=content_type, 
        use_case="DRIVER_DOCS"
    )

@router.post("/", response_model=DriverVerificationResponse)
async def submit_verification(
    data: DriverVerificationRequest,
    user_id: str = "demo-user", # Mock auth
    db: AsyncSession = Depends(get_db)
):
    stmt = select(UserProfile).where(UserProfile.id == user_id)
    res = await db.execute(stmt)
    user = res.scalars().first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    user.license_front_url = data.license_front_url
    user.license_back_url = data.license_back_url
    user.verification_status = "PENDING"
    
    await db.commit()
    await db.refresh(user)
    
    return DriverVerificationResponse(
        user_id=user.id,
        status=user.verification_status,
        license_front_url=user.license_front_url,
        license_back_url=user.license_back_url
    )

@router.get("/me", response_model=DriverVerificationResponse)
async def get_my_verification_status(
    user_id: str = "demo-user",
    db: AsyncSession = Depends(get_db)
):
    stmt = select(UserProfile).where(UserProfile.id == user_id)
    res = await db.execute(stmt)
    user = res.scalars().first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    return DriverVerificationResponse(
        user_id=user.id,
        status=user.verification_status,
        license_front_url=user.license_front_url,
        license_back_url=user.license_back_url
    )

@router.patch("/admin/{target_user_id}", response_model=DriverVerificationResponse)
async def admin_update_status(
    target_user_id: str,
    update: VerificationStatusUpdate,
    db: AsyncSession = Depends(get_db)
):
    stmt = select(UserProfile).where(UserProfile.id == target_user_id)
    res = await db.execute(stmt)
    user = res.scalars().first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    user.verification_status = update.status
    await db.commit()
    
    return DriverVerificationResponse(
        user_id=user.id,
        status=user.verification_status,
        license_front_url=user.license_front_url,
        license_back_url=user.license_back_url
    )
