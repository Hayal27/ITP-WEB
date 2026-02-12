import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Office from './Office';
import './Office.css';
import { FaFileExport } from 'react-icons/fa';
import { notifications } from '@mantine/notifications';

const OfficePage: React.FC = () => {
  const [showExportOptions, setShowExportOptions] = useState<boolean>(false);

  const handleExport = (format: 'pdf' | 'excel' | 'csv') => {
    setTimeout(() => {
      notifications.show({
        title: 'Export Success',
        message: `Office data exported in ${format.toUpperCase()} format successfully!`,
        color: 'green',
      });
      setShowExportOptions(false);
    }, 1000);
  };

  return (
    <div className="investor-landing-container" style={{ paddingTop: 'var(--app-header-offset, 80px)' }}>
      <div className="top-utility-bar">
        <div className="utility-actions">
          <div className="export-container">
            <button
              className="btn-primary-premium"
              onClick={() => setShowExportOptions(!showExportOptions)}
              style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
            >
              <FaFileExport /> <span className="hide-mobile">Export Inventory</span>
              <span className="show-mobile-only">Export</span>
            </button>
            <AnimatePresence>
              {showExportOptions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="export-menu"
                >
                  <button className="btn-secondary-premium" onClick={() => handleExport('pdf')}>PDF Document</button>
                  <button className="btn-secondary-premium" onClick={() => handleExport('excel')}>Excel Sheet</button>
                  <button className="btn-secondary-premium" onClick={() => handleExport('csv')}>CSV Data</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Office />
    </div>
  );
};

export default OfficePage;
