import { getGalaxyApiBase, getGalaxyUserId } from '@/utils/galaxySession'
import type { PersonalGalaxyV1 } from '@/data/personalGalaxyModel'

function apiBase(): string {
  return getGalaxyApiBase()
}

function url(path: string): string {
  const base = apiBase()
  if (!base) return path
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

type ApiResult<T> = { code: number; msg: string; data: T }

async function parseJson<T>(r: Response): Promise<T> {
  const j = (await r.json()) as ApiResult<T>
  if (j.code !== 200) {
    throw new Error(j.msg || `HTTP ${r.status}`)
  }
  return j.data
}

export function galaxyApiReady(): boolean {
  return apiBase().length > 0
}

export function galaxyUserId(): number | null {
  return getGalaxyUserId()
}

export async function fetchRecommend(selectedNodeId?: string | null) {
  const qs = new URLSearchParams()
  if (selectedNodeId) qs.set('selectedNodeId', selectedNodeId)
  const q = qs.toString()
  const r = await fetch(url(`/recommend.json${q ? `?${q}` : ''}`))
  if (!r.ok) throw new Error(`recommend ${r.status}`)
  return r.json() as Promise<{
    suggestions: { nodeId: string; reason: string }[]
    algorithm?: string
    note?: string
  }>
}

export async function loadPersonalGalaxy(userId: number): Promise<PersonalGalaxyV1 | null> {
  const r = await fetch(url(`/personal?userId=${userId}`))
  const j = (await r.json()) as ApiResult<PersonalGalaxyV1>
  if (j.code === 404) return null
  if (j.code !== 200) throw new Error(j.msg || `personal ${r.status}`)
  return j.data
}

export async function savePersonalGalaxy(userId: number, galaxy: PersonalGalaxyV1): Promise<void> {
  const r = await fetch(url('/personal'), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, galaxy }),
  })
  await parseJson<null>(r)
}

export async function fetchPersonalPackKeys(userId: number): Promise<string[]> {
  const r = await fetch(url(`/personal/pack-keys?userId=${userId}`))
  return parseJson<string[]>(r)
}

export type StarlitProgressRow = {
  packKey: string
  starsLit: number
  lastQuestionNo: number | null
}

export async function fetchStarlitProgress(userId: number): Promise<StarlitProgressRow[]> {
  const r = await fetch(url(`/starlit/progress?userId=${userId}`))
  return parseJson<StarlitProgressRow[]>(r)
}

export async function upsertStarlitProgress(
  userId: number,
  packKey: string,
  starsLit: number,
  lastQuestionNo?: number,
): Promise<void> {
  const r = await fetch(url('/starlit/progress'), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, packKey, starsLit, lastQuestionNo }),
  })
  await parseJson<null>(r)
}

export type StarlitQuestionDto = {
  questionNo: number
  stem: string
  options: string[]
  correctIndex: number
}

export async function fetchStarlitQuestions(packKey: string): Promise<StarlitQuestionDto[]> {
  const r = await fetch(url(`/starlit/pack/${encodeURIComponent(packKey)}/questions`))
  return parseJson<StarlitQuestionDto[]>(r)
}

export async function fetchStarlitLeaderboard(userId: number, packKeys?: string[]) {
  const qs = new URLSearchParams({ userId: String(userId), limit: '30' })
  if (packKeys?.length) qs.set('packKeys', packKeys.join(','))
  const r = await fetch(url(`/starlit/leaderboard?${qs}`))
  return parseJson<{
    rows: { rank: number; userId: number; displayName: string; totalStars: number; self: boolean }[]
    selfTotalStars: number
    selfRank: number | null
    canvasTotalStars: number
  }>(r)
}
