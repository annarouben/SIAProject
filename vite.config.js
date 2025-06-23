import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configure Vite with base URL for GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: '/SIAProject/',  // Must match your repository name
  build: {
    outDir: 'dist'
  }
})
