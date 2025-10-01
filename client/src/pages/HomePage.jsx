

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
        

       <div className="home-content" style={{ marginLeft: '260px' }}> {/* kalıcı drawer boşluğu için sınıf eklendi */}
          {}
         {/* <aside className="sidebar-placeholder">  // geçici olarak gizledik
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
-         </aside>
+         </aside> */}
           
          <main className={`main-content ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
            <MainDashboard />
          </main>
        </div>
      </div>
    );



  // Eğer kullanıcı authenticate olmamışsa, ana sayfaya yönlendir
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="home-page" data-theme="home">
      <Header onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="home-content">
        {}
        <aside className={`sidebar-placeholder ${sidebarOpen ? 'open' : ''}`}>
          <div style={{
            width: '100%',
            background: 'transparent',
            color: 'var(--text-primary)',
            padding: '20px',
            height: '100%',
            overflow: 'auto'
          }}>
            <h3>📋 Sidebar</h3>
            <p style={{ fontSize: '12px', opacity: 0.7, marginBottom: '20px' }}>(Kişi 4'ün görevi)</p>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
              <li style={{ padding: '12px 0', cursor: 'pointer', borderRadius: '6px', paddingLeft: '8px', transition: 'background 0.2s' }}>• Panolar</li>
              <li style={{ padding: '12px 0', cursor: 'pointer', borderRadius: '6px', paddingLeft: '8px', transition: 'background 0.2s' }}>• Create Board</li>
              <li style={{ padding: '12px 0', cursor: 'pointer', borderRadius: '6px', paddingLeft: '8px', transition: 'background 0.2s' }}>• Logout</li>
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
