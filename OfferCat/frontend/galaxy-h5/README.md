# galaxy-h5（专业星图 H5）

## 这跟 App 里「按钮」有什么关系？

**没有。**「同步静态资源」是你在电脑里跑的命令——把本站打包产物拷进 uni-app 的 `vue/static/galaxy-h5/`，从而让 WebView / iframe 读到最新 `galaxy-app.js`。**应用界面里不会出现「同步」二字。**

## 改完 H5 后怎么同步？

在 **`OfferCat/frontend/galaxy-h5`** 目录执行：

```bash
npm run sync:vue-static
```

等价于：`vite build`，再把 **`dist/` 整包复制** 到 **`../vue/static/galaxy-h5/`**。

然后必须在 **HBuilder / uni-cli** 里 **重新编译并运行到模拟器或真机**（只保存文件不会让已安装的 App 自动换包内静态目录）。

**若 App 仍是旧样式**：多数是 **原生 web-view 强缓存** 嵌套的 `iframe.html`。已对 `vue/subPages/galaxy/galaxy.vue` 在非 H5 端 **每次页面 `onShow`** 时为星图 URL 追加 `_cb=时间戳`，强制换查询串重载；**必须重新编译 uni 主工程** 后安装运行，不能只更新 `static` 而跳过壳层打包。

### 可选：顺带刷新缓存戳

线上 WebView 会缓存固定路径脚本。改过资源后应保持以下三处 `?v=` / `galaxyAssetVersion` **一致**，并顺带改个新后缀：

| 文件 | 作用 |
|------|------|
| `vite.config.ts` → `GALAXY_ASSET_QUERY` | 注入 `index.html` 里的资源 query |
| `public/iframe.html` | uni 用的是 **iframe.html** 入口，需手写与上面相同的 `v=` |
| `../vue/subPages/galaxy/galaxy.vue` → `galaxyAssetVersion` | iframe/web-view URL 上会带 `v=` |

## 仅本地预览 H5（不拷贝到 uni）

```bash
npm run dev
```

默认端口见 `vite.config.ts`（如 `5174`）。
