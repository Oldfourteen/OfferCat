import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

/**
 * 与 `OfferCat/frontend/vue/subPages/galaxy/galaxy.vue` 里的 galaxyAssetVersion 保持同步。
 *
 * 部分 Android WebView / 壳内缓存会按「路径」缓存并忽略 `?v=` query，只靠 query 永远不刷新。
 * 因此入口 JS/CSS 使用 **带戳的文件名**；升版同时改 STAR 并重打 `iframe.html` + 同步。
 */
const GALAXY_STAR = '20260519-stamp-h6'

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
        entryFileNames: `assets/galaxy-app.${GALAXY_STAR}.js`,
        chunkFileNames: 'assets/galaxy-chunk-[hash].js',
        assetFileNames: (info) =>
          /\.css$/i.test(String(info.names?.[0] || info.name || ''))
            ? `assets/galaxy.${GALAXY_STAR}.css`
            : 'assets/galaxy-extra-[hash][extname]',
      },
    },
  },
})
