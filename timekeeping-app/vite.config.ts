import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/timekeeping-app/', // baza corectă pentru GitHub Pages
  build: {
    outDir: 'dist' // folderul de build
  },
  server: {
    open: true // deschide automat browser-ul când rulezi dev
  }
});