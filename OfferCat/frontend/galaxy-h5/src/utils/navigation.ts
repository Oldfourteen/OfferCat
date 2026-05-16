import type { RouteLocationRaw, Router } from 'vue-router'
import { GALAXY_MAJORS_KEY } from '@/data/majors'
import { postCloseToShell } from '@/utils/bridge'

/** 是否嵌在 uni 的 web-view / iframe 中（由壳页 navigateBack 关闭） */
export function isEmbeddedInShell(): boolean {
  try {
    return typeof window !== 'undefined' && window.parent != null && window.parent !== window
  } catch {
    return true
  }
}

/** 大星图是否具备 session 中的选专业 payload（无则不应进入 /galaxy） */
export function hasGalaxySessionPayload(): boolean {
  try {
    const raw = sessionStorage.getItem(GALAXY_MAJORS_KEY)
    if (!raw) return false
    const p = JSON.parse(raw) as { fromId?: string; toId?: string }
    return Boolean(p?.fromId && p?.toId && p.fromId !== p.toId)
  } catch {
    return false
  }
}

/** 关闭星图：通知壳页退出；独立打开 H5 时退回选择页 */
export function exitGalaxyShell(router: Router): void {
  try {
    sessionStorage.removeItem(GALAXY_MAJORS_KEY)
  } catch {
    /* ignore */
  }
  postCloseToShell()
  if (!isEmbeddedInShell()) {
    void router.replace({ name: 'select' })
  }
}

/** 大星图内：回到专业选择（静态路由，不依赖 history.back） */
export function goToMajorSelect(router: Router): void {
  void router.replace({ name: 'select' })
}

/** 大星图 3D（需已有 payload；否则回选择页） */
export function goToMainGalaxy(router: Router): void {
  if (!hasGalaxySessionPayload()) {
    void router.replace({ name: 'select' })
    return
  }
  void router.replace({ name: 'galaxy' })
}

/** 个人星图枢纽 */
export function goToPersonalHub(router: Router): void {
  void router.replace({ name: 'personalHub' })
}

/** 设计专属星图 */
export function goToPersonalDesign(router: Router): void {
  void router.push({ name: 'personalDesign' })
}

/** 展示已保存星图 */
export function goToPersonalShowcase(router: Router): void {
  void router.push({ name: 'personalShowcase' })
}

function hasHistoryBack(): boolean {
  try {
    const st = window.history.state as { back?: string | null } | null
    return st != null && st.back != null && st.back !== ''
  } catch {
    return false
  }
}

/**
 * 优先 `history.back` 返回上一级；无上级（直达子页、新开 WebView）时用静态 fallback。
 * 依赖 vue-router 写入的 `history.state.back`（与官方 history 模式一致）。
 */
export function goBackOrReplace(router: Router, fallback: RouteLocationRaw): void {
  if (hasHistoryBack()) {
    void router.back()
    return
  }
  void router.replace(fallback)
}

/** 点亮星辰页「退出」：回到大星图「专业星系」（无起止专业会话时回选择页，与 GalaxyView 一致）。 */
export function goExitFromStarlitQuiz(router: Router): void {
  goToMainGalaxy(router)
}
