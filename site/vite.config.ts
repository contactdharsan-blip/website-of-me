import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    target: 'es2020',
    // Split the heavy animation lib out of the main bundle so first paint stays light.
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['motion'],
          icons: ['lucide-react'],
        },
      },
    },
  },
});
