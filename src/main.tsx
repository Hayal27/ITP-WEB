// --- Security: Global Console Suppression ---
console.log = () => { };
console.debug = () => { };
console.info = () => { };
console.warn = () => { };
console.error = () => { };
// ---------------------------------------------

import React from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import App from './App';
import './index.css';
import './assets/css/custom.css';

import { ThemeProvider } from './context/ThemeContext';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <MantineProvider>
      <ThemeProvider>
        <Notifications />
        <App />
      </ThemeProvider>
    </MantineProvider>
  </React.StrictMode>
);