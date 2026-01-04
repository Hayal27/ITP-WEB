import React, { useState } from 'react';
import LeasedLand from './LeasedLand';
import './LeasedLand.css';
import { FaFileExport, FaQuestionCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { notifications } from '@mantine/notifications';

const LeasedLandPage: React.FC = () => {
  const [showExportOptions, setShowExportOptions] = useState<boolean>(false);

  const handleExport = (format: 'pdf' | 'excel' | 'csv') => {
    setTimeout(() => {
      notifications.show({
        title: 'Export Success',
        message: `Land data exported in ${format.toUpperCase()} format successfully!`,
        color: 'green',
      });
      setShowExportOptions(false);
    }, 1000);
  };

  return (
    <div className="enterprise-page green-theme">
      <div className="top-utility-bar">
        <div className="breadcrumbs-minimal">
          <span>Home</span> / <span>Space</span> / <span className="active">Leased Land</span>
        </div>

        <div className="utility-actions">
          <div className="export-container">
            <button
              className="btn-utility"
              onClick={() => setShowExportOptions(!showExportOptions)}
            >
              <FaFileExport /> Export
            </button>
            <AnimatePresence>
              {showExportOptions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="export-menu glass-effect"
                >
                  <button onClick={() => handleExport('pdf')}>PDF Report</button>
                  <button onClick={() => handleExport('excel')}>Excel Data</button>
                  <button onClick={() => handleExport('csv')}>CSV Export</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button className="btn-utility-icon"><FaQuestionCircle /></button>
        </div>
      </div>

      <LeasedLand />

    </div>
  );
};

export default LeasedLandPage;