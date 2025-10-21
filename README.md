# SmartLearner - AI-Powered Learning MERN App

This archive contains an AI-Powered MERN project for SmartLearner.

## Quick steps

1. Backend
   - cd backend
   - cp .env.example .env and fill in MONGO_URI, JWT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL, FRONTEND_URL
   - npm install
   - npm run seed   # populates sample users, courses, lessons
   - npm run dev

2. Frontend
   - cd frontend
   - cp .env.example .env
   - npm install
   - npm run dev


## Deployment
- Backend: Deploy backend folder to Render. Set env vars on Render (MONGO_URI, JWT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL, FRONTEND_URL_PROD)
- Frontend: Deploy frontend folder to Vercel. Set env var VITE_API_BASE_URL to your backend base (e.g., https://your-backend.onrender.com/api)