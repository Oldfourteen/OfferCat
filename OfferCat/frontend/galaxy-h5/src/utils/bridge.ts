type GalaxyShellPayload =
  | { type: 'close'; source: 'galaxy-h5' }
  | { type: 'galaxy-route'; source: 'galaxy-h5'; name: string }

function postToShell(payload: GalaxyShellPayload): void {
  const w = window as Window & { plus?: unknown; uni?: { postMessage?: (o: { data: unknown }) => void } }

  try {
    if (w.plus && w.uni?.postMessage) {
      w.uni.postMessage({ data: payload })
      return
    }
  } catch {
    /* ignore */
  }

  try {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage(payload, '*')
    }
  } catch {
    /* ignore */
  }
}

/** UniApp WebView 关闭桥：App 需 `uni.postMessage`（见 static 内 `uni.webview.js`）；H5 内嵌 iframe 用 `parent.postMessage` */
export function postCloseToShell(): void {
  postToShell({ type: 'close', source: 'galaxy-h5' })
}

/** 通知壳层当前 H5 路由（App 用于在 web-view 上叠原生「排行榜」按钮） */
export function postRouteToShell(routeName: string | symbol | null | undefined): void {
  const name = routeName == null ? '' : String(routeName)
  postToShell({ type: 'galaxy-route', source: 'galaxy-h5', name })
}
