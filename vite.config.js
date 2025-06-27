import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ command }) => {
  const base = command === 'serve' ? '' : '/SIAProject/'
  
  return {
    plugins: [react()],
    base: base,
    build: {
      outDir: 'dist'
    },
    server: {
      port: 5173,
      host: true,
      strictPort: false,
      hmr: {
        overlay: true
      },
      open: true,
      cors: true
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  }
})
