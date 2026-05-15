<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watch, type CSSProperties } from 'vue'
import { useRouter } from 'vue-router'
import { fetchGalaxyBundle, fetchRecommendMock, getGalaxyDataBase } from '@/composables/useGraphManifest'
import { GALAXY_MAJORS_KEY, type GalaxyMajorsPayload } from '@/data/majors'
import { hyperedgesContainingNode, shortestPathUndirected } from '@/utils/graph'
import { postCloseToShell } from '@/utils/bridge'
import { detectWebGL, mountGalaxyThree, type GalaxyVisualState, type RawHE, type RawNode } from '@/lib/galaxyThree'

const router = useRouter()

const phase = ref<'loading' | 'ready' | 'error'>('loading')
const errorMessage = ref('')
const selectedNodeId = ref<string | null>(null)
const recommend = ref<{ nodeId: string; reason: string }[]>([])
const showRecommend = ref(false)
/** 首次进入大星图时展示「个人星图」引导，可关闭 */
const showEntryHint = ref(true)

const payload = ref<GalaxyMajorsPayload | null>(null)

const graph = shallowRef<{
  nodes: RawNode[]
  edges: { u: string; v: string }[]
  hyperedges: RawHE[]
  layout: Record<string, { x: number; y: number; z: number }>
} | null>(null)

const pathIds = ref<Set<string>>(new Set())

const runtime = shallowRef<ReturnType<typeof mountGalaxyThree> | null>(null)

const selectedLabel = computed(() => {
  if (!selectedNodeId.value || !graph.value) return ''
  const n = graph.value.nodes.find((x) => x.id === selectedNodeId.value)
  return n?.label ?? ''
})

const selectedDetail = computed(() => {
  if (!selectedNodeId.value || !graph.value) return ''
  const n = graph.value.nodes.find((x) => x.id === selectedNodeId.value)
  if (!n) return ''
  if (n.type === 'fusion') {
    const sub = n.meta?.subtitle ?? ''
    return sub ? `交叉关卡 · ${sub}` : '交叉学科关卡'
  }
  const tag = n.meta?.tagline ?? ''
  return tag ? `专业入口 · ${tag}` : '专业节点'
})

const hyperSummary = computed(() => {
  if (!selectedNodeId.value || !graph.value) return { ids: [] as string[], members: [] as string[] }
  const { hyperedgeIds, memberIds } = hyperedgesContainingNode(selectedNodeId.value, graph.value.hyperedges)
  const labels = [...memberIds]
    .map((id) => graph.value!.nodes.find((n) => n.id === id)?.label ?? id)
    .filter((x) => x)
  return { ids: hyperedgeIds, members: labels }
})

const activeHyperedgeIds = computed(() => {
  if (!selectedNodeId.value || !graph.value) return new Set<string>()
  return new Set(hyperedgesContainingNode(selectedNodeId.value, graph.value.hyperedges).hyperedgeIds)
})

const hyperMemberIds = computed(() => {
  if (!selectedNodeId.value || !graph.value) return new Set<string>()
  return hyperedgesContainingNode(selectedNodeId.value, graph.value.hyperedges).memberIds
})

const visual = computed<GalaxyVisualState>(() => ({
  pathIds: pathIds.value,
  selectedId: selectedNodeId.value,
  hyperMemberIds: hyperMemberIds.value,
  activeHyperedgeIds: activeHyperedgeIds.value,
}))

watch(visual, (v) => {
  runtime.value?.setVisualState(v)
})

watch(selectedNodeId, () => {
  // 切换节点后默认收起推荐，避免首次点选就占据过多空间。
  showRecommend.value = false
  resetSideChrome()
})

function readPayload(): GalaxyMajorsPayload | null {
  try {
    const raw = sessionStorage.getItem(GALAXY_MAJORS_KEY)
    if (!raw) return null
    const p = JSON.parse(raw) as GalaxyMajorsPayload
    if (!p.fromId || !p.toId || p.fromId === p.toId) return null
    return p
  } catch {
    return null
  }
}

