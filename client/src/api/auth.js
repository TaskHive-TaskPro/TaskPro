import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // CORS credentials için
});

const register = async (userData) => {
  console.log("Register attempt:", userData);
  console.log("API URL:", API_URL);

  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    console.log("Register success:", response.data);
    return response.data.message;
  } catch (error) {
    console.error("Register error:", error);
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
