// postcss.config.js
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';

export default {
  plugins: [
    tailwindcss(), // Call as a function
    autoprefixer(), // Call as a function
    postcssNested(), // Call as a function
  ],
};