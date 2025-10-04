// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Sayfalar & Bileşenler
import DashboardRoutes from "./routes/DashboardRoutes";
import AuthWrapper from "./pages/AuthWrapper";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import Home from "./pages/HomePage";
import HomeLayout from "./pages/HomeLayout";

import "./styles/globals.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ✅ showToast export edildi, App dışında kullanılabilir
export const showToast = (type, title, message) => {
  toast[type](`${title}: ${message}`);
};

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Auth rotaları */}
        <Route path="/" element={<AuthWrapper />} />
        <Route
          path="/verify/:token"
          element={
            <AuthWrapper>
              <VerifyEmailPage />
            </AuthWrapper>
          }
        />

        {/* /home altında layout + child routes */}
        <Route path="/home" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path=":boardId" element={<Home />} />
        </Route>

        {/* Dashboard - deprecated, /home kullanılmalı */}
        <Route path="/dashboard/*" element={<DashboardRoutes />} />

        {/* 404 fallback */}
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 2147483647 }}
      />
    </Router>
  );
}
