import boto3
from botocore.exceptions import ClientError
import os
import uuid

class UploadService:
    @staticmethod
    def _get_s3_client():
        # In a real app, use env vars or IAM roles
        # For MVP/Scaffold, we can mock if no creds, or try to init
        try:
            return boto3.client(
                's3',
                aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
                aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
                region_name=os.getenv("AWS_REGION", "us-east-1")
            )
        except Exception:
            return None

    @staticmethod
    def generate_presigned_url(filename: str, content_type: str, use_case: str = "DAMAGE_REPORT") -> dict:
        """
        Generate a presigned URL to share with the client to upload a file to S3.
        """
        bucket_name = os.getenv("S3_BUCKET_NAME", "prime-drive-uploads-mock")
        object_name = f"{use_case.lower()}/{uuid.uuid4()}/{filename}"
        
        s3_client = UploadService._get_s3_client()
        
        # Scaffold/Mock mode if no S3 access
        if not s3_client or bucket_name == "prime-drive-uploads-mock":
            # Return a mock URL that the frontend can try to POST to (it will fail or we mock it in dev)
            # OR we can return a URL to a local endpoint if we implemented local upload handler.
            # For this MVP requirement "S3-style signed URLs", let's return a fake structure
            return {
                "url": "https://s3.amazonaws.com/mock-bucket",
                "fields": {"key": object_name, "AWSAccessKeyId": "mock"},
                "key": object_name,
                "full_url": f"https://mock-bucket.s3.amazonaws.com/{object_name}"
            }

        try:
            # We use generate_presigned_post for uploads usually
            response = s3_client.generate_presigned_post(
                Bucket=bucket_name,
                Key=object_name,
                Fields={"Content-Type": content_type},
                Conditions=[
                    {"Content-Type": content_type},
                    ["content-length-range", 0, 10485760] # 10MB limit
                ],
                ExpiresIn=3600
            )
            # Add the key to the response so frontend knows what to save in DB
            response["key"] = object_name
            response["full_url"] = f"https://{bucket_name}.s3.amazonaws.com/{object_name}"
            return response
        except ClientError as e:
            print(e)
            return None
