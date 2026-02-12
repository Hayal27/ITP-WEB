import React, { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header/Header';
import Footer from '../Footer';
import SubscriptionPopup from '../SubscriptionPopup';
import ParticleBackground from '../ParticleBackground';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    setTimeout(() => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 0);

    // Clear career refresh flag when leaving career pages
    if (!pathname.startsWith('/career')) {
      sessionStorage.removeItem('career_refreshed');
    }
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-layout)] relative overflow-hidden">
      {/* Global Particle Background */}
      <ParticleBackground id="global-particles" />

      {/* Header (Top Bar + Main Header) */}
      <Header />
      {/* Main content: always visible, never overlapped */}
      {/* Add dynamic top padding to offset fixed topbar + header on all screens */}
      <main className="flex-1 w-full max-w-full mx-auto relative bg-transparent">
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