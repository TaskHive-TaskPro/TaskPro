
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import MainDashboard from '../components/dashboard/MainDashboard';
import { useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';

const HomePage = () => {
  const { boardId } = useParams();
  const { user, token, isLoading, isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p>Yükleniyor...</p>
      </div>
    );
  }

  // Eğer kullanıcı authenticate olmamışsa, ana sayfaya yönlendir
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="home-page" data-theme="home">
      <Header onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="home-content">
        { }
        <aside className="sidebar-placeholder">
          <div div style={{
            width: sidebarOpen ? '250px' : '0',
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            padding: sidebarOpen ? '20px' : '0',
            transition: 'all 0.3s',
            overflow: 'hidden',
            height: '100vh',
            borderRight: '1px solid var(--border-color)'
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
          <MainDashboard />
        </main>
      </div>
    </div>
  );
};

export default HomePage;