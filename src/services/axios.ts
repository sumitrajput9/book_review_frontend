import axios from 'axios';

const instance = axios.create({
   baseURL: import.meta.env.VITE_API_BASE_URL, // adjust according to backend
  withCredentials: true,
});

instance.interceptors.request.use((config:any) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
