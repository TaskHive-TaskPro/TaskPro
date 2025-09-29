import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



// Context
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

// Sayfalar & Bileşenler
import DashboardRoutes from "./routes/DashboardRoutes"; 
import AuthWrapper from "./pages/AuthWrapper"; 
import VerifyEmailPage from "./pages/VerifyEmailPage";
import Home from "./pages/HomePage";

// import Layout from "./components/Layout"; // Eğer ortak layout kullanmak istersen
import './styles/globals.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
        {/* Ortak Layout eklemek isterseniz:
          <Layout>
            <Routes>...</Routes>
          </Layout>
        */}
        <Routes>
          {/* Auth ile ilgili rotalar */}
          <Route path="/" element={<AuthWrapper />} />
          <Route
            path="/verify/:token"
            element={
              <AuthWrapper>
                <VerifyEmailPage />
              </AuthWrapper>
            }
          />
          <Route path="/home" element={<Home />} />

          {/* Dashboard veya modüller */}
          <Route path="/dashboard/*" element={<DashboardRoutes />} />

          {/* İleride ekleyebileceğin route örnekleri */}
          {/* <Route path="/admin/*" element={<AdminRoutes />} /> */}
          {/* <Route path="/user/*" element={<UserRoutes />} /> */}
        </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
