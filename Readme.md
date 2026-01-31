# 🧠MindCare — AI Powered Mental Health Support & Mood Intelligence Platform

MindCare is a **Full Stack AI-based Mental Health Monitoring Platform** that helps users track daily mood, perform mental health screening, and generate personalized AI mental health reports.

The platform focuses on **early risk detection**, **self-awareness**, and **privacy-first mental health support**.

---

## 🚀 Tech Stack

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

### 😊 Daily Mood Tracking
Users can:
- Select mood (Happy, Calm, Neutral, Sad, Anxious)
- Add optional notes
- View recent mood history
- Track emotional patterns over time

---

## 🔐 Authentication & Security

- JWT Token Based Authentication
- Protected API Routes
- User-based Data Access
- Secure Password Hashing (bcrypt)

---

## 📦 Database Models

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

## 🔗 API Routes

### Auth Routes
- `POST /api/auth/register`
- `POST /api/auth/login`

---

### Mood Routes
- `POST /api/moods` → Add Mood
- `GET /api/moods/history` → Get Mood History

---


## ⚙️ Environment Variables

Create `.env` file in backend root:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key


---

## ▶️ Run Project Locally

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

## 📌 Project Status

- ✅ Authentication Working  
- ✅ Mood Tracking Working  
- ✅ Frontend TypeScript Implemented  
- ✅ API Integration Completed  

---

## ✨ Future Enhancements
- Emergency Alert System
- Doctor / Therapist Integration
- Voice Mood Input
- Smart Notification Reminders




