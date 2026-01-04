import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002,
    host: true,
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    assetsDir: 'assets',
    outDir: 'dist',
    sourcemap: false,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-mantine': ['@mantine/core', '@mantine/hooks'],
          'vendor-ui-icons': ['react-icons', '@tabler/icons-react'],
          'vendor-animation': ['framer-motion'],
          'vendor-bootstrap': ['react-bootstrap', 'bootstrap'],
          'vendor-utils': ['axios', 'zod'],
          'vendor-three': ['@tsparticles/react', '@tsparticles/slim', '@tsparticles/engine'],
          'vendor-maps': ['leaflet', 'react-leaflet']
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});