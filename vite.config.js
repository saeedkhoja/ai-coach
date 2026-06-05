import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Backend manzili VITE_API_BASE orqali beriladi (.env / .env.production).
// Backend CORS har qanday originga ruxsat bergani uchun proxy kerak emas.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
