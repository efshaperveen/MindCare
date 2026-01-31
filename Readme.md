# MindCare — AI Powered Mental Health Support & Mood Intelligence Platform

MindCare is a **Full Stack AI-based Mental Health Monitoring Platform** that helps users track daily mood, perform mental health screening, and generate personalized AI mental health reports.

The platform focuses on **early risk detection**, **self-awareness**, and **privacy-first mental health support**.

---

## Tech Stack

### Frontend
- React.js (Vite)
- TypeScript
- Tailwind CSS
- Axios
- Context API (Auth Management)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication

### AI Integration
- Google Gemini API (Generative AI)
- AI Risk Analysis
- AI Report Generation

---

## 👥 User Features

### 👤 Authentication
- User Register
- User Login
- JWT Based Secure Authentication

---

### Daily Mood Tracking
Users can:
- Select mood (Happy, Calm, Neutral, Sad, Anxious)
- Add optional notes
- View recent mood history
- Track emotional patterns over time

---

### AI Mental Health Screening
Users can:
- Answer screening questionnaire
- Get AI Risk Level:
  - Low Risk
  - Medium Risk
  - High Risk
- Receive AI Guidance Tips

---

### Personalized Weekly AI Report
System generates AI report by combining:
- Mood Tracking History
- Screening Results
- Emotional Pattern Analysis
- Risk Level Prediction
- Self-care Suggestions
- When to Seek Professional Help

---

## Authentication & Security

- JWT Token Based Authentication
- Protected API Routes
- User-based Data Access
- Secure Password Hashing (bcrypt)

---

## Database Models

### User Model
- name
- email
- password (hashed)

---

### Mood Model
- userId
- mood (happy, calm, neutral, sad, anxious)
- note
- date

---

### Screening Model
- userId
- answers
- aiResponse
- riskLevel
- createdAt

---

## API Routes

### Auth Routes
- `POST /api/auth/register`
- `POST /api/auth/login`

---

### Mood Routes
- `POST /api/moods` → Add Mood
- `GET /api/moods/history` → Get Mood History

---

### Screening Routes
- `POST /api/screening/run` → Run AI Screening

---

### Report Routes
- `GET /api/report/generate` → Generate AI Mental Health Report

---

## AI Features

### Risk Detection
AI analyzes screening answers to detect early mental health risks.

### Mood Pattern Analysis
AI analyzes last 7 days mood history.

### Personalized Suggestions
AI generates:
- Self-care tips
- Emotional guidance
- Risk awareness

---

##  Backend Environment Variables

Create `.env` file in backend root:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key


---

##  Frontend Environment Variables

Create a `.env` file in the **frontend root directory** and add the following variables:

VITE_API_BASE_URL=https://your-backend-url/api


##  Run Project Locally

### Backend

cd backend

npm install

npm run dev


---

### Frontend

cd frontend

npm install

npm run dev


---

##  Deployment

The MindCare platform is deployed using modern cloud services to ensure scalability, security, and smooth performance.

### Frontend Deployment
- Deployed on **Netlify**
- Built using Vite + TypeScript
- Automatic deployment on every GitHub push
- Environment variables managed securely

### Backend Deployment
- Deployed on **Render**
- Node.js + Express API server
- JWT-based secure authentication
- Handles AI requests and business logic

### Database
- **MongoDB Atlas (Cloud Database)**
- Stores user data, mood logs, and screening results
- Secure and scalable NoSQL database

### AI Services
- **Google Gemini API**
- Used for mental health screening and report generation
- API keys protected using environment variables

### Deployment Flow
1. User accesses the frontend hosted on Netlify
2. Frontend sends API requests to the backend on Render
3. Backend communicates with MongoDB Atlas for data storage
4. Backend calls Gemini AI for analysis and report generation
5. Processed results are returned securely to the user

---

##  Project Status

- ✅ Authentication Working  
- ✅ Mood Tracking Working  
- ✅ AI Screening Working  
- ✅ Weekly AI Report Generation Working  
- ✅ Frontend TypeScript Implemented  
- ✅ API Integration Completed  

---

##  Future Enhancements
- Emergency Alert System
- Doctor / Therapist Integration
- Voice Mood Input
- Smart Notification Reminders




