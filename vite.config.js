import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],

  server: {
    proxy: {
      "/api": {
        target: "https://e-com-backend-g9vb.onrender.com", // 👈 your backend
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
