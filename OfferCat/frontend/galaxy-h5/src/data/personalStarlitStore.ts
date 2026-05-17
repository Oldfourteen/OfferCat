/**
 * 小行星「点亮星辰」进度：本地 localStorage + 可选同步 user_starlit_progress。
 */
import type { PersonalFusionInst } from '@/data/personalGalaxyModel'
import { loadPersonalGalaxyFromStorage } from '@/data/personalGalaxyModel'
import { galaxyApiReady, galaxyUserId } from '@/utils/galaxySession'
import { packKeyFromFusion, packKeyFromFusionId } from '@/utils/packKey'

export const PERSONAL_STARLIT_STORAGE_KEY = 'offercat_personal_starlit_v1'

export const STARLIT_MAX_STARS_PER_FUSION = 50
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

async function syncFusionProgressToServer(fusionId: string, record: StarlitFusionRecord): Promise<void> {
  if (!galaxyApiReady()) return
  const userId = galaxyUserId()
  if (!userId) return
  const galaxy = loadPersonalGalaxyFromStorage()
  if (!galaxy) return
  const packKey = packKeyFromFusionId(fusionId, galaxy.fusions, galaxy.majors)
  if (!packKey) return
  try {
    const { upsertStarlitProgress } = await import('@/api/galaxyBackend')
    await upsertStarlitProgress(userId, packKey, record.starsLit, record.lastQuestionIndex)
  } catch {
    /* 静默失败，保留本地进度 */
  }
}

/** 从服务端拉取进度并合并到本地（按当前个人星图 fusion 列表映射 packKey） */
export async function hydrateStarlitFromServer(fusions?: readonly PersonalFusionInst[]): Promise<void> {
  if (!galaxyApiReady()) return
  const userId = galaxyUserId()
  if (!userId) return

  const stored = loadPersonalGalaxyFromStorage()
  const fusionList = fusions ?? stored?.fusions ?? []
  const majors = stored?.majors ?? []
  if (!fusionList.length) return

  const packKeyToFusionId = new Map<string, string>()
  for (const f of fusionList) {
    const pk = packKeyFromFusion(f, majors)
    if (pk) packKeyToFusionId.set(pk, f.id)
  }

  try {
    const { fetchStarlitProgress } = await import('@/api/galaxyBackend')
    const rows = await fetchStarlitProgress(userId)
    const store = loadStarlitStore()
    let changed = false
    for (const row of rows) {
      const fusionId = packKeyToFusionId.get(row.packKey)
      if (!fusionId) continue
      const remoteStars = Math.max(0, Math.floor(row.starsLit))
      const localStars = store.byFusionId[fusionId]?.starsLit ?? 0
      const starsLit = Math.max(localStars, remoteStars)
      if (starsLit !== localStars || !store.byFusionId[fusionId]) {
        store.byFusionId[fusionId] = {
          starsLit,
          lastQuestionIndex: row.lastQuestionNo ?? store.byFusionId[fusionId]?.lastQuestionIndex ?? 0,
          updatedAt: Date.now(),
        }
        changed = true
      }
    }
    if (changed) saveStarlitStore(store)
  } catch {
    /* ignore */
  }
}

export function getStarsLit(fusionId: string, maxPerFusion = STARLIT_MAX_STARS_PER_FUSION): number {
  const n = loadStarlitStore().byFusionId[fusionId]?.starsLit ?? 0
  const cap = Math.max(1, Math.floor(maxPerFusion))
  return Math.min(cap, Math.max(0, Math.floor(n)))
}

export function getTotalStarsLit(): number {
  const store = loadStarlitStore()
  return Object.keys(store.byFusionId).reduce((s, id) => s + getStarsLit(id), 0)
}

export function getTotalStarsLitForFusions(fusionIds: readonly string[]): number {
  return fusionIds.reduce((s, id) => s + getStarsLit(id), 0)
}

export function computeAmbientStarBoost(nodes: readonly { id: string; type: string }[]): number {
  const fusions = nodes.filter((n) => n.type === 'fusion')
  if (!fusions.length) return 0
  const sum = fusions.reduce((s, n) => s + getStarsLit(n.id), 0)
  return Math.min(1, sum / (fusions.length * STARLIT_MAX_STARS_PER_FUSION))
}

/** 答对一题：+1 星，不超过上限，并尝试同步服务端 */
export function incrementStarlit(fusionId: string): number {
  const s = loadStarlitStore()
  const prevRecord = s.byFusionId[fusionId]
  const prev = prevRecord?.starsLit ?? 0
  const next = Math.min(STARLIT_MAX_STARS_PER_FUSION, prev + 1)
  const record: StarlitFusionRecord = {
    starsLit: next,
    lastQuestionIndex: (prevRecord?.lastQuestionIndex ?? 0) + 1,
    updatedAt: Date.now(),
  }
  s.byFusionId[fusionId] = record
  saveStarlitStore(s)
  void syncFusionProgressToServer(fusionId, record)
  return next
}
