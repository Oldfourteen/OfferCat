import * as THREE from 'three'

/** 贴图生成逻辑变更时 bump，避免命中旧缓存 */
const MAP_CACHE_VER = 'v5'

function getTextureCacheKey(variant: 'major' | 'fusion', bucket: number) {
  return `${MAP_CACHE_VER}-${variant}-${bucket}`
}

const mapCache = new Map<string, THREE.DataTexture>()

function hashStr(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function fract(n: number) {
  return n - Math.floor(n)
}

function hash2(x: number, y: number, seed: number) {
  return fract(Math.sin(x * 127.1 + y * 311.7 + seed * 0.001) * 43758.5453)
}

function noise2(x: number, y: number, seed: number) {
  const ix = Math.floor(x)
  const iy = Math.floor(y)
  const fx = x - ix
  const fy = y - iy
  const ux = fx * fx * (3 - 2 * fx)
  const uy = fy * fy * (3 - 2 * fy)
  const a = hash2(ix, iy, seed)
  const b = hash2(ix + 1, iy, seed)
  const c = hash2(ix, iy + 1, seed)
  const d = hash2(ix + 1, iy + 1, seed)
  return a + (b - a) * ux + (c - a) * uy + (d - c - (b - a)) * ux * uy
}

function fbm(x: number, y: number, seed: number) {
  let v = 0
  let a = 0.5
  let f = 1
  for (let i = 0; i < 5; i++) {
    v += a * noise2(x * f, y * f, seed + i * 17)
    f *= 2
    a *= 0.5
  }
  return v
}

/** HSL: h 0–360, s/l 0–1 → RGB 0–255（与 CSS hsl 一致） */
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const hh = (((h % 360) + 360) % 360) / 360
  const ss = Math.max(0, Math.min(1, s))
  const ll = Math.max(0, Math.min(1, l))
  const a = ss * Math.min(ll, 1 - ll)
  const f = (n: number) => {
    const k = (n + hh * 12) % 12
    return ll - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))
  }
  return [f(0) * 255, f(8) * 255, f(4) * 255]
}

/**
 * 用 DataTexture 生成高对比「条纹 + 噪声 + 裂隙」贴图，避免部分 WebView 上 CanvasTexture 看起来像纯色。
 */
function createAlbedoDataTexture(size: number, seed: number, hue: number, variant: 'major' | 'fusion') {
  const data = new Uint8Array(size * size * 4)
  const sat = variant === 'fusion' ? 0.58 : 0.52
  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      const u = px / size
      const v = py / size
      const n = fbm(u * 4.2 + seed * 0.002, v * 4.2 - seed * 0.001, seed)
      const band = Math.abs(Math.sin((u * 26 + v * 18 + seed * 0.0007) * Math.PI * 2))
      const stripe = 0.38 + 0.62 * band
      const ridge = Math.pow(Math.max(0, noise2(u * 14, v * 14, seed + 11) - 0.38), 1.4)
      const crack = noise2(u * 36, v * 36, seed + 73) > 0.82 ? 0.72 : 1
      let light = (0.22 + 0.58 * n) * stripe * (1 - ridge * 0.55) * crack
      light = Math.min(0.88, Math.max(0.12, light))
      if (variant === 'fusion') light = light * 0.92 + 0.04
      const [r, g, b] = hslToRgb(hue, sat, light)
      const i = (py * size + px) * 4
      data[i] = r
      data[i + 1] = g
      data[i + 2] = b
      data[i + 3] = 255
    }
  }
  const tex = new THREE.DataTexture(data, size, size)
  tex.format = THREE.RGBAFormat
  tex.type = THREE.UnsignedByteType
  tex.colorSpace = THREE.SRGBColorSpace
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  tex.generateMipmaps = true
  tex.minFilter = THREE.LinearMipmapLinearFilter
  tex.magFilter = THREE.LinearFilter
  tex.flipY = true
  tex.needsUpdate = true
  return tex
}

export function getNodeSurfaceTextures(nodeId: string, variant: 'major' | 'fusion'): { map: THREE.DataTexture } {
  const bucket = hashStr(nodeId) % 14
  const key = getTextureCacheKey(variant, bucket)
  let map = mapCache.get(key)
  if (!map) {
    const seed = hashStr(`${nodeId}-${variant}`) + bucket * 104729
    const hue = variant === 'major' ? 198 + (bucket % 5) * 5 : 265 + (bucket % 5) * 4
    map = createAlbedoDataTexture(256, seed, hue, variant)
    mapCache.set(key, map)
  }
  return { map }
}

export function disposeNodeSurfaceTextureCache() {
  for (const t of mapCache.values()) t.dispose()
  mapCache.clear()
}
