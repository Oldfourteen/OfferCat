/** 是否运行在 uni-app App 壳的 web-view 内（含 5+ Runtime / Html5Plus） */
export function isUniAppAppShell(): boolean {
  if (typeof window === 'undefined') return false
  const w = window as Window & { plus?: unknown }
  if (w.plus) return true
  try {
    return /uni-app/i.test(navigator.userAgent) || /Html5Plus/i.test(navigator.userAgent)
  } catch {
    return false
  }
}
