import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://meds-scan-backend.onrender.com",
        changeOrigin: true,
        secure: true, // Set to true if your backend uses HTTPS
      },
    },
  },
  css: {
    preprocessorOptions: {
      css: {
        // Tailwind CSS custom configuration
        import: ["./src/styles/tailwind.css"],
      },
    },
  },
});