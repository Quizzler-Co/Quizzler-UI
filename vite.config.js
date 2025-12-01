import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    host: true, // Listen on all network interfaces
    port: 5173,
    strictPort: false,
    allowedHosts: true, // Disable host blocking entirely for dev mode
    // Proxy API requests to localhost backend during development only
    // In production build, VITE_API_BASE_URL env variable is used instead
    proxy: {
      '/api': {
        target: 'http://localhost:8086',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  preview: {
    host: true, // Listen on all network interfaces for preview
    port: 4173, // Vite preview default port
    strictPort: false,
    allowedHosts: true, // Disable host blocking entirely for preview mode (Cloudflare Tunnel)
  },
})
