import axios from "axios";

const API_URL = "http://localhost:5001/api/auth";

const register = async (userData) => {
  try {
    console.log('Sending register data:', userData);
    const response = await axios.post(`${API_URL}/register`, userData);
    console.log('Register response:', response.data);
    return response.data.message;
  } catch (error) {
    console.error('Register error:', error.response?.data);
    throw error.response?.data?.message || "Kayıt başarısız oldu.";
  }
};

const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Giriş başarısız oldu.";
  }
};


const verifyEmail = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/verify/${token}`);
    return response.data; 
  } catch (error) {
    throw error.response?.data?.message || "Doğrulama başarısız oldu.";
  }
};
const base = import.meta.env.VITE_API_URL || '';
const axiosInstance = axios.create({
  baseURL: `${base}/api`,
  withCredentials: true, // cookie yoksa kaldır
});
const logout = () => {
  localStorage.removeItem("user");
};

export default { register, login, logout, verifyEmail };
