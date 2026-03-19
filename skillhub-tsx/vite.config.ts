import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base = chemin sur GitHub Pages.
// Repo "dashboard" → https://dravelimbolo.github.io/dashboard/tsx/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/dashboard/tsx/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
})
