import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      external: (id) => {
        // Don't bundle Firebase if not configured
        if (id.includes('firebase') && !process.env.VITE_FIREBASE_PROJECT_ID) {
          return true;
        }
        return false;
      }
    }
  }
});
</vite.config.ts>