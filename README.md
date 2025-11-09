# REVIEW AI

The project helps users generate reviews and exercises from a PDF file by leveraging the lightweight yet powerful OpenAI SDK framework.


## Tecnologies

- OpenAI SDK
- FastAPI
- Google Authentication
- Tailwind
- NextJS
- ReactJS

## How to Run

With the virtual enviroment created, install the dependencies

```bash
pip install -r api/requirements.txt
```

create the database
```bash
python api/database.py 
```

execute the server 
```
cd api
uvicorn main:app --reload
```

execute the ui code
```
cd review_ui
npm run dev
```