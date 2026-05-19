import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

/**
 * 与 `OfferCat/frontend/vue/subPages/galaxy/galaxy.vue` 里的 galaxyAssetVersion 保持同步。
 * WebView 会强缓存固定路径的 galaxy-app.js / galaxy.css，仅靠入口 index 的 query 不够，必须在 HTML 里给静态资源加 query。
 * H5 入口 `public/iframe.html` 为静态拷贝，需手写与下方相同的 `?v=`。
 */
const GALAXY_ASSET_QUERY = '?v=20260519-galaxy-navbtn-noborder-v1'

export default defineConfig({
  /** 打包到 uni-app `static/galaxy-h5` 后，资源与 index 同目录，需相对路径 */
  base: './',
  plugins: [
    vue(),
    {
      name: 'galaxy-inject-asset-query',
      transformIndexHtml(html) {
        return html
          .replaceAll('./assets/galaxy-app.js', `./assets/galaxy-app.js${GALAXY_ASSET_QUERY}`)
          .replaceAll('./assets/galaxy.css', `./assets/galaxy.css${GALAXY_ASSET_QUERY}`)
      },
    },
  ],
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
