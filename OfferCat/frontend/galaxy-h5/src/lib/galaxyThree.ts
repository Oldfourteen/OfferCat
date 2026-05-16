import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { disposeNodeSurfaceTextureCache, getNodeSurfaceTextures } from '@/lib/nodeSurfaceTexture'

export type RawNode = { id: string; type: string; label: string; meta?: Record<string, string> }
export type RawEdge = { u: string; v: string; weight?: number; kind?: string }
export type RawHE = { id: string; member_node_ids: string[]; style_hint?: string }

const COL_BG = 0x070b12
const COL_FOG = 0x4a6080
const COL_MAJOR = 0x8ae8ff
const COL_MAJOR_EMISSIVE = 0x1a4a6a
const COL_FUSION = 0xb8a8ff
const COL_FUSION_EMISSIVE = 0x2a2048
const COL_LINE = 0x4a5c78
const COL_LINE_PATH = 0x5cf0ff
const COL_HALO = 0xc8e4ff
const COL_STARFIELD = 0x9bb8e8
/** OrbitControls.autoRotateSpeed 单位与官方一致，约 1~2 即可明显看到旋转 */
const AUTO_ROTATE_ORBIT_SPEED = 1.35
const AUTO_ROTATE_IDLE_MS = 4000

/** 融合小行星轨道四象短标签（完整数值在业务侧弹层） */
const FUSION_QUADRANT_LABELS = ['热度/年薪', '强度/竞争', '学历门槛', '学科技能'] as const

export interface GalaxyVisualState {
  pathIds: Set<string>
  selectedId: string | null
  hyperMemberIds: Set<string>
  activeHyperedgeIds: Set<string>
}

export interface GalaxyMountOptions {
  /** 0~1：随「点亮」进度加厚远景星尘，充盈整幅 3D 画面（不挂在小行星轨道上） */
  ambientStarBoost?: number
}

