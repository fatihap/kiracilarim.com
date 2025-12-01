import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Build çıktısını temizle
    emptyOutDir: true,
    // Source map'i production'da kapat (opsiyonel, performans için)
    sourcemap: false,
    // Chunk size uyarılarını artır
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Dosya isimlerini hash'le (cache busting için)
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  // Cache'i temizlemek için
  server: {
    force: true
  }
})
