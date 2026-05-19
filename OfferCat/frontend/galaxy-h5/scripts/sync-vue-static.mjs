/**
 * 将 Vite 产物 dist/ 复制到 uni-app：`vue/static/galaxy-h5/`
 *
 * 「同步」是开发机上的命令；App 里没有「同步按钮」。
 * 修改源码后：`npm run sync:vue-static`，再在 HBuilder/uni 里重新编译运行 App（要让 `galaxy.vue` 等非 static 改动进包也需重编）。
 *
 * WebView 常按路径缓存：`galaxy-app.js` 易被旧包钉死；新版本使用 `galaxy-app.<stamp>.js`。
 * 仍可能残留旧的 chunk / 入口文件名，拷贝前删掉历史 `galaxy-chunk-*.js` 和无戳入口。
 */
import { cpSync, existsSync, readdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const LEGACY_ROOT_ASSETS = ['galaxy-app.js', 'galaxy.css']

const __dirname = dirname(fileURLToPath(import.meta.url))
const galaxyRoot = join(__dirname, '..')
const dist = join(galaxyRoot, 'dist')
const target = join(galaxyRoot, '..', 'vue', 'static', 'galaxy-h5')

if (!existsSync(dist)) {
  console.error('[galaxy-h5] 未找到 dist/，请先执行: npm run build')
  process.exit(1)
}

console.log('[galaxy-h5] 同步:', dist)
console.log('          -> ', target)

/** 删掉旧哈希 chunk，避免盘里积压且极端情况下误入旧 chunk */
const targetAssets = join(target, 'assets')
if (existsSync(targetAssets)) {
  for (const n of readdirSync(targetAssets)) {
    if (n.startsWith('galaxy-chunk-') && n.endsWith('.js')) {
      try {
        rmSync(join(targetAssets, n))
        console.log('[galaxy-h5] 移除旧 chunk:', n)
      } catch (e) {
        console.warn('[galaxy-h5] 移除 chunk 失败（可忽略）', n, e)
      }
    }
  }
}

cpSync(dist, target, { recursive: true })

for (const name of LEGACY_ROOT_ASSETS) {
  const f = join(targetAssets, name)
  try {
    if (existsSync(f)) {
      rmSync(f)
      console.log('[galaxy-h5] 已移除可能误导缓存的旧资源:', name)
    }
  } catch (e) {
    console.warn('[galaxy-h5] 移除旧资源失败（可忽略）', name, e)
  }
}

console.log('[galaxy-h5] 同步完成。请在 uni/HBuilder 中重新编译运行 App（含 galaxy.vue）。')
