/** UniApp WebView 关闭桥：App 需 `uni.postMessage`（见 static 内 `uni.webview.js`）；H5 内嵌 iframe 用 `parent.postMessage` */
export function postCloseToShell(): void {
  const payload = { type: 'close' as const, source: 'galaxy-h5' as const }
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
