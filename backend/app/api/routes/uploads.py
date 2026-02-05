import secrets
from fastapi import APIRouter

router = APIRouter()

@router.post("/driver-documents/upload-url")
async def driver_doc_upload_url(payload: dict):
    file_key = f"driver-docs/{secrets.token_hex(8)}.jpg"
    upload_url = f"https://example-presigned-url.invalid/{file_key}"
    return {"file_key": file_key, "upload_url": upload_url}

@router.post("/damage-reports/{report_id}/photos/upload-url")
async def damage_photo_upload_url(report_id: str):
    file_key = f"damage-photos/{report_id}/{secrets.token_hex(8)}.jpg"
    upload_url = f"https://example-presigned-url.invalid/{file_key}"
    return {"file_key": file_key, "upload_url": upload_url}
