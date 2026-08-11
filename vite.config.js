import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['stuck-amiable-liftoff.ngrok-free.dev'],
    proxy: {
      '/api': {
        target: 'https://aisocialsbackend.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
