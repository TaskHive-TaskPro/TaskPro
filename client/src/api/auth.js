import axios from "axios";

const API_URL = "http://localhost:5001/api/auth";

const register = async (userData) => {
  try {
    console.log('auth.js - Sending register data:', userData);
    const response = await axios.post(`${API_URL}/register`, userData);
    console.log('auth.js - Register response:', response.data);
    return response.data.message;
  } catch (error) {
    console.error('auth.js - Register error:', error.response?.data);
    console.error('auth.js - Full error:', error);
    throw error.response?.data?.message || "Kayıt başarısız oldu.";
  }
};

const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Giriş başarısız oldu.";
  }
};


const verifyEmail = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/verify/${token}`);
    return response.data; // artık { message, token, user } döner
  } catch (error) {
    throw error.response?.data?.message || "Doğrulama başarısız oldu.";
  }
};

const logout = () => {
  localStorage.removeItem("user");
};

export default { register, login, logout, verifyEmail };
