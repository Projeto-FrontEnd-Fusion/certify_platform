import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from "rollup-plugin-visualizer"
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
      html2canvas: ['html2canvas-pro'],
        vendor: ['react', 'react-dom'],
        animation: ['framer-motion'],
        forms: ['react-hook-form', 'zod'],
        pdf: ['jspdf'],
        state: ['@tanstack/react-query', 'zustand'],
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
})