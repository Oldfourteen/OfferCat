<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { hyperedgesContainingNode } from '@/utils/graph'
import {
  buildPersonalGalaxyMountBundle,
  loadPersonalGalaxyFromStorage,
  type PersonalGalaxyV1,
  type PersonalFusionInst,
} from '@/data/personalGalaxyModel'
import StarlitLeaderboardPanel from '@/components/StarlitLeaderboardPanel.vue'
import {
  computeAmbientStarBoost,
  getStarsLit,
  getTotalStarsLitForFusions,
  STARLIT_MAX_STARS_PER_FUSION,
} from '@/data/personalStarlitStore'
import { detectWebGL, mountGalaxyThree, type GalaxyVisualState } from '@/lib/galaxyThree'
import { postRouteToShell } from '@/utils/bridge'
import { goBackOrReplace, goToPersonalDesign } from '@/utils/navigation'

const router = useRouter()
const route = useRoute()

const phase = ref<'loading' | 'ready' | 'empty' | 'error'>('loading')
const err = ref('')
const saved = shallowRef<PersonalGalaxyV1 | null>(null)
const selectedId = ref<string | null>(null)
const leaderboardOpen = ref(false)
const starlitTick = ref(0)

const canvasHost = ref<HTMLElement | null>(null)
const rt = shallowRef<ReturnType<typeof mountGalaxyThree> | null>(null)

const bundle = computed(() => {
  const s = saved.value
  if (!s) return null
  return buildPersonalGalaxyMountBundle(s.majors, s.fusions)
})

const hyperMemberIds = computed(() => {
  if (!selectedId.value || !bundle.value) return new Set<string>()
  return hyperedgesContainingNode(selectedId.value, bundle.value.hyperedges).memberIds
})

const activeHyperedgeIds = computed(() => {
  if (!selectedId.value || !bundle.value) return new Set<string>()
  return new Set(hyperedgesContainingNode(selectedId.value, bundle.value.hyperedges).hyperedgeIds)
})

const visual = computed<GalaxyVisualState>(() => ({
  pathIds: new Set(),
  selectedId: selectedId.value,
  hyperMemberIds: hyperMemberIds.value,
  activeHyperedgeIds: activeHyperedgeIds.value,
}))

watch(visual, (v) => {
  rt.value?.setVisualState(v)
})

const selectedFusion = computed<PersonalFusionInst | null>(() => {
  if (!selectedId.value || !saved.value) return null
  return saved.value.fusions.find((f) => f.id === selectedId.value) ?? null
})

const selectedLabel = computed(() => {
  if (!selectedId.value || !bundle.value) return ''
  return bundle.value.nodes.find((n) => n.id === selectedId.value)?.label ?? ''
})

const fusionIdsOnCanvas = computed(() => {
  void starlitTick.value
  return saved.value?.fusions.map((f) => f.id) ?? []
})

const canvasStarsTotal = computed(() => {
  void starlitTick.value
  return getTotalStarsLitForFusions(fusionIdsOnCanvas.value)
})

function refreshStarlitProgress() {
  starlitTick.value += 1
  if (phase.value === 'ready') remount()
}

function openLeaderboard() {
  refreshStarlitProgress()
  leaderboardOpen.value = true
}

function onStarlitStorage(e: StorageEvent) {
  if (e.key === null || e.key === 'offercat_personal_starlit_v1') refreshStarlitProgress()
}

function remount() {
  const el = canvasHost.value
  const b = bundle.value
  rt.value?.dispose()
  rt.value = null
  if (!el || !b || b.nodes.length === 0) return
  const ambientStarBoost = computeAmbientStarBoost(b.nodes)
  rt.value = mountGalaxyThree(el, b, visual.value, (id) => {
    selectedId.value = id
  }, { ambientStarBoost })
  rt.value.setVisualState(visual.value)
  rt.value.frameBounds(b.nodes.map((n) => n.id))
}

function goDesignFromEmpty() {
  goToPersonalDesign(router)
}

function goBack() {
  goBackOrReplace(router, { name: 'personalHub' })
}

function closeFusionSheet() {
  selectedId.value = null
}

function goStarlit() {
  const f = selectedFusion.value
  if (!f) return
  void router.push({ name: 'personalStarlit', query: { fusionId: f.id } })
}

watch(
  () => route.fullPath,
  async () => {
    if (route.name !== 'personalShowcase') return
    refreshStarlitProgress()
    if (phase.value !== 'ready') return
    saved.value = loadPersonalGalaxyFromStorage()
    await nextTick()
    remount()
  },
)

