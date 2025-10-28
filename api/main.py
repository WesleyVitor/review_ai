import tempfile
import jwt
import os
from datetime import datetime, timedelta, timezone

from typing import Annotated
from pydantic import BaseModel
from fastapi import FastAPI, Form, UploadFile, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from agents_core.review_agent import ReviewAgent
from agents_core.exercise_agent import ExerciseAgent
from database import SessionLocal
from models import User, Review

from utils import verify_google_token, delete_file_on_cloudflare_r2, upload_review_to_r2
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ou sua lista de domínios
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




class TokenModel(BaseModel):
    token: str

SECRET_KEY = os.getenv("SECRET_KEY", "sua-chave-super-secreta")
@app.post("/auth/google")
async def auth_google(data: TokenModel):
    session = SessionLocal()
    info = verify_google_token(data.token)

    if not info:
        return {"error":"dont exists"}

    name = info.get("name")
    email = info.get("email")
    picture_url = info.get("picture")
    
    user = session.query(User).filter_by(email=email).first()
    if not user:
        user = User(
            name=name,
            email=email,
            picture_url=picture_url
        )
        session.add(user)
        session.commit()
    
    
    token = jwt.encode(
        {"user": user.id, "exp":  datetime.now(timezone.utc) + timedelta(minutes=30)},
        SECRET_KEY,
        algorithm="HS256"
    )

    return {"token":token}

    
@app.post("/review/add")
async def add_review(term: Annotated[str, Form()], file: UploadFile, request: Request):
    auth_header = request.headers.get("authorization")

    if not auth_header:
        return JSONResponse({"err":"Token invalid"}, 403)

    filename_review = ""
    filename_exercises = ""
    try:
         # Decodifica o token
        token = auth_header.split()[1]
        
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = decoded.get("user")
        review_agent = ReviewAgent()
        exercise_agent = ExerciseAgent()

        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            content = await file.read()
            tmp.write(content)
            tmp_path = tmp.name
        
        review_content = await review_agent.run(term, tmp_path)
        
        exercises_content = await exercise_agent.run(review_content)
        

        session = SessionLocal()
        
        review_url = upload_review_to_r2(review_content, f"review_{file.filename}_{user_id}")
        exercise_url = upload_review_to_r2(exercises_content, f"exercises_{file.filename}_{user_id}")

        filename_review = f"review_{file.filename}_{user_id}"
        filename_exercises = f"exercises_{file.filename}_{user_id}"
        review_object = Review(
            filename = file.filename,
            s3_url = review_url,
            media_type=file.content_type,
            review_type="Review",
            user_id=user_id
        )
        session.add(review_object)

        exercises_object = Review(
            filename = file.filename,
            s3_url = review_url,
            media_type=file.content_type,
            review_type="Exercises",
            user_id=user_id
        )
        session.add(exercises_object)
        session.commit()

        return JSONResponse({"ok": "Success"})
    except jwt.ExpiredSignatureError:
        return JSONResponse({"err":"Token expired"}, 401)
    except jwt.InvalidTokenError:
        return JSONResponse({"err":"Token invalid"}, 403)
    except Exception as e:
        print("entrou")
        print(e)
        delete_file_on_cloudflare_r2(filename_review)
        delete_file_on_cloudflare_r2(filename_exercises)
    #return {"term": term, "review_content": review_content, "exercises_content":exercises_content}
    



@app.get("/review/list")
async def list_review(request: Request):
    auth_header = request.headers.get("authorization")

    if not auth_header:
        return JSONResponse({"err":"Token invalid"})

    try:
        # Decodifica o token
        token = auth_header.split()[1]
        
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = decoded.get("user")
        session = SessionLocal()
        reviews = session.query(Review).filter_by(user_id=user_id).order_by(Review.id.desc()).all()
        
        result = [
            {
                "id": r.id,
                "name": r.filename,
                "link": r.s3_url,
                "review_type": r.review_type
            }
            for r in reviews
        ]

        return JSONResponse({"files": result})
        
    except jwt.ExpiredSignatureError:
        return JSONResponse({"err":"Token expired"}, 401)
    except jwt.InvalidTokenError:
        return JSONResponse({"err":"Token invalid"}, 403)

