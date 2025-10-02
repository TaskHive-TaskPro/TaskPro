import axiosInstance from "./axiosInstance";

const register = async (userData) => {
  console.log("Register attempt:", userData);
  
  try {
    const response = await axiosInstance.post("/api/auth/register", userData);
    console.log("Register success:", response.data);
    return response.data.message;
  } catch (error) {
    console.error("Register error:", error.response?.data);
    throw error.response?.data?.message || "Kayıt başarısız oldu.";
  }
};

const login = async (userData) => {
  console.log("Login attempt:", userData);

  try {
    const response = await axiosInstance.post("/api/auth/login", userData);
    console.log("Login success:", response.data);

    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
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
    const response = await axiosInstance.get(`/api/auth/verify/${token}`);
    console.log("Verify email success:", response.data);
    
    // Token varsa kaydet
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    console.error("Verify email error:", error.response?.data);
    throw error.response?.data?.message || "Doğrulama başarısız oldu.";
  }
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export default { register, login, logout, verifyEmail };
