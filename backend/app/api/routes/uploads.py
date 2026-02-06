from fastapi import APIRouter, HTTPException, Body
from app.services.uploads import UploadService
from app.schemas.damage_report import PresignedUrlRequest

router = APIRouter()

@router.post("/presigned-url")
async def get_presigned_url(request: PresignedUrlRequest):
    """
    Get a presigned URL for uploading files to S3.
    """
    response = UploadService.generate_presigned_url(
        filename=request.filename,
        content_type=request.content_type,
        use_case=request.use_case
    )
    
    if not response:
        raise HTTPException(status_code=500, detail="Could not generate presigned URL")
        
    return response
