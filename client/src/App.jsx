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
    </Router>
  );
}
