export const MAJORS = [
  { id: 'major_electrical', label: '电气', tagline: '能源与自动化' },
  { id: 'major_law', label: '法学', tagline: '合规与证据' },
  { id: 'major_accounting', label: '会计', tagline: '财报与内控' },
  { id: 'major_cs', label: '计科', tagline: '算法与系统' },
  { id: 'major_finance', label: '金融', tagline: '定价与风险' },
  { id: 'major_clinical', label: '临床', tagline: '诊疗路径' },
  { id: 'major_swe', label: '软工', tagline: '交付与质量' },
  { id: 'major_marketing', label: '市场', tagline: '增长与品牌' },
  { id: 'major_ds', label: '数据科学', tagline: '推断与实验' },
  { id: 'major_english', label: '英语', tagline: '跨文化沟通' },
] as const

export const GALAXY_MAJORS_KEY = 'galaxy_majors'

export type GalaxyMajorsPayload = { fromId: string; toId: string }
