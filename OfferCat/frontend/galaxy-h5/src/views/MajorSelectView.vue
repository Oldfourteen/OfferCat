<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { GALAXY_MAJORS_KEY, MAJORS, type GalaxyMajorsPayload } from '@/data/majors'
import { postCloseToShell } from '@/utils/bridge'

/** 与 OfferCat 其它页一致的圆角描边左箭头（WebView 内嵌 SVG data URI，避免外链失效） */
const GALAXY_NAV_BACK_ICON =
  'data:image/svg+xml;charset=utf-8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">' +
      '<path d="M14.5 6.5 9 12l5.5 5.5" stroke="#171A1F" stroke-width="2.35" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>',
  )

const router = useRouter()
const fromId = ref<string | null>(null)
const toId = ref<string | null>(null)
const toast = ref('')

const canEnter = computed(() => !!fromId.value && !!toId.value && fromId.value !== toId.value)

function showToast(msg: string) {
  toast.value = msg
  window.setTimeout(() => {
    toast.value = ''
  }, 1800)
}

function onCardClick(id: string) {
  if (id === fromId.value) {
    fromId.value = null
    return
  }
  if (id === toId.value) {
    toId.value = null
    return
  }
  if (!fromId.value) {
    fromId.value = id
    return
  }
  if (!toId.value) {
    if (id === fromId.value) {
      showToast('请选择与起点不同的交叉意向专业')
      return
    }
    toId.value = id
    return
  }
  toId.value = id
}

function enterGalaxy() {
  if (!canEnter.value) return
  const payload: GalaxyMajorsPayload = { fromId: fromId.value!, toId: toId.value! }
  sessionStorage.setItem(GALAXY_MAJORS_KEY, JSON.stringify(payload))
  router.push({ name: 'galaxy' })
}

function goBack() {
  // 选择页返回应直接退出星图容器，不再回到 3D 场景。
  postCloseToShell()
}
</script>

<template>
  <div class="select-page">
    <div class="bg-gradient" aria-hidden="true" />
    <div class="custom-nav">
      <button type="button" class="nav-btn" aria-label="返回" @click="goBack">
        <img
          class="nav-btn-img"
          :src="GALAXY_NAV_BACK_ICON"
          alt=""
          width="19"
          height="19"
          decoding="async"
          draggable="false"
        />
      </button>
      <div class="nav-title">专业星系</div>
      <div class="nav-right" />
    </div>
    <div class="nav-spacer" />
    <header class="header">
      <p class="eyebrow">专业交叉星系</p>
      <h1 class="title">选择你的星域</h1>
      <p class="subtitle">先选起点专业，再选交叉意向；进入星系后会高亮两专业之间的路径与融合关卡。</p>
    </header>

    <section class="picked" aria-live="polite">
      <div class="picked-row">
        <span class="label">主修 / 起点</span>
        <span class="value">{{ fromId ? MAJORS.find((m) => m.id === fromId)?.label : '未选择' }}</span>
      </div>
      <div class="picked-row">
        <span class="label">交叉意向</span>
        <span class="value">{{ toId ? MAJORS.find((m) => m.id === toId)?.label : '未选择' }}</span>
      </div>
    </section>

    <div class="grid">
      <button
        v-for="m in MAJORS"
        :key="m.id"
        type="button"
        class="card"
        :class="{
          'is-from': m.id === fromId,
          'is-to': m.id === toId,
        }"
        @click="onCardClick(m.id)"
      >
        <span class="card-title">{{ m.label }}</span>
        <span class="card-tag">{{ m.tagline }}</span>
      </button>
    </div>

    <footer class="footer">
      <button type="button" class="btn primary" :disabled="!canEnter" @click="enterGalaxy">进入星系</button>
    </footer>

    <div v-if="toast" class="toast" role="status">{{ toast }}</div>
  </div>
</template>

<style scoped>
/* 铺满 WebView 视口并在此层滚动：避免 #app overflow:hidden 下仅靠 min-height 撑不开滚动链（手机端划不动） */
.select-page {
  position: fixed;
  inset: 0;
  width: 100%;
  max-width: none;
  margin: 0;
  padding: calc(20px + var(--gx-safe-top)) 18px calc(24px + var(--gx-safe-bottom));
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: contain;
}

