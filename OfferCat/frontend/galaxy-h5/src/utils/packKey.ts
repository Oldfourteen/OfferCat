import type { PersonalFusionInst, PersonalMajorInst } from '@/data/personalGalaxyModel'
import { getCanonicalMajorCodes } from '@/data/crossJobCatalog'
import { MAJOR_ID_TO_TXT } from '@/data/majorTxtMap'

/** 画布实例 id（m_major_ds_173…）→ 学科 code（major_ds） */
export function resolveMajorCode(
  ref: string | undefined,
  majors?: readonly Pick<PersonalMajorInst, 'id' | 'majorId' | 'label'>[],
): string {
  const t = (ref ?? '').trim()
  if (!t) return ''
  const inst = majors?.find((m) => m.id === t)
  if (inst?.majorId) return inst.majorId
  const byLabel = majors?.find((m) => m.label === t)
  if (byLabel?.majorId) return byLabel.majorId
  if (t.startsWith('m_')) {
    const m = /^m_(.+)_\d+$/.exec(t)
    if (m?.[1]) return m[1]
  }
  if (t.startsWith('major_')) return t
  const fromTxt = Object.entries(MAJOR_ID_TO_TXT).find(([, label]) => label === t)?.[0]
  return fromTxt ?? ''
}

function slotForFusion(fusion: Pick<PersonalFusionInst, 'row' | 'jobSlot'>): number {
  if (fusion.jobSlot != null && fusion.jobSlot >= 0 && fusion.jobSlot <= 2) {
    return fusion.jobSlot
  }
  if (fusion.row?.idx != null) {
    return ((fusion.row.idx - 1) % 3 + 3) % 3
  }
  return 0
}

/** 与后端 PackKeyUtil / starlit_pack.pack_key 约定一致 */
export function packKeyFromFusion(
  fusion: Pick<PersonalFusionInst, 'majorA' | 'majorB' | 'row' | 'jobSlot' | 'packKey'>,
  majors?: readonly Pick<PersonalMajorInst, 'id' | 'majorId' | 'label'>[],
): string | null {
  if (fusion.packKey?.trim()) return fusion.packKey.trim()
  const codeA = resolveMajorCode(fusion.majorA, majors)
  const codeB = resolveMajorCode(fusion.majorB, majors)
  if (!codeA || !codeB) return null
  const [ma, mb] = getCanonicalMajorCodes(codeA, codeB, fusion.row?.pair)
  const slot = slotForFusion(fusion)
  return `${ma}__${mb}:${slot}`
}

export function packKeyFromFusionId(
  fusionId: string,
  fusions: readonly PersonalFusionInst[],
  majors?: readonly Pick<PersonalMajorInst, 'id' | 'majorId' | 'label'>[],
): string | null {
  const f = fusions.find((x) => x.id === fusionId)
  return f ? packKeyFromFusion(f, majors) : null
}
