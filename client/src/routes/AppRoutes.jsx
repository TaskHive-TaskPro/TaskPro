import { Routes, Route } from 'react-router-dom';
import ScreensPage from '../pages/ScreensPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/home/:boardId" element={<ScreensPage />} />
    </Routes>
  );
}
