// // frontend/src/router/PrivateRoute.jsx
// import { Navigate } from "react-router-dom";

// // Örn: giriş kontrolünü basit bir değişkenle yapıyoruz.
// // Gerçek uygulamada bu bilgiyi Redux, Context veya localStorage’dan alırsın.
// const isAuthenticated = () => {
//   return Boolean(localStorage.getItem("token")); 
// };

// const PrivateRoute = ({ children }) => {
//   return isAuthenticated() ? children : <Navigate to="/welcome" replace />;
// };

// export default PrivateRoute;
