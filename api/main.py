import tempfile

from typing import Annotated
from pydantic import BaseModel
from fastapi import FastAPI, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from agents_core.review_agent import ReviewAgent
from agents_core.exercise_agent import ExerciseAgent

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ou sua lista de domínios
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/review/")
async def review(term: Annotated[str, Form()], file: UploadFile):
    
    review_agent = ReviewAgent()
    exercise_agent = ExerciseAgent()

    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        content = await file.read()
        tmp.write(content)
        tmp_path = tmp.name
    
    review_content = await review_agent.run(term, tmp_path)
    
    exercises_content = await exercise_agent.run(review_content)
    
    return {"term": term, "review_content": review_content, "exercises_content":exercises_content}

class BodyRequest(BaseModel):
    token: str

@app.get("/review_files/")
async def review_files(token: str):
    
    lista = [
        {
            "id": '12',
            "name": "Jonas",
            "link": "link"
        },
        {
            "id": '13',
            "name": "Jonas",
            "link": "link"
        }
    ]
    return {"token":token, "files":lista}