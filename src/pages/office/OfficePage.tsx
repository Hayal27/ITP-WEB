import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Office from './Office';
import './Office.css';
import { FaFileExport, FaQuestionCircle } from 'react-icons/fa';
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
    <div className="enterprise-page">
      <div className="top-utility-bar">
        <div className="breadcrumbs-minimal">
          <span>Home</span> / <span>Facilities</span> / <span className="active">Offices</span>
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
                  <button onClick={() => handleExport('pdf')}>PDF Document</button>
                  <button onClick={() => handleExport('excel')}>Excel Sheet</button>
                  <button onClick={() => handleExport('csv')}>CSV Data</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button className="btn-utility-icon"><FaQuestionCircle /></button>
        </div>
      </div>

      <Office />


    </div>
  );
};

export default OfficePage;
