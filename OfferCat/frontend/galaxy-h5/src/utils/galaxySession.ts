/** 由 uni-app 壳页 iframe 查询参数注入（见 public/iframe.html） */

export function getGalaxyApiBase(): string {
  if (typeof window === 'undefined') return ''
  const injected = (window as Window & { __GALAXY_API_BASE__?: string }).__GALAXY_API_BASE__
  if (injected != null && String(injected).trim() !== '') {
    return String(injected).trim().replace(/\/+$/, '')
  }
  const env = import.meta.env.VITE_GALAXY_API_BASE as string | undefined
  if (env != null && String(env).trim() !== '') {
    return String(env).trim().replace(/\/+$/, '')
  }
  return ''
}

export function getGalaxyUserId(): number | null {
  if (typeof window === 'undefined') return null
  const raw = (window as Window & { __GALAXY_USER_ID__?: string | number }).__GALAXY_USER_ID__
  if (raw === '' || raw == null) return null
  const n = typeof raw === 'number' ? raw : Number(raw)
  if (!Number.isFinite(n) || n <= 0) return null
  return n
}

export function isGalaxyApiEnabled(): boolean {
  return getGalaxyApiBase().length > 0 && getGalaxyUserId() != null
}

/** @alias isGalaxyApiEnabled */
export const galaxyApiReady = isGalaxyApiEnabled

/** @alias getGalaxyUserId */
export const galaxyUserId = getGalaxyUserId
