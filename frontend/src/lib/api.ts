import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
} );

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authApi = {
  register: (name: string, email: string, password: string) =>
    api.post('/auth/register', { name, email, password }),
  
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
};

// Mood APIs
export const moodApi = {
  add: (mood: string, note?: string) =>
    api.post('/mood/add', { mood, note }),
  
  getHistory: () =>
    api.get('/mood/history'),
};

// Screening APIs
export const screeningApi = {
  analyze: (answers: {
    mood: string;
    sleep: string;
    stress: string;
    support: string;
  }) => api.post('/screening/analyze', { answers }),
};

// Report APIs
export const reportApi = {
  generate: () =>
    api.get('/report/generate'),
};

export default api;
