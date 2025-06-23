import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // React plugin for Vite
  plugins: [react()],
  
  // Base URL for GitHub Pages deployment
  // Must match your repository name
  base: '/SIAProject/',
  
  // Build configuration
  build: {
    outDir: 'dist'
  },
  
  // Development server configuration
  server: {
    port: 5173
  }
})
