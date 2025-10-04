import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import MainDashboard from '../components/dashboard/MainDashboard';
import { useAuth } from '../context/AuthContext';
import styles from "./HomePage.module.css";

const SideBar = lazy(() => import('../components/sideBar/SideBar'));

class SidebarBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err, info) { console.error('SideBar crashed:', err, info); }
  render() { return this.state.hasError ? null : this.props.children; }
}

const HomePage = () => {
  const { boardId } = useParams();
  const { isLoading, isAuthenticated } = useAuth();

  // Başlangıç: 768 üstünde açık, altında kapalı
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);

  // Resize olduğunda durumu güncelle
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p>Yükleniyor...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.homePage} data-theme="home">
      <SidebarBoundary>
        <Suspense fallback={null}>
          <SideBar active={sidebarOpen} onClick={() => setSidebarOpen(false)} />
        </Suspense>
      </SidebarBoundary>

      {/* Header butonu sidebarOpen state'ini toggle eder */}
      <Header onSidebarToggle={() => setSidebarOpen((prev) => !prev)} />

      <div className={styles.homeContent}>
        <div className={`${styles.mainContent} ${!sidebarOpen ? styles.mainContentSidebarCollapsed : ''}`}>
          <MainDashboard boardId={boardId} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
