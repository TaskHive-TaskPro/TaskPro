import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Güvenli port
    open: true,
    proxy: {

      "/api": "http://localhost:5001/", 

    },
  },
});