import React, { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header/Header';
import Footer from '../Footer';
import CustomCursor from '../CustomCursor';
import SubscriptionPopup from '../SubscriptionPopup';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Premium Custom Cursor */}
      <CustomCursor />

      {/* Header (Top Bar + Main Header) */}
      <Header />
      {/* Main content: always visible, never overlapped */}
      {/* Add dynamic top padding to offset fixed topbar + header on all screens */}
      <main className="flex-1 w-full max-w-full mx-auto">
        {children}
      </main>
      {/* Footer */}
      <Footer />

      {/* Newsletter Popup */}
      <SubscriptionPopup />
    </div>
  );
};

export default MainLayout;