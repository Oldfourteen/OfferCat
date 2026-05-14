import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  /** 打包到 uni-app `static/galaxy-h5` 后，资源与 index 同目录，需相对路径 */
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5174,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // 固定文件名，便于复制到 uni-app `static/galaxy-h5`，避免每次改 hash 后 WebView 仍加载旧脚本
        entryFileNames: 'assets/galaxy-app.js',
        chunkFileNames: 'assets/galaxy-chunk-[hash].js',
        assetFileNames: 'assets/galaxy[extname]',
      },
    },
  },
})
