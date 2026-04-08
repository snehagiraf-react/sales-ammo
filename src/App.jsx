import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import DashboardPage from './features/dashboard/DashboardPage';
import Users from './features/users/users';
import Subscription from './features/subscription/Subsccription';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import ProtectedRoute from './features/auth/ProtectedRoute';
import './App.css';
import { AuthProvider } from './features/auth/AuthProvider';
import Settings from './features/settings/Settings';
import Categories from './features/categories/Categories';
import Products from './features/products/Products';

/* =========================
   MAIN LAYOUT
========================= */
const MainLayout = () => {
  // Sidebar open state
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth > 900);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 900);

  /* ---------- TOGGLE ---------- */
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  /* ---------- CLOSE SIDEBAR (PASSED TO SIDEBAR) ---------- */
  const closeSidebar = () => {
    if (window.innerWidth <= 900) {
      setSidebarOpen(false);
    }
  };

  /* ---------- HANDLE RESIZE ---------- */
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 900;
      setIsMobile(mobile);

      if (mobile) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ProtectedRoute>
      {/* SIDEBAR */}
      <Sidebar
        isOpen={sidebarOpen}
        closeSidebar={closeSidebar}
      />

      {/* OVERLAY (MOBILE ONLY) */}
      {sidebarOpen && isMobile && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <div className={`main-wrapper ${sidebarOpen ? '' : 'sidebar-closed'}`}>
        <Header onToggleSidebar={toggleSidebar} />

        <main className="main-content">
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/users" element={<Users />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/products" element={<Products />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </ProtectedRoute>
  );
};

/* =========================
   APP ROOT
========================= */
export default function App() {
  return (
    <AuthProvider>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { fontSize: '1rem' },
        }}
      />

      <div className="App">
        <Routes>
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}