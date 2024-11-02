// src/api/FastAPI.js
import axios from 'axios';

// Set up the base URL for the FastAPI server
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8005/api/v1';

// Create a pre-configured axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Attach token from session storage (if applicable)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('apiToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
