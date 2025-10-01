

 import React, { useState,useEffect, Suspense, lazy } from 'react';
  import { Navigate } from 'react-router-dom';
  import Header from '../components/layout/Header';
  import MainDashboard from '../components/dashboard/MainDashboard';
  import { useAuth } from '../context/AuthContext';
  import { useParams } from 'react-router-dom';

  const SideBar = lazy(() => import('../components/sideBar/SideBar'));

  class SidebarBoundary extends React.Component {
    constructor(props) { super(props); this.state = { hasError: false }; }
    static getDerivedStateFromError() { return { hasError: true }; }
    componentDidCatch(err, info) { console.error('SideBar crashed:', err, info); }
    render() { return this.state.hasError ? null : this.props.children; }
  }


const HomePage = () => {
  const { boardId } = useParams();
  const { user, token, isLoading, isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768); // Mobilde kapalı, desktop'ta açık

  // Mobilde sidebar dışına tıklayınca kapatma
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth < 768 && sidebarOpen) {
        const sidebar = document.querySelector('.sidebar-placeholder');
        if (sidebar && !sidebar.contains(event.target) && !event.target.closest('.sidebar-toggle-btn')) {
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  // Ekran boyutu değiştiğinde sidebar durumunu güncelle
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
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
      <div className="home-page" data-theme="home">
        <SidebarBoundary>
          <Suspense fallback={null}>
            <SideBar active={sidebarOpen} onClick={() => setSidebarOpen(false)} />
          </Suspense>
        </SidebarBoundary>

        <Header onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
        
       <div className="home-content">
          <main className="main-content">
            <MainDashboard boardId={boardId} />
          </main>
        </div>
      </div>
    );
};

export default HomePage;
