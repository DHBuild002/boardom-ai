// postcss.config.js
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    tailwindcss(), // Call as a function
    autoprefixer(), // Call as a function
  ],
};