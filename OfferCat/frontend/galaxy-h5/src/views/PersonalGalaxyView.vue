<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { useRouter } from 'vue-router'
import { MAJORS } from '@/data/majors'
import { threeJobsForMajorPair, type CrossJobRow } from '@/data/crossJobCatalog'
import {
  buildPersonalGalaxyMountBundle,
  loadPersonalGalaxyFromStorage,
  savePersonalGalaxyToStorage,
  syncPersonalGalaxyToServer,
  toPersistedPayload,
} from '@/data/personalGalaxyModel'
import { hyperedgesContainingNode } from '@/utils/graph'
import { goBackOrReplace } from '@/utils/navigation'
import { detectWebGL, mountGalaxyThree, type GalaxyVisualState } from '@/lib/galaxyThree'
import { computeAmbientStarBoost } from '@/data/personalStarlitStore'

const router = useRouter()

const phase = ref<'loading' | 'ready' | 'error'>('loading')
const err = ref('')

const pendingMajorId = ref<string | null>(null)
const linkMode = ref(false)
const linkFirstId = ref<string | null>(null)

const majorsOnCanvas = ref<{ id: string; majorId: string; label: string }[]>([])
const fusions = ref<{ id: string; title: string; majorA: string; majorB: string; row: CrossJobRow }[]>([])

const jobModal = ref<{ open: boolean; aId: string; bId: string; options: CrossJobRow[] }>({
  open: false,
  aId: '',
  bId: '',
  options: [],
})

const selectedId = ref<string | null>(null)
const saveHint = ref('')

const canvasHost = ref<HTMLElement | null>(null)
const rt = shallowRef<ReturnType<typeof mountGalaxyThree> | null>(null)

const mountBundle = computed(() => buildPersonalGalaxyMountBundle(majorsOnCanvas.value, fusions.value))

const hyperMemberIds = computed(() => {
  if (!selectedId.value) return new Set<string>()
  return hyperedgesContainingNode(selectedId.value, mountBundle.value.hyperedges).memberIds
})

