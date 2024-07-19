// vite.config.js

import { defineConfig } from 'vite';

export default defineConfig({
  base: '/TecnikOfficial.github.io/',
  build: {
    outDir: 'dist', // Output directory for the build
    minify: 'terser', // Use Terser for minification
    sourcemap: false, // Disable source maps in production build
    // Add any other optimization options as needed
  },
});

