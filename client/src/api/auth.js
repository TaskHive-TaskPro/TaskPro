import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
const API_URL = `${BASE_URL}/auth`;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const register = async (userData) => {
  console.log("Register attempt:", userData);
  console.log("Register URL:", `${API_URL}/register`);

  try {
    const response = await axiosInstance.post("/register", userData);
    console.log("auth.js - Register response:", response.data);
    return response.data.message;
  } catch (error) {
    console.error("Register error:", error.response?.data);
    throw error.response?.data?.message || "Kayıt başarısız oldu.";
  }
};

const login = async (userData) => {
  console.log("Login attempt:", userData);

  try {
    const response = await axiosInstance.post("/login", userData);
    console.log("Login success:", response.data);

    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data);
    throw (
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Giriş başarısız oldu."
    );
  }
};

const verifyEmail = async (token) => {
  try {
    const response = await axiosInstance.get(`/verify/${token}`);
    return response.data;
  } catch (error) {
    console.error("Verify error:", error.response?.data);
    throw error.response?.data?.message || "Doğrulama başarısız oldu.";
  }
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export default { register, login, logout, verifyEmail };
