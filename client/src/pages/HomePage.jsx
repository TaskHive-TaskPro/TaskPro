
 import React, { useState, Suspense, lazy } from 'react';
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
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
  };

  export default HomePage;
