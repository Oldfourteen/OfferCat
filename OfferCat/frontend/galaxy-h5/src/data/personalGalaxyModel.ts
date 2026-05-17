import type { CrossJobRow } from '@/data/crossJobCatalog'
import { loadCrossJobCatalog, threeJobsForMajorPair } from '@/data/crossJobCatalog'
import type { RawEdge, RawHE, RawNode } from '@/lib/galaxyThree'
import { galaxyApiReady, galaxyUserId } from '@/utils/galaxySession'
import { packKeyFromFusion, resolveMajorCode } from '@/utils/packKey'

export const PERSONAL_GALAXY_STORAGE_KEY = 'offercat_personal_galaxy_v1'

/** 画布上的大行星实例（节点 id 与 catalog 中的 majorId 分离，便于多颗同专业） */
export type PersonalMajorInst = { id: string; majorId: string; label: string }

/** 小行星：岗位行即四维属性来源，随图持久化 */
export type PersonalFusionInst = {
  id: string
  title: string
  majorA: string
  majorB: string
  row?: CrossJobRow
  /** 三选一岗位在该组合中的 0~2 序号，与 starlit_pack.pack_key 末位一致 */
  jobSlot?: number
  /** 建 fusion 时写入，避免仅靠 major 实例 id 推导 pack_key */
  packKey?: string
}

export type PersonalGalaxyV1 = {
  v: 1
  majors: PersonalMajorInst[]
  fusions: PersonalFusionInst[]
  updatedAt: number
}

export type PersonalGalaxyMountBundle = {
  nodes: RawNode[]
  edges: RawEdge[]
  hyperedges: RawHE[]
  layout: Record<string, { x: number; y: number; z: number }>
}

const R = 6

function layoutPersonal(majors: PersonalMajorInst[], fusions: PersonalFusionInst[]) {
  const layout: Record<string, { x: number; y: number; z: number }> = {}
  const n = majors.length
  for (let i = 0; i < n; i++) {
    const m = majors[i]!
    const ang = (2 * Math.PI * i) / Math.max(n, 1)
    layout[m.id] = { x: R * Math.cos(ang), y: 0.25, z: R * Math.sin(ang) }
  }
  for (const f of fusions) {
    const pa = layout[f.majorA]
    const pb = layout[f.majorB]
    if (!pa || !pb) continue
    const mid = { x: (pa.x + pb.x) * 0.5, y: (pa.y + pb.y) * 0.5 + 0.6, z: (pa.z + pb.z) * 0.5 }
    layout[f.id] = mid
  }
  return layout
}

function rowToFusionMeta(row: CrossJobRow): Record<string, string> {
  return {
    subtitle: `${row.heat} · 初${row.salaryJunior} / 中${row.salaryMid} / 高${row.salarySenior}`,
    tagline: `${row.workIntensity}级强度 · 竞争${row.competition}`,
    heat: row.heat,
    salaryJunior: row.salaryJunior,
    salaryMid: row.salaryMid,
    salarySenior: row.salarySenior,
    workIntensity: row.workIntensity,
    competition: row.competition,
    education: row.education,
    skills: row.skills,
    catalogIdx: String(row.idx),
    pair: row.pair,
  }
}

/** 由个人星系状态生成 mountGalaxyThree 所需 bundle（边：小行星—大行星；超边：融合域） */
export function buildPersonalGalaxyMountBundle(majors: PersonalMajorInst[], fusions: PersonalFusionInst[]): PersonalGalaxyMountBundle {
  const layout = layoutPersonal(majors, fusions)
  const nodes: RawNode[] = []

  for (const m of majors) {
    nodes.push({
      id: m.id,
      type: 'major',
      label: m.label,
      meta: { tagline: '个人星系 · 大行星' },
    })
  }
  for (const f of fusions) {
    nodes.push({
      id: f.id,
      type: 'fusion',
      label: f.title,
      meta: f.row ? rowToFusionMeta(f.row) : { tagline: '个人星系 · 小行星' },
    })
  }

  const edges: RawEdge[] = fusions.flatMap((f) => [
    { u: f.id, v: f.majorA },
    { u: f.id, v: f.majorB },
  ])

  const hyperedges: RawHE[] = fusions.map((f) => ({
    id: `he_${f.id}`,
    member_node_ids: [f.majorA, f.majorB, f.id],
    style_hint: 'personal',
  }))

  return { nodes, edges, hyperedges, layout }
}

