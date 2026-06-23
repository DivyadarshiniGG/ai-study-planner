# AI Study Planner

An intelligent full-stack study management application built with React, Django REST Framework, and Groq AI — designed to help students plan, prioritize, and track their academic tasks efficiently.

##  Live Features

-  **JWT Authentication** — Secure login & registration system
-  **Task Management** — Add, update, delete tasks with priority levels and due dates
-  **AI Study Plan Generator** — Generate personalized day-wise study plans using Groq AI (LLaMA 3.3)
-  **AI Task Prioritizer** — Paste your tasks and AI ranks them by urgency
-  **Pomodoro Timer** — Built-in focus timer with work/break cycles
-  **Progress Dashboard** — Real-time stats of completed vs pending tasks

##  Tech Stack

### Frontend
- React.js (Vite)
- React Router DOM
- Axios (API calls)
- React Hot Toast
- useEffect Hook (timers, API calls, DOM updates)

### Backend
- Python & Django
- Django REST Framework
- JWT Authentication (SimpleJWT)
- Groq AI API (LLaMA 3.3-70b)
- SQLite Database
- CORS Headers

### AI Tools Used
- **Groq AI** — LLM integration for study plan generation
- **Claude AI (VS Code)** — Used as AI coding assistant during development
  
## Setup Instructions

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
cd studyplanner
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables
Create `.env` file in `backend/studyplanner/`:
SECRET_KEY=your_django_secret_key
DEBUG=True
GROQ_API_KEY=your_groq_api_key
