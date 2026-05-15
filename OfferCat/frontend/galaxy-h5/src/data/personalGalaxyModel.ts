import type { CrossJobRow } from '@/data/crossJobCatalog'
import type { RawEdge, RawHE, RawNode } from '@/lib/galaxyThree'

export const PERSONAL_GALAXY_STORAGE_KEY = 'offercat_personal_galaxy_v1'

/** 画布上的大行星实例（节点 id 与 catalog 中的 majorId 分离，便于多颗同专业） */
export type PersonalMajorInst = { id: string; majorId: string; label: string }

/** 小行星：岗位行即四维属性来源，随图持久化 */
export type PersonalFusionInst = {
  id: string
  title: string
  majorA: string
  majorB: string
  row: CrossJobRow
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
      meta: rowToFusionMeta(f.row),
    })
  }

  const edges: RawEdge[] = []
  for (const f of fusions) {
    edges.push({ u: f.id, v: f.majorA, kind: 'fusion-major' })
    edges.push({ u: f.id, v: f.majorB, kind: 'fusion-major' })
  }

  const hyperedges: RawHE[] = fusions.map((f) => ({
    id: `he_${f.id}`,
    member_node_ids: [f.id, f.majorA, f.majorB],
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

/**
 * 预留：用户星图同步到服务端（实现时替换为真实 POST）。
 * body 与 {@link PersonalGalaxyV1} 一致即可复用本地模型。
 */
export async function syncPersonalGalaxyToServer(_payload: PersonalGalaxyV1): Promise<{ ok: boolean }> {
  return { ok: false }
}
