/** 与《具体专业》表中学科组合名称对齐（用于查三岗） */
export const MAJOR_ID_TO_TXT: Record<string, string> = {
  major_electrical: '电气工程',
  major_law: '法学',
  major_accounting: '会计学',
  major_cs: '计算机科学',
  major_finance: '金融学',
  major_clinical: '临床医学',
  major_swe: '软件工程',
  major_marketing: '市场营销',
  major_ds: '数据科学',
  major_english: '英语',
}

export function pairKeysFromMajorIds(a: string, b: string): [string, string] {
  const na = MAJOR_ID_TO_TXT[a]
  const nb = MAJOR_ID_TO_TXT[b]
  if (!na || !nb) return ['', '']
  return [`${na}×${nb}`, `${nb}×${na}`]
}
