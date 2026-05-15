<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { useRouter } from 'vue-router'
import { hyperedgesContainingNode } from '@/utils/graph'
import {
  buildPersonalGalaxyMountBundle,
  loadPersonalGalaxyFromStorage,
  type PersonalGalaxyV1,
} from '@/data/personalGalaxyModel'
import { detectWebGL, mountGalaxyThree, type GalaxyVisualState } from '@/lib/galaxyThree'

const router = useRouter()

const phase = ref<'loading' | 'ready' | 'empty' | 'error'>('loading')
const err = ref('')
const saved = shallowRef<PersonalGalaxyV1 | null>(null)
const selectedId = ref<string | null>(null)

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

function remount() {
  const el = canvasHost.value
  const b = bundle.value
  rt.value?.dispose()
  rt.value = null
  if (!el || !b || b.nodes.length === 0) return
  rt.value = mountGalaxyThree(el, b, visual.value, (id) => {
    selectedId.value = id
  })
  rt.value.setVisualState(visual.value)
  rt.value.frameBounds(b.nodes.map((n) => n.id))
}

function goHub() {
  router.push({ name: 'personalHub' })
}

onMounted(async () => {
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
  remount()
})

onBeforeUnmount(() => {
  rt.value?.dispose()
  rt.value = null
})

const selectedLabel = computed(() => {
  if (!selectedId.value || !bundle.value) return ''
  return bundle.value.nodes.find((n) => n.id === selectedId.value)?.label ?? ''
})
</script>

<template>
  <div class="showcase-root">
    <header class="bar">
      <button type="button" class="ghost" @click="goHub">返回</button>
      <div class="mid">
        <h1 class="title">展示星图</h1>
        <p v-if="selectedLabel" class="sub">{{ selectedLabel }}</p>
        <p v-else class="sub muted">单指旋转 · 空闲时自动公转</p>
      </div>
      <span class="spacer" aria-hidden="true" />
    </header>

    <div v-if="phase === 'loading'" class="overlay">加载…</div>
    <div v-else-if="phase === 'error'" class="overlay err">{{ err }}</div>
    <div v-else-if="phase === 'empty'" class="overlay empty">
      <p>还没有已保存的个人星系。</p>
      <button type="button" class="cta" @click="goHub">返回去设计</button>
    </div>
    <div v-else ref="canvasHost" class="canvas" />
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
  z-index: 5;
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

.spacer {
  width: 56px;
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
</style>
