import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base = chemin sur GitHub Pages.
// Repo "dashboard" → https://dravelimbolo.github.io/dashboard/jsx/
export default defineConfig({
  plugins: [react()],
  base: '/dashboard/jsx/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
})
