// frontend/src/router/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

// Örn: giriş kontrolünü basit bir değişkenle yapıyoruz.

const isAuthenticated = () => {
  return Boolean(localStorage.getItem("token")); 
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/welcome" replace />;
};

export default PrivateRoute;
