import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Güvenli port
    open: true,
    proxy: {
<<<<<<<<< Temporary merge branch 1
      "/api": "http://localhost:5001/", // Backend URL
=========
      "/api": "http://localhost:5001", // Backend URL
>>>>>>>>> Temporary merge branch 2
    },
  },
});
