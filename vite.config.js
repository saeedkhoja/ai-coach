import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // CORS'ni chetlab o'tish uchun: /api → staging.calora.uz
      '/api': {
        target: 'https://staging.calora.uz',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
