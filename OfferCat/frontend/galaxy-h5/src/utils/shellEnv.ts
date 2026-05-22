/** 是否运行在 uni-app App 壳的 web-view 内 */
export function isUniAppAppShell(): boolean {
  if (typeof window === 'undefined') return false
  const flagged = (window as Window & { __GALAXY_APP_SHELL__?: string | boolean }).__GALAXY_APP_SHELL__
  if (flagged === true || flagged === '1' || flagged === 'app') return true
  const w = window as Window & { plus?: unknown }
  if (w.plus) return true
  try {
    return /uni-app/i.test(navigator.userAgent) || /Html5Plus/i.test(navigator.userAgent)
  } catch {
    return false
  }
}