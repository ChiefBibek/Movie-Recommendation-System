import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '^/fallback/.*': {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, ""),
      },
      '/api1': {
        target: 'https://movie-recommendation-system-backend-b3ei.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api1/, ''),
      },
      '/api2': {
        target: 'https://movie-recommendation-system-14.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api2/, ''),
      }
    },
  },
});
