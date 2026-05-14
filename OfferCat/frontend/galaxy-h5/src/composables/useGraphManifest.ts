export interface Manifest {
  version: number
  nodes_url: string
  edges_url: string
  hyperedges_url: string
  layout_url: string
  layout_seed?: string
  wasm_url?: string | null
  compat?: Record<string, string | number>
}

/**
 * 图数据根路径（无末尾 /）。
 * 优先级：壳页注入 `window.__GALAXY_API_BASE__`（如网关 `.../api/galaxy`）→ `VITE_GALAXY_API_BASE` → 本地 `./mock`。
 */
export function getGalaxyDataBase(): string {
  if (typeof window !== 'undefined') {
    const injected = window.__GALAXY_API_BASE__
    if (injected != null && String(injected).trim() !== '') {
      return String(injected).trim().replace(/\/+$/, '')
    }
  }
  const env = import.meta.env.VITE_GALAXY_API_BASE as string | undefined
  if (env != null && String(env).trim() !== '') {
    return String(env).trim().replace(/\/+$/, '')
  }
  return './mock'
}

/** manifest 内 URL 若以 / 开头则相对站点根；否则拼在 mockBase 下 */
function resolveAssetUrl(ref: string, mockBase: string) {
  if (ref.startsWith('http')) return ref
  if (ref.startsWith('/')) return ref
  return `${mockBase.replace(/\/$/, '')}/${ref}`
}

export async function fetchGalaxyBundle(mockBase = '/mock') {
  const manifestUrl = resolveAssetUrl('manifest.json', mockBase)
  const manifest = (await fetch(manifestUrl).then((r) => {
    if (!r.ok) throw new Error(`manifest ${r.status}`)
    return r.json()
  })) as Manifest

  const nodesUrl = resolveAssetUrl(manifest.nodes_url, mockBase)
  const edgesUrl = resolveAssetUrl(manifest.edges_url, mockBase)
  const heUrl = resolveAssetUrl(manifest.hyperedges_url, mockBase)
  const layoutUrl = resolveAssetUrl(manifest.layout_url, mockBase)

  const [nodes, edges, hyperedges, layout] = await Promise.all([
    fetch(nodesUrl).then((r) => {
      if (!r.ok) throw new Error(`nodes ${r.status}`)
      return r.json()
    }),
    fetch(edgesUrl).then((r) => {
      if (!r.ok) throw new Error(`edges ${r.status}`)
      return r.json()
    }),
    fetch(heUrl).then((r) => {
      if (!r.ok) throw new Error(`hyperedges ${r.status}`)
      return r.json()
    }),
    fetch(layoutUrl).then((r) => {
      if (!r.ok) throw new Error(`layout ${r.status}`)
      return r.json()
    }),
  ])

  return { manifest, nodes, edges, hyperedges, layout } as const
}

export async function fetchRecommendMock(mockBase = '/mock') {
  const url = resolveAssetUrl('recommend.json', mockBase)
  const r = await fetch(url)
  if (!r.ok) throw new Error(`recommend ${r.status}`)
  return r.json() as Promise<{ suggestions: { nodeId: string; reason: string }[] }>
}