const activeHyperedgeIds = computed(() => {
  if (!selectedId.value) return new Set<string>()
  return new Set(hyperedgesContainingNode(selectedId.value, mountBundle.value.hyperedges).hyperedgeIds)
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

const selectedFusion = computed(() => {
  if (!selectedId.value) return null
  return fusions.value.find((f) => f.id === selectedId.value) ?? null
})

const selectedMajor = computed(() => {
  if (!selectedId.value) return null
  return majorsOnCanvas.value.find((m) => m.id === selectedId.value) ?? null
})

function remountThree() {
  const el = canvasHost.value
  const data = mountBundle.value
  rt.value?.dispose()
  rt.value = null
  if (!el || data.nodes.length === 0) return
  const ambientStarBoost = computeAmbientStarBoost(data.nodes)
  rt.value = mountGalaxyThree(el, data, visual.value, (id) => {
    selectedId.value = id
    if (!id || !linkMode.value) return
    const isMajor = majorsOnCanvas.value.some((m) => m.id === id)
    if (!isMajor) return
    if (!linkFirstId.value) {
      linkFirstId.value = id
      return
    }
    if (linkFirstId.value === id) return
    const a = majorsOnCanvas.value.find((m) => m.id === linkFirstId.value)
    const b = majorsOnCanvas.value.find((m) => m.id === id)
    if (!a || !b) return
    void openJobModal(a, b)
  }, { ambientStarBoost })
  rt.value.setVisualState(visual.value)
  rt.value.frameBounds(data.nodes.map((n) => n.id))
}

watch(mountBundle, async () => {
  if (phase.value !== 'ready') return
  await nextTick()
  remountThree()
})

async function openJobModal(a: { id: string; majorId: string }, b: { id: string; majorId: string }) {
  try {
    const opts = await threeJobsForMajorPair(a.majorId, b.majorId)
    if (opts.length === 0) {
      err.value = `《具体专业》表中暂无「${a.label}×${b.label}」组合的三岗数据，请换一对学科。`
      linkFirstId.value = null
      return
    }
    jobModal.value = { open: true, aId: a.id, bId: b.id, options: opts }
  } catch (e) {
    err.value = e instanceof Error ? e.message : '加载岗位表失败'
  } finally {
    linkFirstId.value = null
  }
}

function confirmJob(row: CrossJobRow) {
  const { aId, bId } = jobModal.value
  const id = `f_${Date.now()}`
  fusions.value.push({
    id,
    title: row.title,
    majorA: aId,
    majorB: bId,
    row,
  })
  jobModal.value.open = false
  jobModal.value.options = []
  linkMode.value = false
  selectedId.value = id
}

function cancelJobModal() {
  jobModal.value.open = false
  jobModal.value.options = []
  linkFirstId.value = null
}

function placePendingMajor() {
  if (!pendingMajorId.value) return
  const m = MAJORS.find((x) => x.id === pendingMajorId.value)
  if (!m) return
  const id = `m_${pendingMajorId.value}_${Date.now()}`
  majorsOnCanvas.value.push({ id, majorId: m.id, label: m.label })
  pendingMajorId.value = null
}

async function saveGalaxy() {
  const payload = toPersistedPayload(majorsOnCanvas.value, fusions.value)
  savePersonalGalaxyToStorage(payload)
  const remote = await syncPersonalGalaxyToServer(payload)
  saveHint.value = remote.ok ? '已保存到本地，并已尝试同步服务端。' : '已保存到本机（服务端同步接口待接入）。'
  window.setTimeout(() => {
    saveHint.value = ''
  }, 3200)
}

function goBack() {
  goBackOrReplace(router, { name: 'personalHub' })
}

onMounted(async () => {
  if (!detectWebGL()) {
    phase.value = 'error'
    err.value = '当前环境不支持 WebGL'
    return
  }
  try {
    await threeJobsForMajorPair('major_electrical', 'major_law')
  } catch (e) {
    phase.value = 'error'
    err.value = e instanceof Error ? e.message : '预加载岗位表失败'
    return
  }

  const stored = loadPersonalGalaxyFromStorage()
  if (stored?.majors?.length) {
    majorsOnCanvas.value = [...stored.majors]
    fusions.value = [...stored.fusions]
  }

  phase.value = 'ready'
  await nextTick()
  remountThree()
})

onBeforeUnmount(() => {
  rt.value?.dispose()
  rt.value = null
})
</script>

<template>
  <div class="personal-root">
    <div v-if="phase === 'loading'" class="loading-overlay">加载岗位数据…</div>
    <div v-if="phase === 'error'" class="err-banner">{{ err }}</div>

    <header class="top-bar">
      <button type="button" class="back-btn" @click="goBack">返回</button>
      <div class="top-titles">
        <h1 class="title">设计专属星图</h1>
        <p class="subtitle">与大星图相同的 3D 星球与材质；小行星四维来自岗位表，随图保存。</p>
      </div>
      <button type="button" class="save-btn" @click="saveGalaxy">保存星系</button>
    </header>
    <p v-if="saveHint" class="save-toast">{{ saveHint }}</p>

    <div ref="canvasHost" class="canvas-wrap" />

    <div class="control-panel">
      <section class="tb-block">
        <p class="label">① 添加大行星（10 学科）</p>
        <div class="major-grid">
          <button
            v-for="m in MAJORS"
            :key="m.id"
            type="button"
            class="chip"
            :class="{ active: pendingMajorId === m.id }"
            @click="pendingMajorId = m.id"
          >
            {{ m.label }}
          </button>
        </div>
        <button type="button" class="primary full" :disabled="!pendingMajorId" @click="placePendingMajor">
          放入星空
        </button>
      </section>

      <section class="tb-block">
        <p class="label">② 连边并生成交叉岗位</p>
        <button
          type="button"
          class="secondary full"
          :class="{ on: linkMode }"
          @click="
            linkMode = !linkMode;
            linkFirstId = null
          "
        >
          {{ linkMode ? '连边模式已开 · 依次点两颗大行星' : '开启连边模式' }}
        </button>
        <p v-if="linkMode" class="hint">在星空中先点一颗，再点另一颗；有数据则弹出三选一。</p>
      </section>

      <section v-if="selectedFusion" class="tb-block fusion-strip">
        <p class="label">当前小行星</p>
        <p class="fusion-strip-title">{{ selectedFusion.title }}</p>
        <p class="hint fusion-strip-hint">四象详情见下方弹层；点击星空空白处可取消选中。</p>
      </section>

      <section v-else-if="selectedMajor" class="tb-block">
        <p class="label">当前选中</p>
        <p class="mono">大行星 · {{ selectedMajor.label }}</p>
      </section>

      <section v-else class="tb-block muted">
        <p class="hint">提示：单指旋转视角；空闲时自动公转。连边模式下依次点击两颗大行星。</p>
      </section>
    </div>

    
    <teleport to="body">
      <div
        v-if="selectedFusion"
        class="fusion-sheet-backdrop"
        role="dialog"
        aria-modal="true"
        aria-labelledby="fusion-sheet-heading"
        @click.self="selectedId = null"
      >
        <div class="fusion-sheet" @click.stop>
          <div class="fusion-sheet-handle" aria-hidden="true" />
          <h3 id="fusion-sheet-heading" class="fusion-sheet-title">{{ selectedFusion.title }}</h3>
          <p class="fusion-sheet-sub">四象属性（岗位表 · 完整）</p>
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
          <button type="button" class="fusion-sheet-close" @click="selectedId = null">收起</button>
        </div>
      </div>
    </teleport>
<teleport to="body">
      <div v-if="jobModal.open" class="modal-mask" @click.self="cancelJobModal">
        <div class="modal">
          <h2>三选一 · 确立小行星</h2>
          <p class="modal-sub">数据来源：《具体专业》岗位表（同组合前三条）</p>
          <ul>
            <li v-for="(r, i) in jobModal.options" :key="i">
              <button type="button" class="job-btn" @click="confirmJob(r)">
                <span class="jt">{{ r.title }}</span>
                <span class="jd">{{ r.heat }} · 中级年薪 {{ r.salaryMid }} · 竞争 {{ r.competition }}</span>
              </button>
            </li>
          </ul>
          <button type="button" class="ghost full" @click="cancelJobModal">取消</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<style scoped>
.personal-root {
  position: relative;
  width: 100%;
  max-width: 100vw;
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: linear-gradient(180deg, #0a101c 0%, #070b12 40%);
  color: #e8f0ff;
}

.loading-overlay {
  position: absolute;
  inset: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: rgba(220, 230, 255, 0.85);
  background: rgba(6, 10, 18, 0.65);
  pointer-events: none;
}

.err-banner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 10px 12px;
  background: rgba(120, 30, 30, 0.92);
  font-size: 13px;
}

.top-bar {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: calc(8px + var(--gx-safe-top, 0px)) 12px 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(8, 12, 22, 0.92);
}

.back-btn {
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

.save-btn {
  flex-shrink: 0;
  padding: 8px 12px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #2e6fd6, #1a3d9e);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.top-titles {
  flex: 1;
  min-width: 0;
}

.title {
  margin: 0;
  font-size: 17px;
  font-weight: 800;
  letter-spacing: 0.02em;
}

.subtitle {
  margin: 4px 0 0;
  font-size: 11px;
  line-height: 1.4;
  color: rgba(190, 210, 240, 0.72);
}

.save-toast {
  flex-shrink: 0;
  margin: 0;
  padding: 6px 12px;
  font-size: 12px;
  text-align: center;
  color: rgba(180, 255, 210, 0.95);
  background: rgba(20, 60, 40, 0.55);
}

.canvas-wrap {
  flex: 1;
  min-height: 0;
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.control-panel {
  flex-shrink: 0;
  max-height: min(48vh, 420px);
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 10px 14px calc(12px + var(--gx-safe-bottom, 0px));
  box-sizing: border-box;
}

.tb-block {
  margin-top: 12px;
}

.tb-block:first-child {
  margin-top: 0;
}

.tb-block + .tb-block {
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.label {
  margin: 0 0 8px;
  font-size: 11px;
  letter-spacing: 0.08em;
  color: rgba(180, 200, 230, 0.65);
}

.major-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  margin-bottom: 10px;
}

@media (max-width: 360px) {
  .major-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.chip {
  font-size: 12px;
  padding: 8px 6px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.05);
  color: #eaf2ff;
  cursor: pointer;
  text-align: center;
}

.chip.active {
  border-color: rgba(120, 210, 255, 0.55);
  background: rgba(80, 160, 255, 0.14);
}

.primary,
.secondary,
.ghost {
  border-radius: 12px;
  font-size: 13px;
  font-weight: 650;
  cursor: pointer;
  border: none;
}

.primary {
  background: linear-gradient(135deg, #3a7dff, #1e4fc4);
  color: #fff;
  padding: 11px 14px;
}

.primary:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.secondary {
  background: rgba(255, 255, 255, 0.08);
  color: #eaf2ff;
  padding: 11px 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.secondary.on {
  border-color: rgba(120, 255, 200, 0.45);
  color: #c8ffe8;
}

.ghost {
  background: transparent;
  color: rgba(220, 230, 255, 0.85);
  padding: 10px 0;
  text-align: center;
}

.full {
  width: 100%;
  margin-top: 8px;
}

.hint {
  margin: 8px 0 0;
  font-size: 12px;
  line-height: 1.45;
  color: rgba(200, 220, 250, 0.7);
}

.tb-block.muted .hint {
  margin: 0;
  color: rgba(180, 200, 230, 0.55);
}

.mono {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
}

.modal-mask {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0;
}

@media (min-height: 560px) {
  .modal-mask {
    align-items: center;
    padding: 16px;
  }
}

.modal {
  width: 100%;
  max-width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  border-radius: 16px 16px 0 0;
  padding: 18px 16px calc(18px + var(--gx-safe-bottom, 0px));
  background: #101828;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-bottom: none;
  color: #eaf0ff;
  box-sizing: border-box;
}

@media (min-height: 560px) {
  .modal {
    width: min(420px, 94vw);
    max-height: 80vh;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.12);
  }
}

.modal h2 {
  margin: 0 0 6px;
  font-size: 17px;
}

.modal-sub {
  margin: 0 0 14px;
  font-size: 12px;
  color: rgba(200, 214, 240, 0.65);
}

.modal ul {
  list-style: none;
  margin: 0 0 14px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.job-btn {
  width: 100%;
  text-align: left;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.05);
  color: inherit;
  cursor: pointer;
}

.jt {
  display: block;
  font-weight: 750;
  font-size: 14px;
}

.jd {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: rgba(200, 214, 240, 0.72);
}

.fusion-strip-title {
  margin: 0 0 6px;
  font-size: 15px;
  font-weight: 800;
  color: #f0f6ff;
  line-height: 1.3;
}

.fusion-strip-hint {
  margin: 0;
  font-size: 11px;
  line-height: 1.45;
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
  max-height: min(72vh, 560px);
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
  margin: 0 0 14px;
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
  margin: 0 0 14px;
  font-size: 14px;
  line-height: 1.5;
  color: #e8f2ff;
  word-break: break-word;
}

.fusion-sheet-close {
  width: 100%;
  margin-top: 4px;
  padding: 12px 14px;
  border-radius: 12px;
  border: none;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  background: linear-gradient(135deg, #3a7dff, #1e4fc4);
  color: #fff;
}
</style>
