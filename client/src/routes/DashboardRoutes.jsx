import { Routes, Route } from "react-router-dom";
import ScreensPage from "../pages/ScreensPage";
// Diğer dashboard sayfalarını buraya ekleyebilirsiniz

export default function DashboardRoutes() {
  return (
    <Routes>
      {/* Ana dashboard */}
      <Route path="/" element={<ScreensPage />} />
      {/* Belirli board için dashboard */}
      <Route path="/home/:boardId" element={<ScreensPage />} />
      {/* Yeni dashboard sayfaları eklemek için buraya Route ekleyin */}
    </Routes>
  );
}
