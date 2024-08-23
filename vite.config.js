import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://meds-scan-backend.onrender.com/", // Replace with your backend server URL
        changeOrigin: true,
        secure: false,
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
