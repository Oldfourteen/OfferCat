/**
 * 小行星「点亮星辰」进度（前端占位：localStorage；后续可换为服务端用户星图字段）。
 * 每答对一题 +1 星，上限 {@link STARLIT_MAX_STARS}。
 */
export const PERSONAL_STARLIT_STORAGE_KEY = 'offercat_personal_starlit_v1'

export const STARLIT_MAX_STARS = 50
export const STARLIT_QUESTION_COUNT = 50

export type StarlitFusionRecord = {
  starsLit: number
  lastQuestionIndex: number
  updatedAt: number
}

export type StarlitStoreV1 = {
  v: 1
  byFusionId: Record<string, StarlitFusionRecord>
  updatedAt: number
}

function emptyStore(): StarlitStoreV1 {
  return { v: 1, byFusionId: {}, updatedAt: Date.now() }
}

export function loadStarlitStore(): StarlitStoreV1 {
  try {
    const raw = localStorage.getItem(PERSONAL_STARLIT_STORAGE_KEY)
    if (!raw) return emptyStore()
    const p = JSON.parse(raw) as StarlitStoreV1
    if (p?.v !== 1 || typeof p.byFusionId !== 'object') return emptyStore()
    return p
  } catch {
    return emptyStore()
  }
}

function saveStarlitStore(s: StarlitStoreV1): void {
  s.updatedAt = Date.now()
  try {
    localStorage.setItem(PERSONAL_STARLIT_STORAGE_KEY, JSON.stringify(s))
  } catch {
    /* ignore */
  }
}

export function getStarsLit(fusionId: string): number {
  const n = loadStarlitStore().byFusionId[fusionId]?.starsLit ?? 0
  return Math.min(STARLIT_MAX_STARS, Math.max(0, Math.floor(n)))
}

/** 根据所有融合小行星的点亮进度，得到 0~1 的全场景星尘充盈系数 */
export function computeAmbientStarBoost(nodes: readonly { id: string; type: string }[]): number {
  const fusions = nodes.filter((n) => n.type === 'fusion')
  if (!fusions.length) return 0
  const sum = fusions.reduce((s, n) => s + getStarsLit(n.id), 0)
  return Math.min(1, sum / (fusions.length * STARLIT_MAX_STARS))
}

/** 答对一题：+1 星，不超过上限 */
export function incrementStarlit(fusionId: string): number {
  const s = loadStarlitStore()
  const prevRecord = s.byFusionId[fusionId]
  const prev = prevRecord?.starsLit ?? 0
  const next = Math.min(STARLIT_MAX_STARS, prev + 1)
  s.byFusionId[fusionId] = {
    starsLit: next,
    lastQuestionIndex: (prevRecord?.lastQuestionIndex ?? 0) + 1,
    updatedAt: Date.now(),
  }
  saveStarlitStore(s)
  return next
}
