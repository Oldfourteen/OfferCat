/**
 * 小行星「点亮星辰」进度（前端占位：localStorage；后续接服务端 user_starlit_progress）。
 * 每颗融合小行星（每套题库包）独立计星：答对 +1，单包上限 {@link STARLIT_MAX_STARS_PER_FUSION}。
 * 全图总星数 = 各 fusion 之和（例如 3 颗小行星各 50 → 最多 150，与岗位表规模相关，非全局 50）。
 */
export const PERSONAL_STARLIT_STORAGE_KEY = 'offercat_personal_starlit_v1'

/** 单个小行星 / 单套 starlit_pack 最多点亮的星数（与 question_count 一致，默认 50） */
export const STARLIT_MAX_STARS_PER_FUSION = 50
/** @deprecated 使用 STARLIT_MAX_STARS_PER_FUSION；保留别名避免大量改名 */
export const STARLIT_MAX_STARS = STARLIT_MAX_STARS_PER_FUSION
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

export function getStarsLit(fusionId: string, maxPerFusion = STARLIT_MAX_STARS_PER_FUSION): number {
  const n = loadStarlitStore().byFusionId[fusionId]?.starsLit ?? 0
  const cap = Math.max(1, Math.floor(maxPerFusion))
  return Math.min(cap, Math.max(0, Math.floor(n)))
}

/** 本机已点亮的总星数（所有 fusion 累加） */
export function getTotalStarsLit(): number {
  const store = loadStarlitStore()
  return Object.keys(store.byFusionId).reduce((s, id) => s + getStarsLit(id), 0)
}

/** 仅统计给定 fusion 节点 id 的总星数（展示页当前星系） */
export function getTotalStarsLitForFusions(fusionIds: readonly string[]): number {
  return fusionIds.reduce((s, id) => s + getStarsLit(id), 0)
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
  const next = Math.min(STARLIT_MAX_STARS_PER_FUSION, prev + 1)
  s.byFusionId[fusionId] = {
    starsLit: next,
    lastQuestionIndex: (prevRecord?.lastQuestionIndex ?? 0) + 1,
    updatedAt: Date.now(),
  }
  saveStarlitStore(s)
  return next
}
