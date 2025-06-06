// src/services/authService.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Adjust your backend URL here
  withCredentials: true,
});

instance.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const loginUser = (data: { email: string; password: string }) =>
  instance.post('/auth/login', data);

export const signupUser = (data: { email: string; password: string; name?: string }) =>
  instance.post('/auth/signup', data);

export default instance;