async function bootstrap() {
  phase.value = 'loading'
  errorMessage.value = ''
  if (!detectWebGL()) {
    phase.value = 'error'
    errorMessage.value = '当前环境不支持 WebGL，无法展示 3D 星系。'
    return
  }
  const p = readPayload()
  if (!p) {
    router.replace({ name: 'select' })
    return
  }
  payload.value = p
  try {
    const primary = getGalaxyDataBase()
    let bundle: Awaited<ReturnType<typeof fetchGalaxyBundle>>
    let rec: Awaited<ReturnType<typeof fetchRecommendMock>>
    try {
      bundle = await fetchGalaxyBundle(primary)
      rec = await fetchRecommendMock(primary)
    } catch (firstErr) {
      const injected =
        typeof window !== 'undefined' && window.__GALAXY_API_BASE__ && String(window.__GALAXY_API_BASE__).trim() !== ''
      if (injected && primary !== './mock') {
        bundle = await fetchGalaxyBundle('./mock')
        rec = await fetchRecommendMock('./mock')
      } else {
        throw firstErr
      }
    }
    recommend.value = rec.suggestions ?? []
    graph.value = {
      nodes: bundle.nodes as RawNode[],
      edges: bundle.edges as { u: string; v: string }[],
      hyperedges: bundle.hyperedges as RawHE[],
      layout: bundle.layout as Record<string, { x: number; y: number; z: number }>,
    }
    const path = shortestPathUndirected(graph.value.edges, p.fromId, p.toId)
    pathIds.value = new Set(path ?? [p.fromId, p.toId])
    phase.value = 'ready'
  } catch (e) {
    phase.value = 'error'
    errorMessage.value = e instanceof Error ? e.message : '加载失败'
  }
}

function mountThree(el: HTMLElement | null) {
  runtime.value?.dispose()
  runtime.value = null
  if (!el || !graph.value || phase.value !== 'ready') return
  const st: GalaxyVisualState = {
    pathIds: pathIds.value,
    selectedId: null,
    hyperMemberIds: new Set(),
    activeHyperedgeIds: new Set(),
  }
  const rt = mountGalaxyThree(
    el,
    graph.value,
    st,
    (id) => {
      selectedNodeId.value = id
    },
  )
  runtime.value = rt
  rt.setVisualState(visual.value)
  const pathArr = [...pathIds.value]
  rt.frameBounds(pathArr.length ? pathArr : [...graph.value.nodes.map((n) => n.id)].slice(0, 6))
}

const canvasHost = ref<HTMLElement | null>(null)
const sidePanelEl = ref<HTMLElement | null>(null)
const sideUiVisible = ref(true)
const sideDragLeft = ref<number | null>(null)
const sideDragTop = ref<number | null>(null)

let sideDragActive = false
let sideDragStartX = 0
let sideDragStartY = 0
let sideDragOrigLeft = 0
let sideDragOrigTop = 0

function clampSide(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n))
}

function endSideDrag() {
  if (!sideDragActive) return
  sideDragActive = false
  window.removeEventListener('pointermove', onSidePointerMove)
  window.removeEventListener('pointerup', endSideDrag)
}

function onSidePointerMove(ev: PointerEvent) {
  if (!sideDragActive || !sidePanelEl.value) return
  const el = sidePanelEl.value
  const dx = ev.clientX - sideDragStartX
  const dy = ev.clientY - sideDragStartY
  const rect = el.getBoundingClientRect()
  const w = rect.width
  const h = rect.height
  let nl = sideDragOrigLeft + dx
  let nt = sideDragOrigTop + dy
  nl = clampSide(nl, 8, window.innerWidth - w - 8)
  nt = clampSide(nt, 8, window.innerHeight - h - 8)
  sideDragLeft.value = nl
  sideDragTop.value = nt
}

function onSideDragHandleDown(ev: PointerEvent) {
  if (ev.button !== 0 || !sidePanelEl.value) return
  endSideDrag()
  ev.preventDefault()
  const rect = sidePanelEl.value.getBoundingClientRect()
  sideDragActive = true
  sideDragStartX = ev.clientX
  sideDragStartY = ev.clientY
  sideDragOrigLeft = rect.left
  sideDragOrigTop = rect.top
  sideDragLeft.value = rect.left
  sideDragTop.value = rect.top
  window.addEventListener('pointermove', onSidePointerMove)
  window.addEventListener('pointerup', endSideDrag)
}

const sidePanelStyle = computed((): CSSProperties | undefined => {
  if (sideDragLeft.value == null || sideDragTop.value == null) return undefined
  return {
    left: `${sideDragLeft.value}px`,
    top: `${sideDragTop.value}px`,
    right: 'auto',
    bottom: 'auto',
  }
})

function resetSideChrome() {
  sideUiVisible.value = true
  sideDragLeft.value = null
  sideDragTop.value = null
  endSideDrag()
}

onMounted(async () => {
  await bootstrap()
})

watch(phase, async (p) => {
  if (p !== 'ready') return
  await nextTick()
  mountThree(canvasHost.value)
})

onBeforeUnmount(() => {
  endSideDrag()
  runtime.value?.dispose()
})

function retry() {
  bootstrap()
}

function goBack() {
  router.push({ name: 'select' })
}

function closeShell() {
  // 先清 payload：若外层未 navigateBack、WebView 整页重载，仍会因无数据退回选择页，而不会「刷新」回 3D。
  try {
    sessionStorage.removeItem(GALAXY_MAJORS_KEY)
  } catch {
    /* ignore */
  }
  postCloseToShell()
  router.replace({ name: 'select' })
}

