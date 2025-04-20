import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Base path for GitHub Pages hosted at the root (https://TecnikOfficial.github.io)
  base: "/",
  build: {
    // Optimize build
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Generate smaller chunks
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["vue"],
        },
      },
    },
  },
});
