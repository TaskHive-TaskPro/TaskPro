// client/src/routes/DashboardRoutes.jsx
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';
import HomePage from "../pages/HomePage";

export default function DashboardRoutes() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/home/:boardId" element={<HomePage />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}