import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.VITE_API_URL || 'http://localhost:5000',
  withCredentials: true,
});

export default axiosInstance;
