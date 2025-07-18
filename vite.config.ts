import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  optimizeDeps: {
    exclude: ['firebase', '@google/genai']
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    cssCodeSplit: false,
    rollupOptions: {
      external: (id) => {
        // Don't bundle Firebase or Gemini AI if not configured
        if (id.includes('firebase') && !process.env.VITE_FIREBASE_PROJECT_ID) {
          return true;
        }
        if (id.includes('@google/genai') && !process.env.VITE_GEMINI_API_KEY) {
          return true;
        }
        return false;
      }
    }
  }
});