function labelForId(id: string) {
  return graph.value?.nodes.find((n) => n.id === id)?.label ?? id
}

function goPersonalGalaxy() {
  void router.push({ name: 'personalHub' })
}

function closeEntryHint() {
  showEntryHint.value = false
}

function goPractice() {
  /* 占位：后续跳转题库 / 原生页 */
  window.alert('「去练」将对接现有题库模块（占位）')
}
</script>

<template>
  <div class="galaxy-page">
    <div v-if="phase === 'loading'" class="overlay center">
      <div class="spinner" aria-hidden="true" />
      <p class="loading-text">正在载入星系…</p>
    </div>

    <div v-else-if="phase === 'error'" class="overlay center error-panel">
      <p class="error-title">无法进入星系</p>
      <p class="error-msg">{{ errorMessage }}</p>
      <div class="error-actions">
        <button type="button" class="btn ghost" @click="goBack">返回选择</button>
        <button type="button" class="btn primary" @click="retry">重试</button>
      </div>
      <p class="hint">2D 降级与离线包将在后续里程碑接入。</p>
    </div>

    <template v-else>
      <div ref="canvasHost" class="canvas-host" />

      <div class="top-bar">
        <div class="top-left-spacer" />
        <div class="top-title">专业星系</div>
        <button type="button" class="icon-btn" aria-label="关闭" @click="closeShell">×</button>
      </div>

      <button
        v-if="selectedNodeId"
        type="button"
        class="side-toggle"
        @click="sideUiVisible = !sideUiVisible"
      >
        {{ sideUiVisible ? '隐藏' : '显示' }}
      </button>

      <aside v-if="selectedNodeId" ref="sidePanelEl" v-show="sideUiVisible" class="side" :style="sidePanelStyle">
        <div class="side-drag-handle" @pointerdown="onSideDragHandleDown">信息面板</div>
        <section class="panel-card">
          <p class="side-eyebrow">选中</p>
          <h2 class="side-title">{{ selectedLabel }}</h2>
          <p class="side-desc">{{ selectedDetail }}</p>
          <section v-if="hyperSummary.ids.length" class="block">
            <p class="block-label">相关超边（融合域）</p>
            <ul class="pill-list">
              <li v-for="hid in hyperSummary.ids" :key="hid" class="pill">{{ hid }}</li>
            </ul>
            <p class="block-label">成员节点</p>
            <p class="members">{{ hyperSummary.members.join('、') }}</p>
          </section>
          <button v-if="graph?.nodes.find((n) => n.id === selectedNodeId)?.type === 'fusion'" type="button" class="btn primary full" @click="goPractice">
            去练
          </button>
        </section>

        <section class="panel-card rec">
          <div class="rec-head">
            <p class="block-label">推荐下一步（mock）</p>
            <button type="button" class="btn rec-toggle" @click="showRecommend = !showRecommend">
              {{ showRecommend ? '收起' : '展开' }}
            </button>
          </div>
          <ul v-if="showRecommend" class="rec-list">
            <li v-for="s in recommend" :key="s.nodeId">
              <span class="rec-node">{{ labelForId(s.nodeId) }}</span>
              <span class="rec-reason">{{ s.reason }}</span>
            </li>
          </ul>
        </section>
      </aside>

      <div v-else-if="showEntryHint" class="hint-promo" role="note">
        <button type="button" class="hint-dismiss" aria-label="关闭" @click.stop="closeEntryHint">×</button>
        <p class="promo-title">个人专业星图</p>
        <button type="button" class="btn promo-cta" @click="goPersonalGalaxy">进入个人星图</button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.galaxy-page {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100dvh;
  overflow: hidden;
  background: #0f141f;
  isolation: isolate;
}

.canvas-host {
  position: absolute;
  inset: 0;
  z-index: 0;
  touch-action: none;
}

.canvas-host :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
}

.overlay {
  position: absolute;
  inset: 0;
  z-index: 5;
  background: rgba(244, 248, 252, 0.96);
  color: var(--gx-text);
  padding: 24px;
  box-sizing: border-box;
}

.overlay.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-align: center;
}

.spinner {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 3px solid rgba(49, 101, 215, 0.2);
  border-top-color: rgba(1, 188, 255, 0.9);
  animation: spin 0.85s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  margin: 0;
  font-size: 15px;
  color: var(--gx-text-muted);
}

.error-panel .error-title {
  margin: 0 0 6px;
  font-size: 18px;
  font-weight: 700;
}

.error-panel .error-msg {
  margin: 0 0 16px;
  font-size: 14px;
  color: var(--gx-text-muted);
  max-width: 320px;
}

