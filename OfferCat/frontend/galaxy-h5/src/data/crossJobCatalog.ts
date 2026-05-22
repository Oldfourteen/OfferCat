import { majorCodesFromPairLabel, pairKeysFromMajorIds, unorderedPairKey } from '@/data/majorTxtMap'
/** 打包进 bundle，避免 App WebView（file://）下 fetch 本地 tsv 报 Failed to fetch */
import bundledCrossJobTsv from '../../public/data/cross_job_catalog.tsv?raw'

export type CrossJobRow = {
  idx: number
  pair: string
  title: string
  heat: string
  salaryJunior: string
  salaryMid: string
  salarySenior: string
  workIntensity: string
  competition: string
  education: string
  skills: string
}

/** 解析 public/data/cross_job_catalog.tsv（由《具体专业》复制，制表符分隔） */
export function parseCrossJobTsv(raw: string): CrossJobRow[] {
  const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0)
  const out: CrossJobRow[] = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!
    if (line.startsWith('序号') || line.startsWith('\t序号')) continue
    const cols = line.split('\t')
    if (cols.length < 11) continue
    const idx = Number.parseInt(cols[0]!, 10)
    if (!Number.isFinite(idx)) continue
    out.push({
      idx,
      pair: cols[1]!.trim(),
      title: cols[2]!.trim(),
      heat: cols[3]!.trim(),
      salaryJunior: cols[4]!.trim(),
      salaryMid: cols[5]!.trim(),
      salarySenior: cols[6]!.trim(),
      workIntensity: cols[7]!.trim(),
      competition: cols[8]!.trim(),
      education: cols[9]!.trim(),
      skills: cols[10]!.trim(),
    })
  }
  return out
}

let cache: CrossJobRow[] | null = null
/** 无序学科对 → starlit 用的 [major_a, major_b] 顺序（来自岗位表 pair 列） */
const canonicalOrderByPair = new Map<string, [string, string]>()

function indexCanonicalOrders(rows: CrossJobRow[]) {
  canonicalOrderByPair.clear()
  for (const row of rows) {
    const codes = majorCodesFromPairLabel(row.pair)
    if (!codes) continue
    const key = unorderedPairKey(codes[0], codes[1])
    if (!canonicalOrderByPair.has(key)) {
      canonicalOrderByPair.set(key, codes)
    }
  }
}

export function getCanonicalMajorCodes(codeA: string, codeB: string, pairHint?: string): [string, string] {
  if (pairHint) {
    const fromHint = majorCodesFromPairLabel(pairHint)
    if (fromHint) return fromHint
  }
  const hit = canonicalOrderByPair.get(unorderedPairKey(codeA, codeB))
  if (hit) return hit
  return codeA <= codeB ? [codeA, codeB] : [codeB, codeA]
}

export async function loadCrossJobCatalog(): Promise<CrossJobRow[]> {
  if (cache) return cache
  if (bundledCrossJobTsv && String(bundledCrossJobTsv).trim().length > 0) {
    cache = parseCrossJobTsv(String(bundledCrossJobTsv))
    indexCanonicalOrders(cache)
    return cache
  }
  const url = `${import.meta.env.BASE_URL}data/cross_job_catalog.tsv`.replace(/\/{2,}/g, '/')
  try {
    const r = await fetch(url)
    if (!r.ok) throw new Error(`无法加载岗位表: ${r.status}`)
    cache = parseCrossJobTsv(await r.text())
  } catch (e) {
    const hint = e instanceof Error ? e.message : '网络异常'
    throw new Error(`无法加载岗位表（${hint}）`)
  }
  indexCanonicalOrders(cache)
  return cache
}

/** 同一学科组合在表中通常连续 3 行 → 三选一岗位 */
export async function threeJobsForMajorPair(majorIdA: string, majorIdB: string): Promise<CrossJobRow[]> {
  const [k1, k2] = pairKeysFromMajorIds(majorIdA, majorIdB)
  if (!k1) return []
  const rows = await loadCrossJobCatalog()
  const hit = rows.filter((r) => r.pair === k1 || r.pair === k2)
  if (hit.length >= 3) return hit.slice(0, 3)
  return hit
}