export function toPersistedPayload(majors: PersonalMajorInst[], fusions: PersonalFusionInst[]): PersonalGalaxyV1 {
  return { v: 1, majors: [...majors], fusions: [...fusions], updatedAt: Date.now() }
}

export function loadPersonalGalaxyFromStorage(): PersonalGalaxyV1 | null {
  try {
    const raw = localStorage.getItem(PERSONAL_GALAXY_STORAGE_KEY)
    if (!raw) return null
    const p = JSON.parse(raw) as PersonalGalaxyV1
    if (p?.v !== 1 || !Array.isArray(p.majors) || !Array.isArray(p.fusions)) return null
    return p
  } catch {
    return null
  }
}

export function savePersonalGalaxyToStorage(payload: PersonalGalaxyV1): void {
  try {
    localStorage.setItem(PERSONAL_GALAXY_STORAGE_KEY, JSON.stringify(payload))
  } catch {
    /* quota / private mode */
  }
}

function isPersonalGalaxyV1(data: unknown): data is PersonalGalaxyV1 {
  const p = data as PersonalGalaxyV1
  return !!p && p.v === 1 && Array.isArray(p.majors) && Array.isArray(p.fusions)
}

/** 为旧数据补全 row / jobSlot / packKey（云端存档可能只有 title + 连线 id） */
async function normalizePersonalGalaxyAsync(galaxy: PersonalGalaxyV1): Promise<PersonalGalaxyV1> {
  try {
    await loadCrossJobCatalog()
  } catch {
    /* 无岗位表时仍尝试用 row.pair 推导 pack_key */
  }
  const majors = galaxy.majors
  let changed = false
  const fusions: PersonalFusionInst[] = []
  for (const f of galaxy.fusions) {
    let next = f
    const codeA = resolveMajorCode(f.majorA, majors)
    const codeB = resolveMajorCode(f.majorB, majors)
    if (codeA && codeB && (!f.row || f.jobSlot == null || !f.packKey)) {
      try {
        const jobs = await threeJobsForMajorPair(codeA, codeB)
        if (jobs.length > 0) {
          let jobSlot = f.jobSlot ?? 0
          let row = f.row
          if (f.title?.trim()) {
            const i = jobs.findIndex((j) => j.title === f.title)
            if (i >= 0) {
              jobSlot = i
              row = jobs[i]
            }
          }
          if (!row) row = jobs[jobSlot] ?? jobs[0]
          next = { ...next, row, jobSlot }
          changed = true
        }
      } catch {
        /* 岗位表未加载则跳过 */
      }
    }
    const packKey = packKeyFromFusion(next, majors) ?? next.packKey
    if (packKey && packKey !== next.packKey) {
      next = { ...next, packKey }
      changed = true
    }
    fusions.push(next)
  }
  return changed ? { ...galaxy, fusions, updatedAt: Date.now() } : galaxy
}

/**
 * 加载个人星图：有 API 时优先服务端（新于本地则覆盖本地），否则仅本地。
 */
export async function loadPersonalGalaxyHydrated(): Promise<PersonalGalaxyV1 | null> {
  const local = loadPersonalGalaxyFromStorage()
  const wrap = async (g: PersonalGalaxyV1 | null) => (g ? normalizePersonalGalaxyAsync(g) : null)
  if (!galaxyApiReady()) return wrap(local)

  const userId = galaxyUserId()
  if (!userId) return wrap(local)

  try {
    const { loadPersonalGalaxy } = await import('@/api/galaxyBackend')
    const remote = await loadPersonalGalaxy(userId)
    if (remote && isPersonalGalaxyV1(remote)) {
      const merged: PersonalGalaxyV1 = {
        ...remote,
        updatedAt: remote.updatedAt ?? Date.now(),
      }
      if (!local || (merged.updatedAt ?? 0) >= (local.updatedAt ?? 0)) {
        const normalized = await normalizePersonalGalaxyAsync(merged)
        savePersonalGalaxyToStorage(normalized)
        return normalized
      }
    }
  } catch {
    /* 离线回退本地 */
  }
  return wrap(local)
}

export async function syncPersonalGalaxyToServer(
  payload: PersonalGalaxyV1,
  userId?: number | null,
): Promise<{ ok: boolean }> {
  const uid = userId ?? galaxyUserId()
  if (uid == null || uid <= 0) return { ok: false }
  if (!galaxyApiReady()) return { ok: false }
  try {
    const { savePersonalGalaxy } = await import('@/api/galaxyBackend')
    await savePersonalGalaxy(uid, payload)
    return { ok: true }
  } catch {
    return { ok: false }
  }
}
