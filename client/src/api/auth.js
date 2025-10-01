import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/auth`
  : "http://localhost:5001/api/auth";

// Axios instance oluşturuldu, withCredentials kaldırıldı
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const register = async (userData) => {
  console.log("Register attempt:", userData);
  console.log("API URL:", API_URL);

  try {
    // Basit axios.post kullanımı
    const response = await axios.post(`${API_URL}/register`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Register success:", response.data);
    return response.data.message;
  } catch (error) {
    console.error("Register error:", error.response?.data || error.message);

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
