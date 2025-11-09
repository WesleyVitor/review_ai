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

create .env file and add your OPENAI_API_KEY key
```bash
echo 'OPENAI_API_KEY="sk-1234-abc"' >> .env
```

execute the server 
```bash
cd api
uvicorn main:app --reload
```

execute the ui code
```bash
cd review_ui
npm run dev
```