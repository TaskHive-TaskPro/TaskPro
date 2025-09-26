
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../components/layout/Header';
// import Sidebar from '../components/layout/Sidebar'; 
// import ScreensPage from './ScreensPage'; 
import { useAuth } from '../hooks/useAuth';
import { useParams } from 'react-router-dom';

const HomePage = () => {
  const { boardId } = useParams();
  const { user, token, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p>Yükleniyor...</p>
      </div>
    );
  }

  if (!token || !user) {
    return <Navigate to="/welcome" replace />;
  }

  return (
    <div className="home-page" data-theme="home">
      <Header onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="home-content">
        {}
        <aside className="sidebar-placeholder">
          <div style={{
            width: sidebarOpen ? '250px' : '0',
            background: '#2d2d2d',
            color: 'white',
            padding: sidebarOpen ? '20px' : '0',
            transition: 'all 0.3s',
            overflow: 'hidden',
            height: '100vh'
          }}>
            <h3>📋 Sidebar</h3>
            <p style={{ fontSize: '12px', opacity: 0.7 }}>(Kişi 4'ün görevi)</p>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
              <li style={{ padding: '8px 0' }}>• Panolar</li>
              <li style={{ padding: '8px 0' }}>• Create Board</li>
              <li style={{ padding: '8px 0' }}>• Logout</li>
            </ul>
          </div>
        </aside>
        
        <main className={`main-content ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
          {boardId ? (
            <div className="screens-placeholder">
              <h2>Pano: {boardId}</h2>
              <p>ScreensPage - Kişi 5'in görevi</p>
            </div>
          ) : (
            <div className="no-board-selected">
              <div className="welcome-content">
                <h2>Hoş Geldiniz, {user?.name || 'Kullanıcı'}!</h2>
                <p>Başlamak için sol menüden bir pano seçin veya yeni bir pano oluşturun.</p>
                
                <div className="welcome-stats">
                  <div className="stat-card">
                    <span className="stat-number">0</span>
                    <span className="stat-label">Aktif Panolar</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-number">0</span>
                    <span className="stat-label">Tamamlanan Görevler</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-number">0</span>
                    <span className="stat-label">Bekleyen Görevler</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default HomePage;