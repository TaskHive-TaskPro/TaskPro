import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - token ekle
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`🔵 ${config.method?.toUpperCase()} ${config.url}`, config.data);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor - hataları yakala
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`✅ Response from ${response.config.url}:`, response.data);
    return response;
  },
  (error) => {
    console.error(`❌ Error from ${error.config?.url}:`, error.response?.data);
    
    // 401 Unauthorized - token geçersiz, logout yap
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/auth";
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
