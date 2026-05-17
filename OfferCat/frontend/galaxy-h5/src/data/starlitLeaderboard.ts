import { getTotalStarsLit, loadStarlitStore } from '@/data/personalStarlitStore'
import { galaxyUserId } from '@/utils/galaxySession'

export const STARLIT_LEADERBOARD_KEY = 'offercat_starlit_leaderboard_v1'
const SELF_NAME_KEY = 'offercat_starlit_self_name_v1'

export type StarlitLeaderboardEntry = {
  id: string
  displayName: string
  totalStars: number
  updatedAt: number
  isSelf?: boolean
}

type LeaderboardStoreV1 = {
  v: 1
  entries: StarlitLeaderboardEntry[]
}

function emptyLb(): LeaderboardStoreV1 {
  return { v: 1, entries: [] }
}

function loadLb(): LeaderboardStoreV1 {
  try {
    const raw = localStorage.getItem(STARLIT_LEADERBOARD_KEY)
    if (!raw) return emptyLb()
    const p = JSON.parse(raw) as LeaderboardStoreV1
    if (p?.v !== 1 || !Array.isArray(p.entries)) return emptyLb()
    return p
  } catch {
    return emptyLb()
  }
}

function saveLb(s: LeaderboardStoreV1): void {
  try {
    localStorage.setItem(STARLIT_LEADERBOARD_KEY, JSON.stringify(s))
  } catch {
    /* ignore */
  }
}

export function getSelfDisplayName(): string {
  try {
    const n = localStorage.getItem(SELF_NAME_KEY)?.trim()
    if (n) return n
  } catch {
    /* ignore */
  }
  return '我'
}

export function setSelfDisplayName(name: string): void {
  try {
    localStorage.setItem(SELF_NAME_KEY, name.trim().slice(0, 20) || '我')
  } catch {
    /* ignore */
  }
}

/** 优先请求服务端；失败则回退本机演示榜 */
export async function buildLeaderboardRowsAsync(
  userId?: number,
  packKeys?: string[],
): Promise<StarlitLeaderboardEntry[]> {
  const uid = userId ?? galaxyUserId() ?? 0
  if (uid > 0) {
    try {
      const { fetchStarlitLeaderboard } = await import('@/api/galaxyBackend')
      const data = await fetchStarlitLeaderboard(uid, packKeys)
      return data.rows.map((r) => ({
        id: r.self ? '__self__' : `u_${r.userId}`,
        displayName: r.displayName,
        totalStars: r.totalStars,
        updatedAt: Date.now(),
        isSelf: r.self,
      }))
    } catch {
      /* fallback local */
    }
  }
  return buildLeaderboardRows()
}

/** 演示用榜：无服务端时合并本机进度与占位条目 */
export function buildLeaderboardRows(): StarlitLeaderboardEntry[] {
  const total = getTotalStarsLit()
  const selfName = getSelfDisplayName()
  const selfId = '__self__'
  const now = Date.now()

  const lb = loadLb()
  let entries = lb.entries.filter((e) => e.id !== selfId)

  if (!entries.length) {
    entries = [
      { id: 'demo_1', displayName: '星尘旅人', totalStars: Math.max(0, total - 12), updatedAt: now - 86400000 },
      { id: 'demo_2', displayName: '交叉探索者', totalStars: Math.max(0, total - 28), updatedAt: now - 172800000 },
      { id: 'demo_3', displayName: '轨道观测员', totalStars: Math.max(0, total - 45), updatedAt: now - 259200000 },
    ]
  }

  const selfEntry: StarlitLeaderboardEntry = {
    id: selfId,
    displayName: selfName,
    totalStars: total,
    updatedAt: now,
    isSelf: true,
  }

  const merged = [...entries.filter((e) => e.id !== selfId), selfEntry]
  merged.sort((a, b) => b.totalStars - a.totalStars || a.displayName.localeCompare(b.displayName, 'zh'))

  saveLb({ v: 1, entries: merged.map(({ isSelf: _, ...rest }) => rest) })

  return merged.map((e) => ({ ...e, isSelf: e.id === selfId }))
}

/** 当前画布上各小行星点亮明细（展示页用） */
export function fusionStarRows(fusionIds: string[], labels: Record<string, string>) {
  const store = loadStarlitStore()
  return fusionIds.map((id) => {
    const lit = Math.max(0, Math.floor(store.byFusionId[id]?.starsLit ?? 0))
    return { fusionId: id, label: labels[id] ?? id, starsLit: lit }
  })
}
