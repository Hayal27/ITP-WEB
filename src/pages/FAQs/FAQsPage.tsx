import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import './FAQsPage.css';

import FAQHero from './components/FAQHero';
import FAQCategories from './components/FAQCategories';
import FAQAccordion from './components/FAQAccordion';
import FAQSmartCard from './components/FAQSmartCard';
import FAQHelp from './components/FAQHelp';
import { FAQProvider } from './components/FAQContext';

const FAQsPage: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    const winScroll = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (winScroll / height) * 100;
    setScrollProgress(scrolled);
    setShowBackToTop(winScroll > 300);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <FAQProvider>
      <div className="faqPageWrapper">
        <div className="faqPageScrollProgress">
          <div
            className="faqPageScrollProgressBar"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <FAQHero />

        <FAQCategories />

        <FAQAccordion />

        <FAQSmartCard />

        <FAQHelp />

        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="backToTop"
            title="Return to top"
          >
            <FiArrowUp />
          </motion.button>
        )}
      </div>
    </FAQProvider>
  );
};

export default FAQsPage;