const onOpenLeaderboardEvent = () => openLeaderboard()

onMounted(async () => {
  window.addEventListener('storage', onStarlitStorage)
  window.addEventListener('galaxy-open-leaderboard', onOpenLeaderboardEvent)
  ;(window as Window & { __GALAXY_OPEN_LEADERBOARD__?: () => void }).__GALAXY_OPEN_LEADERBOARD__ =
    () => window.dispatchEvent(new CustomEvent('galaxy-open-leaderboard'))
  postRouteToShell('personalShowcase')
  if (!detectWebGL()) {
    phase.value = 'error'
    err.value = '当前环境不支持 WebGL'
    return
  }
  const p = loadPersonalGalaxyFromStorage()
  saved.value = p
  if (!p || (p.majors.length === 0 && p.fusions.length === 0)) {
    phase.value = 'empty'
    return
  }
  phase.value = 'ready'
  await nextTick()
  refreshStarlitProgress()
  remount()
})

onBeforeUnmount(() => {
  window.removeEventListener('storage', onStarlitStorage)
  window.removeEventListener('galaxy-open-leaderboard', onOpenLeaderboardEvent)
  delete (window as Window & { __GALAXY_OPEN_LEADERBOARD__?: () => void }).__GALAXY_OPEN_LEADERBOARD__
  postRouteToShell(route.name)
  rt.value?.dispose()
  rt.value = null
})
</script>

<template>
  <div class="showcase-root">
    <header class="bar">
      <button type="button" class="ghost" @click="goBack">返回</button>
      <div class="mid">
        <h1 class="title">展示星图</h1>
        <p v-if="selectedLabel" class="sub">{{ selectedLabel }}</p>
        <p v-else class="sub muted">点击小行星查看四象与点亮星辰</p>
      </div>
      <button type="button" class="lb-trigger" @click="openLeaderboard">
        排行榜 · {{ canvasStarsTotal }} 星
      </button>
    </header>

    <div v-if="phase === 'loading'" class="overlay">加载…</div>
    <div v-else-if="phase === 'error'" class="overlay err">{{ err }}</div>
    <div v-else-if="phase === 'empty'" class="overlay empty">
      <p>还没有已保存的个人星系。</p>
      <button type="button" class="cta" @click="goDesignFromEmpty">返回去设计</button>
    </div>
    <div v-else ref="canvasHost" class="canvas" />

    <teleport to="body">
      <button
        v-if="phase === 'ready'"
        type="button"
        class="lb-fab"
        aria-label="打开点亮排行榜"
        @click="openLeaderboard"
      >
        <span class="lb-fab-title">排行榜</span>
        <span class="lb-fab-sub">{{ canvasStarsTotal }} 星</span>
      </button>
    </teleport>

    <teleport to="body">
      <div
        v-if="selectedFusion"
        class="fusion-sheet-backdrop"
        role="dialog"
        aria-modal="true"
        aria-labelledby="showcase-fusion-title"
        @click.self="closeFusionSheet"
      >
        <div class="fusion-sheet" @click.stop>
          <div class="fusion-sheet-handle" aria-hidden="true" />
          <h2 id="showcase-fusion-title" class="fusion-sheet-title">{{ selectedFusion.title }}</h2>
          <p class="fusion-sheet-sub">四象属性 · 已保存数据</p>
          <dl class="fusion-sheet-dl">
            <dt>热度/年薪</dt>
            <dd>
              {{ selectedFusion.row.heat }} · 初级年薪 {{ selectedFusion.row.salaryJunior }} · 中级年薪
              {{ selectedFusion.row.salaryMid }}
            </dd>
            <dt>强度/竞争</dt>
            <dd>{{ selectedFusion.row.workIntensity }}级 · {{ selectedFusion.row.competition }}</dd>
            <dt>学历门槛</dt>
            <dd>{{ selectedFusion.row.education }}</dd>
            <dt>学科技能</dt>
            <dd>{{ selectedFusion.row.skills }}</dd>
          </dl>
          <p class="starlit-hint">
            已点亮 <strong>{{ getStarsLit(selectedFusion.id) }}</strong> /
            {{ STARLIT_MAX_STARS_PER_FUSION }} 颗星（本图合计 {{ canvasStarsTotal }} 星）；答题正确可继续点亮。
          </p>
          <button type="button" class="fusion-sheet-primary" @click="goStarlit">点亮星辰 · 去答题</button>
          <button type="button" class="fusion-sheet-close" @click="closeFusionSheet">收起</button>
        </div>
      </div>
    </teleport>

    <StarlitLeaderboardPanel
      :open="leaderboardOpen"
      :fusion-ids="fusionIdsOnCanvas"
      @close="leaderboardOpen = false"
    />
  </div>
