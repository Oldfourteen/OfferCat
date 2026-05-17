import type { PersonalFusionInst } from '@/data/personalGalaxyModel'

/** 与后端 PackKeyUtil / starlit_pack.pack_key 约定一致 */
export function packKeyFromFusion(fusion: Pick<PersonalFusionInst, 'majorA' | 'majorB' | 'row'>): string | null {
  const majorA = fusion.majorA?.trim()
  const majorB = fusion.majorB?.trim()
  if (!majorA || !majorB || !fusion.row) return null
  const catalogIdx = fusion.row.idx
  let slot = ((catalogIdx - 1) % 3 + 3) % 3
  const a = majorA <= majorB ? majorA : majorB
  const b = majorA <= majorB ? majorB : majorA
  if (majorA !== a) {
    slot = 2 - slot
  }
  return `${a}__${b}:${slot}`
}

export function packKeyFromFusionId(
  fusionId: string,
  fusions: readonly PersonalFusionInst[],
): string | null {
  const f = fusions.find((x) => x.id === fusionId)
  return f ? packKeyFromFusion(f) : null
}
