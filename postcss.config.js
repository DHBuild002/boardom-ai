// postcss.config.js
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    tailwindcss(), // Call as a function
    autoprefixer(), // Call as a function
  ],
};