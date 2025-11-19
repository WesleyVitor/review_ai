# ReviewAI

ReviewAI is an intelligent study assistant application that uses AI to generate educational reviews and exercises from PDF documents. The system leverages Retrieval Augmented Generation (RAG) to extract relevant information from uploaded PDFs and creates structured study materials.

## Project Overview

This project is divided into two main components:
- **API**: FastAPI backend that handles authentication, document processing, and AI agent orchestration
- **Frontend**: Next.js web application that provides the user interface

## Features

- 🔐 **Google OAuth Authentication**: Secure user authentication using Google Sign-In
- 📄 **PDF Document Processing**: Upload and process PDF files for content extraction
- 🤖 **AI-Powered Review Generation**: Automatically generates structured reviews from PDF content using RAG
- ✏️ **Exercise Creation**: Generates educational exercises (multiple-choice and short-answer questions) based on review content
- 📚 **Review History**: Track and access all previously generated reviews and exercises
- ☁️ **Cloud Storage**: Stores generated PDFs in Cloudflare R2 for easy access
- 📱 **Responsive Design**: Mobile-friendly interface with adaptive layouts

## Architecture

### Backend (API)

The backend is built with **FastAPI** and includes:

- **Authentication System**: JWT-based authentication with Google OAuth integration
- **AI Agents**:
  - `ReviewAgent`: Uses RAG to extract relevant information from PDFs and generate structured reviews
  - `ExerciseAgent`: Creates educational exercises from review content
- **RAG System**: Implements document retrieval using LangChain, OpenAI embeddings, and vector stores
- **Database**: SQLite database with SQLAlchemy ORM for user and review management
- **File Storage**: Integration with Cloudflare R2 for storing generated PDFs

### Frontend (Review UI)

The frontend is built with **Next.js 15** and **React 19**, featuring:

- **Modern UI Components**: Built with Radix UI and Tailwind CSS
- **State Management**: React Query for server state management
- **Responsive Layout**: Mobile and desktop optimized layouts
- **Google OAuth Integration**: Client-side Google authentication

## Tech Stack

### Backend
- **FastAPI** - Web framework
- **OpenAI Agents** - AI agent framework
- **LangChain** - RAG and document processing
- **SQLAlchemy** - ORM for database operations
- **PyJWT** - JWT token handling
- **Google Auth** - OAuth verification
- **Boto3** - Cloudflare R2 integration
- **ReportLab** - PDF generation
- **PyPDF** - PDF text extraction

### Frontend
- **Next.js 15** - React framework
- **React 19** - UI library
- **Tailwind CSS** - Styling
- **Radix UI** - Component primitives
- **React Query** - Data fetching and caching
- **Google OAuth** - Client-side authentication

## Project Structure

```
reviewAI/
├── api/                          # Backend API
│   ├── agents_core/             # AI agents
│   │   ├── review_agent.py      # Review generation agent
│   │   └── exercise_agent.py    # Exercise creation agent
│   ├── rag/                     # RAG implementation
│   │   └── rag.py               # Document retrieval and embeddings
│   ├── main.py                  # FastAPI application and routes
│   ├── models.py                # Database models (User, Review)
│   ├── database.py              # Database configuration
│   ├── utils.py                 # Utility functions (auth, file upload)
│   └── requirements.txt         # Python dependencies
│
└── review_ui/                   # Frontend application
    ├── app/                     # Next.js app directory
    │   ├── page.js              # Login page
    │   ├── dashboard/           # Dashboard page
    │   └── Components/          # React components
    │       ├── Aside/           # Sidebar navigation
    │       ├── Main/            # Main content components
    │       └── Errors/          # Error handling
    ├── components/               # Shared UI components
    └── hooks/                   # Custom React hooks
```

## API Endpoints

### Authentication
- `POST /auth/google` - Authenticate user with Google OAuth token
  - Returns: JWT token for subsequent requests

### Reviews
- `POST /review/add` - Upload PDF and generate review + exercises
  - Parameters:
    - `term`: Search term or chapter name
    - `file`: PDF file upload
  - Returns: Success confirmation
  - Generates two PDFs: review and exercises, stored in Cloudflare R2

- `GET /review/list` - Get all reviews for authenticated user
  - Returns: List of reviews and exercises with download links

## Setup Instructions

### Prerequisites
- Python 3.12+
- Node.js 18+
- OpenAI API key
- Google OAuth credentials
- Cloudflare R2 account (or AWS S3 compatible storage)

### Backend Setup

1. Navigate to the API directory:
```bash
cd api
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
Create a `.env` file in the `api/` directory with:
```env
OPENAI_API_KEY=your_openai_api_key
SECRET_KEY=your_jwt_secret_key
ACCOUNT_ID=your_cloudflare_account_id
ACCESS_KEY_ID=your_r2_access_key
SECRET_ACCESS_KEY=your_r2_secret_key
BUCKET_NAME=your_bucket_name
PUBLIC_URL_R2=your_public_r2_url
```

5. Initialize the database:
```bash
python database.py
```

6. Run the server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd review_ui
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the `review_ui/` directory with:
```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_HOST_API=http://localhost:8000
```

4. Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## How It Works

1. **User Authentication**: Users sign in with Google OAuth
2. **PDF Upload**: User uploads a PDF document and provides a search term/chapter name
3. **Document Processing**: 
   - PDF is loaded and split into chunks
   - Chunks are embedded using OpenAI embeddings
   - Vector store is created for semantic search
4. **Review Generation**: 
   - ReviewAgent uses RAG to retrieve relevant passages
   - Generates a structured review in Portuguese
5. **Exercise Creation**: 
   - ExerciseAgent creates 5 exercises (multiple-choice and short-answer) based on the review
6. **Storage**: Both review and exercises are converted to PDFs and stored in Cloudflare R2
7. **Access**: Users can view and download all their generated materials from the dashboard

## Database Schema

### Users Table
- `id`: Primary key
- `email`: User email (unique)
- `name`: User name
- `picture_url`: Profile picture URL

### Reviews Table
- `id`: Primary key
- `filename`: Original PDF filename
- `s3_url`: Cloudflare R2 URL for generated PDF
- `media_type`: File MIME type
- `review_type`: Either "Review" or "Exercises"
- `user_id`: Foreign key to users table

## Security

- JWT tokens expire after 30 minutes
- All API endpoints (except `/auth/google`) require authentication
- Google OAuth tokens are verified server-side
- CORS middleware configured for cross-origin requests

