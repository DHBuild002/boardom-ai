// postcss.config.js
// For ES Modules (if your project uses import/export, like many Vite setups)
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    tailwindcss(), // Call it as a function
    autoprefixer(), // Call it as a function
  ],
};