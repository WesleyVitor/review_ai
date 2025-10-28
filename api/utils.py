import os
from google.oauth2 import id_token
from google.auth.transport import requests
import boto3
import io
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet
def verify_google_token(token):
    
    try:
        idinfo = id_token.verify_oauth2_token(token, requests.Request())
        print(idinfo)
        # Se quiser, garanta que veio do seu app
        
        return idinfo  # contém email, nome, picture etc.
    except ValueError:
        return None

def upload_review_to_r2(review_content, filename):
    # --- gera o PDF em memória ---
    buffer = io.BytesIO()
    styles = getSampleStyleSheet()
    doc = SimpleDocTemplate(buffer, pagesize=A4)
    story = []
    for line in review_content.split("\n"):
        story.append(Paragraph(line, styles["Normal"]))
        story.append(Spacer(1, 12))
    doc.build(story)
    buffer.seek(0)

    # --- envia ao R2 ---
    s3 = boto3.client(
        service_name="s3",
        endpoint_url=f'https://{os.getenv("ACCOUNT_ID")}.r2.cloudflarestorage.com',
        aws_access_key_id=os.getenv("ACCESS_KEY_ID"),
        aws_secret_access_key=os.getenv("SECRET_ACCESS_KEY"),
    )

    key = f"review/uploads/{filename}.pdf"
    s3.upload_fileobj(buffer, os.getenv("BUCKET_NAME"), key)

    public_url = os.getenv("PUBLIC_URL_R2")
    return f"{public_url}/{key}"

def delete_file_on_cloudflare_r2(filename):
    s3 = boto3.client(
        service_name ="s3",
        endpoint_url = f'https://{os.getenv("ACCOUNT_ID")}.r2.cloudflarestorage.com',
        aws_access_key_id = os.getenv("ACCESS_KEY_ID"),
        aws_secret_access_key = os.getenv("SECRET_ACCESS_KEY")

    )
    s3.delete_object(Bucket=os.getenv("BUCKET_NAME"), Key=f"review/uploads/{filename}.pdf")