export function mountGalaxyThree(
  container: HTMLElement,
  data: {
    nodes: RawNode[]
    edges: RawEdge[]
    hyperedges: RawHE[]
    layout: Record<string, { x: number; y: number; z: number }>
  },
  initial: GalaxyVisualState,
  onPick: (nodeId: string | null) => void,
  opts?: GalaxyMountOptions,
) {
  const width = container.clientWidth || window.innerWidth
  const height = container.clientHeight || window.innerHeight

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(COL_BG)
  scene.fog = new THREE.FogExp2(COL_FOG, 0.032)

  const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 200)
  camera.position.set(12, 10, 16)

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(width, height)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.12
  if (!container.style.position) container.style.position = 'relative'
  container.appendChild(renderer.domElement)

  const labelLayer = document.createElement('div')
  labelLayer.style.cssText =
    'position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:3;touch-action:none;'
  container.appendChild(labelLayer)
  const labelRenderer = new CSS2DRenderer({ element: labelLayer })
  labelRenderer.setSize(width, height)

  const pixelRatio = Math.min(window.devicePixelRatio, 2)
  const composer = new EffectComposer(renderer)
  composer.setPixelRatio(pixelRatio)
  const renderPass = new RenderPass(scene, camera)
  const bloomResolution = new THREE.Vector2(
    Math.max(128, Math.floor((width * pixelRatio) / 2)),
    Math.max(128, Math.floor((height * pixelRatio) / 2)),
  )
  const bloomPass = new UnrealBloomPass(bloomResolution, 0.34, 0.34, 0.88)
  const outputPass = new OutputPass()
  composer.addPass(renderPass)
  composer.addPass(bloomPass)
  composer.addPass(outputPass)

  const hemi = new THREE.HemisphereLight(0x8aaee8, 0x151820, 0.62)
  scene.add(hemi)
  const dir = new THREE.DirectionalLight(0xf0f6ff, 0.55)
  dir.position.set(8, 14, 10)
  scene.add(dir)
  const fill = new THREE.DirectionalLight(0x6080c8, 0.22)
  fill.position.set(-12, -2, -8)
  scene.add(fill)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.06
  controls.minDistance = 4
  controls.maxDistance = 48
  /** 与 damping 配套：必须用 Orbit 内置 autoRotate，手动改 camera.position 会被 update() 每帧覆盖 */
  controls.autoRotate = true
  controls.autoRotateSpeed = AUTO_ROTATE_ORBIT_SPEED

  let autoRotateResumeTimer: number | null = null
  let isUserInteracting = false

  const clearAutoRotateResumeTimer = () => {
    if (autoRotateResumeTimer !== null) {
      window.clearTimeout(autoRotateResumeTimer)
      autoRotateResumeTimer = null
    }
  }

  const scheduleAutoRotateResume = () => {
    clearAutoRotateResumeTimer()
    autoRotateResumeTimer = window.setTimeout(() => {
      if (!isUserInteracting) {
        controls.autoRotate = true
      }
    }, AUTO_ROTATE_IDLE_MS)
  }

  const onUserInteractionStart = () => {
    isUserInteracting = true
    controls.autoRotate = false
    clearAutoRotateResumeTimer()
  }

  const onUserInteractionEnd = () => {
    isUserInteracting = false
    scheduleAutoRotateResume()
  }

  /** 滚轮缩放没有对应的 pointerup，不能走 isUserInteracting，否则 autoRotate 会永久关闭 */
  const onWheelPauseAutoRotate = () => {
    controls.autoRotate = false
    scheduleAutoRotateResume()
  }

  const ambientBoost = Math.min(1, Math.max(0, opts?.ambientStarBoost ?? 0))

  const nodeMeshes = new Map<string, THREE.Group>()
  const haloMeshes = new Map<string, THREE.Mesh>()
  let baseLine: THREE.LineSegments | null = null
  let pathLine: THREE.LineSegments | null = null

  /** 远景星尘：与节点解耦；ambientBoost 提高粒子数与整体亮度，充盈整幅画面 */
  const addStarfield = () => {
    const n = Math.min(9200, Math.floor(1100 + ambientBoost * 7200))
    const positions = new Float32Array(n * 3)
    const sizes = new Float32Array(n)
    for (let i = 0; i < n; i++) {
      const u = Math.random()
      const v = Math.random()
      const theta = 2 * Math.PI * u
      const phi = Math.acos(2 * v - 1)
      const r = 26 + Math.random() * 78
      const sinPhi = Math.sin(phi)
      positions[i * 3] = r * sinPhi * Math.cos(theta)
      positions[i * 3 + 1] = r * sinPhi * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      const sz = 0.04 + Math.random() * 0.12 + ambientBoost * 0.06
      sizes[i] = Math.min(0.26, sz)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    const alphaMul = 0.42 + ambientBoost * 0.58
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(COL_STARFIELD) },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uAlphaMul: { value: alphaMul },
      },
      vertexShader: `
        attribute float size;
        uniform float uPixelRatio;
        varying float vAlpha;
        void main() {
          vAlpha = 0.35 + 0.65 * (size - 0.04) / 0.18;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (220.0 * uPixelRatio) / (-mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uAlphaMul;
        varying float vAlpha;
        void main() {
          vec2 c = gl_PointCoord - vec2(0.5);
          float d = length(c);
          if (d > 0.5) discard;
          float soft = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(uColor, soft * vAlpha * uAlphaMul);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const pts = new THREE.Points(geo, mat)
    pts.frustumCulled = false
    scene.add(pts)
    return pts
  }

  const starfield = addStarfield()

  const attachNodeUserData = (root: THREE.Object3D, nodeId: string, nodeType: string) => {
    root.traverse((o) => {
      if (o instanceof CSS2DObject) return
      o.userData.nodeId = nodeId
      o.userData.nodeType = nodeType
    })
  }

  const makeNodeLabelElement = (text: string, nodeType: string) => {
    const el = document.createElement('div')
    el.textContent = text
    el.setAttribute('role', 'presentation')
    const fusion = nodeType === 'fusion'
    const bg = fusion ? 'rgba(36, 24, 52, 0.82)' : 'rgba(10, 16, 30, 0.82)'
    const border = fusion ? '1px solid rgba(210, 180, 255, 0.5)' : '1px solid rgba(120, 200, 255, 0.45)'
    const color = fusion ? '#f4ecff' : '#eaf6ff'
    el.style.cssText = [
      `max-width:${fusion ? 108 : 96}px`,
      'padding: 3px 8px',
      'border-radius: 8px',
      'font-size: 11px',
      'font-weight: 650',
      'line-height: 1.25',
      'text-align: center',
      'letter-spacing: 0.02em',
      `color:${color}`,
      `background:${bg}`,
      `border:${border}`,
      'box-shadow: 0 2px 10px rgba(0,0,0,0.35)',
      'text-shadow: 0 1px 4px rgba(0,0,0,0.85)',
      'white-space: nowrap',
      'overflow: hidden',
      'text-overflow: ellipsis',
      'pointer-events: none',
      'user-select: none',
      '-webkit-user-select: none',
    ].join(';')
    return el
  }

  const makeFusionQuadrantLabelElement = (text: string) => {
    const el = document.createElement('div')
    el.textContent = text
    el.setAttribute('role', 'presentation')
    el.style.cssText = [
      'max-width: 52px',
      'padding: 2px 5px',
      'border-radius: 5px',
      'font-size: 8px',
      'font-weight: 650',
      'line-height: 1.2',
      'text-align: center',
      'letter-spacing: 0.01em',
      'color: #ede6ff',
      'background: rgba(28, 20, 42, 0.82)',
      'border: 1px solid rgba(200, 170, 255, 0.42)',
      'box-shadow: 0 1px 5px rgba(0,0,0,0.35)',
      'text-shadow: 0 1px 2px rgba(0,0,0,0.7)',
      'display: -webkit-box',
      '-webkit-box-orient: vertical',
      '-webkit-line-clamp: 2',
      'overflow: hidden',
      'word-break: break-all',
      'overflow-wrap: anywhere',
      'opacity: 0',
      'visibility: hidden',
      'pointer-events: none',
      'user-select: none',
      '-webkit-user-select: none',
    ].join(';')
    return el
  }

  /**
   * 节点球壳：用 MeshBasicMaterial + map，不依赖光照；并关闭 fog，否则 Exp2 雾会把贴图洗成一片雾色（看起来像纯色球）。
   */
  const createNodeGroup = (nodeType: string, nodeId: string, labelText: string): THREE.Group => {
    const isMajor = nodeType === 'major'
    const g = new THREE.Group()
    const variant = isMajor ? 'major' : 'fusion'
    const { map } = getNodeSurfaceTextures(nodeId, variant)
    const coreRadius = isMajor ? 0.23 : 0.15

    const coreGeo = new THREE.SphereGeometry(coreRadius, isMajor ? 48 : 36, isMajor ? 32 : 26)
    const coreMat = new THREE.MeshBasicMaterial({
      map,
      color: new THREE.Color(0xffffff),
      transparent: true,
      opacity: 1,
      fog: false,
    })
    const core = new THREE.Mesh(coreGeo, coreMat)
    core.userData.part = 'core'
    g.add(core)

    const glowColor = isMajor ? COL_MAJOR : COL_FUSION
    const glowGeo = new THREE.SphereGeometry(coreRadius * 1.52, 18, 14)
    const glowMat = new THREE.MeshBasicMaterial({
      color: glowColor,
      transparent: true,
      opacity: isMajor ? 0.045 : 0.032,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      fog: false,
    })
    const glow = new THREE.Mesh(glowGeo, glowMat)
    glow.renderOrder = -1
    glow.userData.part = 'glow'
    g.add(glow)

    if (isMajor) {
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x7dcef8,
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
        side: THREE.DoubleSide,
        fog: false,
      })
      const mkRing = (radius: number, tube: number, tiltZ: number) => {
        const ringGeo = new THREE.TorusGeometry(radius, tube, 10, 80)
        const m = new THREE.Mesh(ringGeo, ringMat.clone())
        m.rotation.x = Math.PI / 2
        m.rotation.z = tiltZ
        m.userData.part = 'ring'
        return m
      }
      g.add(mkRing(0.46, 0.014, Math.random() * Math.PI))
      const r2 = mkRing(0.38, 0.01, Math.PI / 2.8)
      r2.rotation.y = Math.PI / 3.2
      g.add(r2)
    } else {
      const orbitRadius = Math.max(coreRadius * 5.55, 0.78)
      const labelRadius = orbitRadius * 1.2
      const ringInner = orbitRadius * 0.82
      const ringOuter = orbitRadius * 1.22
      const ringGeo = new THREE.RingGeometry(ringInner, ringOuter, 80)
      const ringMat = new THREE.MeshBasicMaterial({
        color: COL_FUSION,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
        side: THREE.DoubleSide,
        fog: false,
        blending: THREE.AdditiveBlending,
      })
      const orbitRing = new THREE.Mesh(ringGeo, ringMat)
      orbitRing.rotation.x = Math.PI / 2
      orbitRing.renderOrder = 0
      orbitRing.userData.part = 'ring'
      g.add(orbitRing)

      const satR = Math.max(coreRadius * 0.34, 0.052)
      const satHue = [0.02, 0.14, 0.55, 0.42] as const
      for (let i = 0; i < 4; i++) {
        const geo = new THREE.SphereGeometry(satR, 14, 12)
        const c = new THREE.Color().setHSL(satHue[i], 0.55, 0.62)
        const satMat = new THREE.MeshBasicMaterial({
          color: c,
          transparent: true,
          opacity: 0.94,
          fog: false,
        })
        const sat = new THREE.Mesh(geo, satMat)
        const ang = (i / 4) * Math.PI * 2 - Math.PI / 4
        const sx = Math.cos(ang) * orbitRadius
        const sz = Math.sin(ang) * orbitRadius
        sat.position.set(sx, 0, sz)
        sat.userData.part = 'satellite'
        g.add(sat)

        const capEl = makeFusionQuadrantLabelElement(FUSION_QUADRANT_LABELS[i])
        const cap = new CSS2DObject(capEl)
        const lx = Math.cos(ang) * labelRadius
        const lz = Math.sin(ang) * labelRadius
        const yLift = satR * 0.55 + (i % 2) * 0.018
        cap.position.set(lx, yLift, lz)
        cap.center.set(0.5, 1)
        cap.renderOrder = 8
        cap.userData.isFusionQuadrantLabel = true
        g.add(cap)
      }
    }

    const labelEl = makeNodeLabelElement(labelText, nodeType)
    const labelObj = new CSS2DObject(labelEl)
    labelObj.position.set(0, coreRadius * 1.38, 0)
    labelObj.center.set(0.5, 1)
    labelObj.renderOrder = 10
    labelObj.userData.isNodeLabel = true
    g.add(labelObj)

    g.userData.nodeVisual = { core, glow }
    return g
  }

  for (const n of data.nodes) {
    const pos = data.layout[n.id]
    if (!pos) continue
    const group = createNodeGroup(n.type, n.id, n.label)
    group.position.set(pos.x, pos.y, pos.z)
    group.rotation.set(Math.random() * 0.8, Math.random() * Math.PI * 2, Math.random() * 0.5)
    group.userData.nodeId = n.id
    group.userData.nodeType = n.type
    attachNodeUserData(group, n.id, n.type)
    scene.add(group)
    nodeMeshes.set(n.id, group)
  }

  const pairKey = (a: string, b: string) => (a < b ? `${a}|${b}` : `${b}|${a}`)

  const buildBaseLines = () => {
    const positions: number[] = []
    for (const e of data.edges) {
      const pa = data.layout[e.u]
      const pb = data.layout[e.v]
      if (!pa || !pb) continue
      positions.push(pa.x, pa.y, pa.z, pb.x, pb.y, pb.z)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    const mat = new THREE.LineBasicMaterial({
      color: COL_LINE,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
    })
    return new THREE.LineSegments(geo, mat)
  }

  const buildPathLines = (pathIds: Set<string>) => {
    const ids = [...pathIds]
    const positions: number[] = []
    const edgeKeys = new Set(data.edges.map((e) => pairKey(e.u, e.v)))
    for (let i = 0; i < ids.length - 1; i++) {
      const a = ids[i]
      const b = ids[i + 1]
      if (!edgeKeys.has(pairKey(a, b))) continue
      const pa = data.layout[a]
      const pb = data.layout[b]
      if (!pa || !pb) continue
      positions.push(pa.x, pa.y, pa.z, pb.x, pb.y, pb.z)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    const mat = new THREE.LineBasicMaterial({
      color: COL_LINE_PATH,
      transparent: true,
      opacity: 0.85,
      linewidth: 1,
      depthWrite: false,
    })
    return new THREE.LineSegments(geo, mat)
  }

  baseLine = buildBaseLines()
  scene.add(baseLine)
  pathLine = buildPathLines(initial.pathIds)
  scene.add(pathLine)

  const haloGroup = new THREE.Group()
  scene.add(haloGroup)

  const buildHalos = () => {
    while (haloGroup.children.length) haloGroup.remove(haloGroup.children[0])
    haloMeshes.clear()
    const geo = new THREE.SphereGeometry(1, 20, 20)
    for (const he of data.hyperedges) {
      const pts: THREE.Vector3[] = []
      for (const id of he.member_node_ids) {
        const p = data.layout[id]
        if (p) pts.push(new THREE.Vector3(p.x, p.y, p.z))
      }
      if (!pts.length) continue
      const box = new THREE.Box3().setFromPoints(pts)
      const sphere = new THREE.Sphere()
      box.getBoundingSphere(sphere)
      const mat = new THREE.MeshBasicMaterial({
        color: COL_HALO,
        transparent: true,
        opacity: 0.07,
        depthWrite: false,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.copy(sphere.center)
      const scale = Math.max(sphere.radius * 1.45, 0.65)
      mesh.scale.setScalar(scale)
      mesh.userData.hyperedgeId = he.id
      haloGroup.add(mesh)
      haloMeshes.set(he.id, mesh)
    }
  }
  buildHalos()

  const raycaster = new THREE.Raycaster()
  const pointer = new THREE.Vector2()

  const pick = (clientX: number, clientY: number) => {
    const rect = renderer.domElement.getBoundingClientRect()
    pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1
    pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1
    raycaster.setFromCamera(pointer, camera)
    const objs = [...nodeMeshes.values()]
    const hits = raycaster.intersectObjects(objs, true)
    const first = hits.find(
      (h) => h.object instanceof THREE.Mesh && typeof h.object.userData.nodeId === 'string',
    )
    if (!first) {
      onPick(null)
      return
    }
    const id = first.object.userData.nodeId as string | undefined
    onPick(id ?? null)
  }

  const onPointerDown = (ev: PointerEvent) => {
    if (ev.button !== 0) return
    onUserInteractionStart()
    pick(ev.clientX, ev.clientY)
  }
  renderer.domElement.addEventListener('pointerdown', onPointerDown)
  renderer.domElement.addEventListener('pointerup', onUserInteractionEnd)
  renderer.domElement.addEventListener('wheel', onWheelPauseAutoRotate, { passive: true })
  renderer.domElement.addEventListener('touchstart', onUserInteractionStart, { passive: true })
  renderer.domElement.addEventListener('touchend', onUserInteractionEnd, { passive: true })
  controls.addEventListener('start', onUserInteractionStart)
  controls.addEventListener('end', onUserInteractionEnd)

  let raf = 0
  const clock = new THREE.Clock()
  const loop = () => {
    const dt = clock.getDelta()
    const t = clock.getElapsedTime()
    controls.update()
    for (const g of nodeMeshes.values()) {
      g.rotation.y += dt * 0.1
      g.rotation.z += dt * 0.02 * Math.sin(t * 0.6 + g.position.x * 0.2)
    }
    composer.render()
    labelRenderer.render(scene, camera)
    raf = requestAnimationFrame(loop)
  }
  loop()

  const onResize = () => {
    const w = container.clientWidth || window.innerWidth
    const h = container.clientHeight || window.innerHeight
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
    composer.setSize(w, h)
    labelRenderer.setSize(w, h)
    ;(starfield.material as THREE.ShaderMaterial).uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
  }
  window.addEventListener('resize', onResize)

  const applyVisual = (st: GalaxyVisualState) => {
    if (pathLine) {
      scene.remove(pathLine)
      pathLine.geometry.dispose()
      ;(pathLine.material as THREE.Material).dispose()
      pathLine = buildPathLines(st.pathIds)
      scene.add(pathLine)
    }

    const pathOrHyper = new Set<string>([...st.pathIds, ...st.hyperMemberIds])

    for (const [id, group] of nodeMeshes) {
      const onPath = st.pathIds.has(id)
      const inHyper = st.hyperMemberIds.has(id)
      const selected = st.selectedId === id
      const dim = !pathOrHyper.has(id) && (st.pathIds.size > 0 || st.hyperMemberIds.size > 0)
      const opacityFactor = dim ? 0.32 : 1
      const nodeType = (group.userData.nodeType as string) || 'major'

      group.traverse((obj) => {
        if (obj instanceof CSS2DObject && obj.userData.isNodeLabel) {
          const el = obj.element as HTMLElement
          let op = dim ? 0.36 : 0.96
          if (onPath || inHyper) op = Math.max(op, 0.94)
          if (selected) op = 1
          el.style.opacity = String(op)
          el.style.filter = selected
            ? 'drop-shadow(0 0 8px rgba(120, 210, 255, 0.85))'
            : onPath || inHyper
              ? 'drop-shadow(0 0 4px rgba(100, 180, 255, 0.45))'
              : 'none'
          el.style.fontWeight = selected ? '800' : '650'
          obj.renderOrder = selected ? 20 : 10
          return
        }
        if (obj instanceof CSS2DObject && obj.userData.isFusionQuadrantLabel) {
          const el = obj.element as HTMLElement
          const showQuadrants = nodeType === 'fusion' && selected
          if (!showQuadrants) {
            el.style.opacity = '0'
            el.style.visibility = 'hidden'
            obj.renderOrder = 1
            return
          }
          el.style.visibility = 'visible'
          let op = dim ? 0.3 : 0.92
          if (onPath || inHyper) op = Math.max(op, 0.9)
          if (selected) op = 1
          el.style.opacity = String(op)
          el.style.filter = selected
            ? 'drop-shadow(0 0 6px rgba(200, 160, 255, 0.75))'
            : onPath || inHyper
              ? 'drop-shadow(0 0 3px rgba(180, 140, 255, 0.4))'
              : 'none'
          obj.renderOrder = selected ? 18 : 8
          return
        }
        if (!(obj instanceof THREE.Mesh)) return
        const mat = obj.material
        if (mat instanceof THREE.MeshBasicMaterial) {
          const part = (obj.userData.part as string) || 'other'
          if (part === 'core') {
            let opacity = dim ? 0.34 : 1
            if (onPath || inHyper) opacity = Math.max(opacity, 0.98)
            if (selected) opacity = 1
            mat.opacity = opacity
            mat.transparent = opacity < 0.999
            mat.color.set(selected ? 0xffffff : onPath || inHyper ? 0xf2fbff : 0xffffff)
            return
          }
        }
        if (mat instanceof THREE.MeshStandardMaterial) {
          let opacity = dim ? 0.38 : 1
          let emissiveIntensity = nodeType === 'major' ? 0.11 : 0.09
          if (onPath || inHyper) {
            opacity = Math.max(opacity, 0.98)
            emissiveIntensity = 0.26
          }
          if (selected) {
            emissiveIntensity = 0.38
            opacity = 1
          }
          if (dim) emissiveIntensity *= 0.55
          mat.transparent = opacity < 0.999
          mat.opacity = opacity
          mat.emissiveIntensity = emissiveIntensity
        } else if (mat instanceof THREE.MeshBasicMaterial) {
          const part = (obj.userData.part as string) || 'other'
          let base = 0.42
          if (part === 'glow') base = nodeType === 'major' ? 0.048 : 0.036
          else if (part === 'shard') base = 0.36
          else if (part === 'ring') base = nodeType === 'major' ? 0.48 : 0.52
          else if (part === 'satellite') base = 0.9
          let op = base * opacityFactor
          if (onPath || inHyper) {
            if (part === 'glow' || part === 'shard') op = Math.max(op, 0.22)
            else op = Math.max(op, 0.82)
          }
          if (selected && (part === 'glow' || part === 'shard' || part === 'satellite')) op = Math.max(op, 0.34)
          if (selected && part === 'ring' && nodeType === 'fusion') op = Math.max(op, 0.78)
          mat.opacity = op
          mat.transparent = true
        }
      })
    }

    for (const [hid, hmesh] of haloMeshes) {
      const mat = hmesh.material as THREE.MeshBasicMaterial
      const active = st.activeHyperedgeIds.has(hid)
      mat.opacity = active ? 0.22 : 0.06
      mat.color = new THREE.Color(active ? 0xd8ecff : COL_HALO)
    }
  }

  applyVisual(initial)

  const frameBounds = (ids: string[]) => {
    const pts: THREE.Vector3[] = []
    for (const id of ids) {
      const p = data.layout[id]
      if (p) pts.push(new THREE.Vector3(p.x, p.y, p.z))
    }
    if (!pts.length) return
    const box = new THREE.Box3().setFromPoints(pts)
    const center = new THREE.Vector3()
    box.getCenter(center)
    const size = new THREE.Vector3()
    box.getSize(size)
    const radius = Math.max(size.length() * 0.65, 4)
    controls.target.copy(center)
    camera.position.copy(center.clone().add(new THREE.Vector3(radius * 0.9, radius * 0.55, radius * 0.95)))
    controls.update()
  }

  return {
    dispose() {
      clearAutoRotateResumeTimer()
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      renderer.domElement.removeEventListener('pointerdown', onPointerDown)
      renderer.domElement.removeEventListener('pointerup', onUserInteractionEnd)
      renderer.domElement.removeEventListener('wheel', onWheelPauseAutoRotate)
      renderer.domElement.removeEventListener('touchstart', onUserInteractionStart)
      renderer.domElement.removeEventListener('touchend', onUserInteractionEnd)
      controls.removeEventListener('start', onUserInteractionStart)
      controls.removeEventListener('end', onUserInteractionEnd)

      for (const g of nodeMeshes.values()) {
        scene.remove(g)
        g.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
            for (const mat of mats) {
              if (mat instanceof THREE.MeshStandardMaterial) {
                mat.map = null
                mat.bumpMap = null
                mat.roughnessMap = null
              } else if (mat instanceof THREE.MeshBasicMaterial) {
                mat.map = null
              }
              mat?.dispose()
            }
            obj.geometry?.dispose()
          }
        })
      }
      nodeMeshes.clear()

      if (baseLine) {
        scene.remove(baseLine)
        baseLine.geometry.dispose()
        ;(baseLine.material as THREE.Material).dispose()
        baseLine = null
      }
      if (pathLine) {
        scene.remove(pathLine)
        pathLine.geometry.dispose()
        ;(pathLine.material as THREE.Material).dispose()
        pathLine = null
      }
      for (const h of haloMeshes.values()) {
        haloGroup.remove(h)
        h.geometry.dispose()
        ;(h.material as THREE.Material).dispose()
      }
      haloMeshes.clear()
      scene.remove(haloGroup)

      scene.remove(starfield)
      starfield.geometry.dispose()
      ;(starfield.material as THREE.ShaderMaterial).dispose()

      bloomPass.dispose()
      outputPass.dispose()
      composer.dispose()
      disposeNodeSurfaceTextureCache()

      if (labelLayer.parentElement === container) {
        container.removeChild(labelLayer)
      }
      controls.dispose()
      renderer.dispose()
      if (renderer.domElement.parentElement) renderer.domElement.parentElement.removeChild(renderer.domElement)
    },
    setVisualState(st: GalaxyVisualState) {
      applyVisual(st)
    },
    frameBounds,
    getCamera: () => camera,
  }
}

export function detectWebGL(): boolean {
  try {
    const c = document.createElement('canvas')
    const gl = c.getContext('webgl2') || c.getContext('webgl')
    return !!gl
  } catch {
    return false
  }
}