</template>

<style scoped>
.showcase-root {
  position: relative;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  background: #0f141f;
  display: flex;
  flex-direction: column;
}

.bar {
  flex-shrink: 0;
  position: relative;
  z-index: 20;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: calc(8px + var(--gx-safe-top, 0px)) 10px 8px;
  background: rgba(8, 12, 22, 0.88);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.mid {
  flex: 1;
  min-width: 0;
}

.title {
  margin: 0;
  font-size: 16px;
  font-weight: 800;
}

.sub {
  margin: 4px 0 0;
  font-size: 12px;
  color: rgba(200, 220, 250, 0.85);
}

.sub.muted {
  color: rgba(180, 200, 230, 0.55);
}

.ghost {
  flex-shrink: 0;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.06);
  color: #eaf2ff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.lb-trigger {
  flex-shrink: 0;
  align-self: flex-start;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid rgba(232, 184, 106, 0.45);
  background: rgba(232, 184, 106, 0.18);
  color: #f0d090;
  font-size: 11px;
  font-weight: 700;
  line-height: 1.25;
  cursor: pointer;
  white-space: nowrap;
}

.lb-fab {
  position: fixed;
  right: 12px;
  bottom: calc(16px + var(--gx-safe-bottom, 0px));
  z-index: 10050;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 72px;
  padding: 10px 12px;
  border: 1px solid rgba(232, 184, 106, 0.5);
  border-radius: 14px;
  background: linear-gradient(165deg, rgba(40, 32, 18, 0.96) 0%, rgba(18, 14, 8, 0.96) 100%);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  color: #f0d090;
  cursor: pointer;
}

.lb-fab-title {
  font-size: 13px;
  font-weight: 800;
}

.lb-fab-sub {
  font-size: 11px;
  font-weight: 600;
  color: rgba(240, 208, 144, 0.85);
}

.canvas {
  flex: 1;
  min-height: 0;
  position: relative;
}

.overlay {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  color: rgba(220, 230, 255, 0.85);
  font-size: 14px;
}

.overlay.err {
  color: #ffb4b4;
}

.cta {
  padding: 12px 20px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #3a7dff, #1e4fc4);
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}

.fusion-sheet-backdrop {
  position: fixed;
  inset: 0;
  z-index: 85;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: rgba(4, 8, 16, 0.52);
}

.fusion-sheet {
  width: 100%;
  max-width: 520px;
  max-height: min(78vh, 620px);
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: 10px 18px calc(18px + var(--gx-safe-bottom, 0px));
  box-sizing: border-box;
  border-radius: 18px 18px 0 0;
  background: linear-gradient(180deg, #121a2c 0%, #0a101c 100%);
  border: 1px solid rgba(120, 170, 255, 0.22);
  border-bottom: none;
  box-shadow: 0 -8px 40px rgba(0, 0, 0, 0.45);
}

.fusion-sheet-handle {
  width: 40px;
  height: 4px;
  margin: 0 auto 12px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.18);
}

.fusion-sheet-title {
  margin: 0 0 6px;
  font-size: 18px;
  font-weight: 800;
  color: #f4f8ff;
}

.fusion-sheet-sub {
  margin: 0 0 12px;
  font-size: 12px;
  color: rgba(180, 200, 230, 0.72);
}

.fusion-sheet-dl {
  margin: 0;
  padding: 0;
}

.fusion-sheet-dl dt {
  margin: 0 0 4px;
  font-size: 12px;
  font-weight: 700;
  color: rgba(200, 210, 255, 0.88);
}

.fusion-sheet-dl dd {
  margin: 0 0 12px;
  font-size: 14px;
  line-height: 1.5;
  color: #e8f2ff;
  word-break: break-word;
}

.starlit-hint {
  margin: 0 0 12px;
  font-size: 12px;
  line-height: 1.45;
  color: rgba(255, 220, 180, 0.88);
}

.fusion-sheet-primary {
  width: 100%;
  padding: 12px 14px;
  margin-bottom: 8px;
  border-radius: 12px;
  border: none;
  font-size: 14px;
  font-weight: 750;
  cursor: pointer;
  background: linear-gradient(135deg, #e8b86a, #c9782a);
  color: #1a0f05;
}

.fusion-sheet-close {
  width: 100%;
  padding: 11px 14px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: transparent;
  color: #eaf2ff;
  font-size: 13px;
  cursor: pointer;
}
</style>
