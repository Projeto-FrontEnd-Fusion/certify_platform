import { defineConfig, type PluginOption, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'node:path'

export default defineConfig(({ mode }): UserConfig => ({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }) as PluginOption,
  ],
  server: {
    host: true,
    allowedHosts: ['www.certifyfusion.com.br', 'certifyfusion.com.br'],
  },
  build: {
    rolldownOptions: {
      output: {
        minify: {
          compress: {
            dropConsole: mode === 'production',
            dropDebugger: mode === 'production',
          },
        },
        codeSplitting: {
          groups: [
            { name: 'html2canvas', test: /[\\/]node_modules[\\/]html2canvas-pro[\\/]/ },
            { name: 'vendor', test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/ },
            { name: 'animation', test: /[\\/]node_modules[\\/]framer-motion[\\/]/ },
            { name: 'forms', test: /[\\/]node_modules[\\/](react-hook-form|zod)[\\/]/ },
            { name: 'pdf', test: /[\\/]node_modules[\\/]jspdf[\\/]/ },
            { name: 'state', test: /[\\/]node_modules[\\/](@tanstack[\\/]react-query|zustand)[\\/]/ },
          ],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
}))
