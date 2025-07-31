import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://api.blackplankton.com/v1',
  timeout: 10000,
});

// Interceptor untuk attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Interceptor untuk handle error global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const { logout } = useAuth();
      logout();
    }
    
    const errMessage = error.response?.data?.message || 
                      error.message || 
                      'Network Error';
    
    return Promise.reject(new Error(errMessage));
  }
);

export default api;