.custom-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;
  height: calc(60px + var(--gx-safe-top));
  padding-top: var(--gx-safe-top);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 12px;
  padding-right: 12px;
  box-sizing: border-box;
  background: linear-gradient(180deg, rgba(93, 143, 223, 0.82) 0%, rgba(154, 205, 250, 0.72) 48%, rgba(155, 204, 249, 0.62) 100%);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.28);
  box-shadow: 0 6px 20px rgba(93, 143, 223, 0.14);
}

.nav-btn {
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
  box-shadow: 0 3px 9px rgba(34, 97, 193, 0.14);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  appearance: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
}

.nav-btn-img {
  width: 20px;
  height: 20px;
  display: block;
  object-fit: contain;
  pointer-events: none;
  -webkit-user-drag: none;
}

.nav-title {
  font-size: 17px;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

.nav-right {
  width: 40px;
  height: 40px;
}

.nav-spacer {
  height: calc(68px + var(--gx-safe-top));
}

.bg-gradient {
  position: fixed;
  inset: 0;
  z-index: -1;
  background-color: var(--gx-bg);
  background-image: linear-gradient(
      180deg,
      rgba(1, 188, 255, 0.12) 0%,
      rgba(49, 101, 215, 0.18) 42%,
      rgba(0, 123, 255, 0.04) 100%
    ),
    linear-gradient(180deg, rgba(0, 122, 252, 0.35) 0%, rgba(1, 188, 255, 0) 72%);
  background-size: 100% 420px;
  background-repeat: no-repeat;
}

.header {
  margin-bottom: 18px;
}

.eyebrow {
  margin: 0 0 6px;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gx-text-muted);
}

.title {
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 650;
  letter-spacing: -0.02em;
}

.subtitle {
  margin: 0;
  font-size: 14px;
  line-height: 1.55;
  color: var(--gx-text-muted);
}

.picked {
  margin-bottom: 16px;
  padding: 12px 14px;
  border-radius: var(--gx-radius);
  background: var(--gx-card);
  border: 1px solid var(--gx-card-border);
  box-shadow: var(--gx-shadow);
}

.picked-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  padding: 4px 0;
}

.picked-row + .picked-row {
  border-top: 1px solid rgba(49, 101, 215, 0.08);
}

.label {
  font-size: 13px;
  color: var(--gx-text-muted);
}

.value {
  font-size: 15px;
  font-weight: 600;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.card {
  text-align: left;
  border-radius: var(--gx-radius);
  padding: 14px 12px;
  border: 1px solid var(--gx-card-border);
  background: var(--gx-card);
  box-shadow: var(--gx-shadow);
  cursor: pointer;
  transition:
    transform 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.card:active {
  transform: scale(0.98);
}

.card-title {
  display: block;
  font-size: 16px;
  font-weight: 650;
  margin-bottom: 4px;
}

.card-tag {
  display: block;
  font-size: 12px;
  color: var(--gx-text-muted);
  line-height: 1.35;
}

.card.is-from {
  border-color: rgba(1, 188, 255, 0.55);
  box-shadow: 0 0 0 1px rgba(1, 188, 255, 0.25);
}

.card.is-to {
  border-color: rgba(49, 101, 215, 0.55);
  box-shadow: 0 0 0 1px rgba(49, 101, 215, 0.22);
}

.footer {
  margin-top: 20px;
  display: flex;
  justify-content: stretch;
}

.btn {
  flex: 1;
  border: none;
  border-radius: 999px;
  padding: 14px 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

.btn.primary {
  color: #fff;
  background: linear-gradient(135deg, var(--gx-primary) 0%, var(--gx-primary-deep) 100%);
  box-shadow: 0 10px 28px rgba(49, 101, 215, 0.28);
}

.btn.primary:disabled {
  opacity: 0.38;
  cursor: not-allowed;
  box-shadow: none;
}

.toast {
  position: fixed;
  left: 50%;
  bottom: calc(88px + var(--gx-safe-bottom));
  transform: translateX(-50%);
  padding: 10px 16px;
  border-radius: 999px;
  background: rgba(20, 28, 44, 0.88);
  color: #fff;
  font-size: 13px;
  max-width: 90vw;
  text-align: center;
}
</style>