.error-actions {
  display: flex;
  gap: 10px;
}

.hint {
  margin-top: 18px;
  font-size: 12px;
  color: var(--gx-text-muted);
}

.btn {
  border-radius: 999px;
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
}

.btn.primary {
  color: #fff;
  background: linear-gradient(135deg, var(--gx-primary), var(--gx-primary-deep));
}

.btn.ghost {
  background: rgba(49, 101, 215, 0.08);
  color: var(--gx-text);
}

.top-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: calc(10px + var(--gx-safe-top)) 12px 8px;
  pointer-events: none;
}

.top-bar > * {
  pointer-events: auto;
}

.top-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  max-width: min(58vw, 220px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
  font-size: 15px;
  font-weight: 650;
  color: #e8f0ff;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.45);
}

.icon-btn {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(10, 14, 24, 0.45);
  color: #f2f6ff;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  margin-left: auto;
  position: relative;
  z-index: 1;
}

.top-left-spacer {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.side-toggle {
  position: fixed;
  left: 12px;
  top: calc(10px + var(--gx-safe-top));
  z-index: 25;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  min-width: 56px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(48, 56, 80, 0.82);
  color: #eef4ff;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
}

.side-drag-handle {
  margin: -4px -4px 8px;
  padding: 6px 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px dashed rgba(255, 255, 255, 0.16);
  color: rgba(220, 234, 255, 0.9);
  font-size: 11px;
  line-height: 1.2;
  cursor: move;
  user-select: none;
  -webkit-user-select: none;
  touch-action: none;
}

.side {
  position: absolute;
  right: 8px;
  top: calc(56px + var(--gx-safe-top));
  width: min(230px, 56vw);
  max-height: calc(100svh - 78px - var(--gx-safe-top));
  z-index: 20;
  padding: 8px;
  box-sizing: border-box;
  color: #eaf0fa;
  overflow-y: auto;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(12, 16, 26, 0.7);
  backdrop-filter: blur(8px);
}

.panel-card {
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(18, 24, 38, 0.82);
  backdrop-filter: blur(10px);
  padding: 10px;
  margin-bottom: 8px;
}

.side-eyebrow {
  margin: 0 0 4px;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(200, 214, 240, 0.55);
}

.side-title {
  margin: 0 0 6px;
  font-size: 16px;
  font-weight: 700;
}

.side-desc {
  margin: 0 0 12px;
  font-size: 12px;
  line-height: 1.45;
  color: rgba(210, 220, 245, 0.78);
}

.hint-promo {
  position: fixed;
  right: calc(12px + env(safe-area-inset-right, 0px));
  bottom: calc(14px + var(--gx-safe-bottom, 0px));
  z-index: 60;
  width: min(188px, 48vw);
  max-width: min(188px, 48vw);
  box-sizing: border-box;
  border-radius: 14px;
  padding: 10px 12px 11px;
  background: linear-gradient(145deg, rgba(58, 125, 255, 0.22), rgba(18, 24, 40, 0.92));
  border: 1px solid rgba(140, 200, 255, 0.28);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(10px);
}

.hint-dismiss {
  position: absolute;
  top: 6px;
  right: 8px;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  color: #eaf2ff;
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
}

.promo-title {
  margin: 0 26px 8px 0;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.03em;
  color: #f2f7ff;
}

.promo-cta {
  width: 100%;
  border-radius: 10px;
  padding: 8px 10px;
  font-size: 12px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  color: #0b1220;
  background: linear-gradient(135deg, #e8f2ff, #9ec5ff);
}

.block {
  margin-top: 8px;
}

.block-label {
  margin: 0 0 6px;
  font-size: 12px;
  color: rgba(200, 214, 240, 0.65);
}

.pill-list {
  list-style: none;
  margin: 0 0 10px;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.pill {
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(126, 200, 255, 0.12);
  border: 1px solid rgba(126, 200, 255, 0.25);
}

.members {
  margin: 0;
  font-size: 12px;
  line-height: 1.45;
  color: rgba(230, 236, 255, 0.88);
}

.btn.full {
  width: 100%;
  margin-top: 12px;
}

.rec {
  margin-top: 4px;
}

.rec-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.rec-toggle {
  font-size: 11px;
  line-height: 1;
  padding: 6px 8px;
  color: #dce8ff;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.06);
}

.rec-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.rec-node {
  display: block;
  font-weight: 650;
  font-size: 12px;
}

.rec-reason {
  display: block;
  font-size: 11px;
  color: rgba(210, 220, 245, 0.72);
  margin-top: 2px;
}

@media (max-width: 420px) {
  .side {
    width: min(224px, 58vw);
    right: 8px;
  }
}
</style>
