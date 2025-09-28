




// Ana uygulama bileşeni
// İleride eklenebilecek modüller ve route dosyaları için örnekler:
// import AuthRoutes from "./routes/AuthRoutes"; // Kullanıcı giriş/çıkış işlemleri
// import AdminRoutes from "./routes/AdminRoutes"; // Yönetici paneli
// import UserRoutes from "./routes/UserRoutes"; // Kullanıcıya özel sayfalar
// import Layout from "./components/Layout"; // Ortak layout (header, footer, sidebar)

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import DashboardRoutes from "./routes/DashboardRoutes";
import './styles/globals.css'
function App() {
  return (
    <Router>
      {/* Ortak layout eklemek isterseniz: <Layout><DashboardRoutes /></Layout> */}
      <DashboardRoutes />
      {/* İleride farklı modül route'ları eklemek için aşağıya ekleyebilirsiniz: */}
      {/* <AuthRoutes /> */}
      {/* <AdminRoutes /> */}
      {/* <UserRoutes /> */}
    </Router>
  );
}

export default App;
