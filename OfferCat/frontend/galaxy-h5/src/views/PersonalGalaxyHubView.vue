<script setup lang="ts">
import { inject } from 'vue'
import { routerKey, type Router } from 'vue-router'

/** 部分壳内 WebView 下 `useRouter()` 会报未定义；`inject(routerKey)` 与 useRouter 等价且更稳 */
const router = inject(routerKey) as Router
if (!router) {
  throw new Error('[PersonalGalaxyHubView] router inject failed')
}

function goDesign() {
  void router.push({ path: '/personal/design' })
}

function goShowcase() {
  void router.push({ path: '/personal/showcase' })
}

/** 仅用 path + replace，避免依赖 history.state.back（部分 WebView 状态异常） */
function goGalaxy() {
  void router.replace({ path: '/galaxy' })
}
</script>

<template>
  <div class="hub">
    <header class="bar">
      <button type="button" class="ghost" @click="goGalaxy">← 大星图</button>
      <div class="bar-center">
        <p class="eyebrow">OfferCat · Galaxy</p>
        <h1 class="title">个人专业星图</h1>
      </div>
      <span class="spacer" aria-hidden="true" />
    </header>

    <main class="main">
      <p class="lead">
        与大星图同一套 3D 渲染与岗位数据：在「设计」里摆放学科大行星并连边生成交叉岗位小行星；在「展示」里只读浏览已保存星系。
      </p>

      <button type="button" class="card card--primary" @click="goDesign">
        <span class="card-kicker">编辑</span>
        <span class="card-title">设计专属星图</span>
        <span class="card-desc">添加大行星、连边、三选一岗位，保存到本机。</span>
      </button>

      <button type="button" class="card card--ghost" @click="goShowcase">
        <span class="card-kicker">只读</span>
        <span class="card-title">展示已保存星图</span>
        <span class="card-desc">进入前请先在设计页保存至少一颗大行星或一条融合。</span>
      </button>
    </main>
  </div>
</template>

<style scoped>
.hub {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: radial-gradient(120% 80% at 50% 0%, rgba(58, 125, 255, 0.18), transparent 55%),
    linear-gradient(168deg, #0b1220 0%, #05070d 52%);
  color: #e8f0ff;
  padding: calc(12px + var(--gx-safe-top, 0px)) 18px calc(22px + var(--gx-safe-bottom, 0px));
  box-sizing: border-box;
}

.bar {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 22px;
}

.bar-center {
  flex: 1;
  min-width: 0;
  text-align: center;
}

.eyebrow {
  margin: 0 0 4px;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(180, 210, 255, 0.55);
}

.title {
  margin: 0;
  font-size: 19px;
  font-weight: 850;
  letter-spacing: 0.03em;
}

.spacer {
  width: 72px;
  flex-shrink: 0;
}

.ghost {
  flex-shrink: 0;
  padding: 8px 12px;
  border-radius: 11px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.06);
  color: #eaf2ff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  max-width: 420px;
  margin: 0 auto;
  width: 100%;
}

.lead {
  margin: 0 0 4px;
  font-size: 13px;
  line-height: 1.6;
  color: rgba(190, 210, 240, 0.82);
  text-align: left;
}

.card {
  width: 100%;
  text-align: left;
  border-radius: 16px;
  padding: 16px 16px 17px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.card:active {
  transform: scale(0.99);
}

.card--primary {
  border: 1px solid rgba(140, 200, 255, 0.45);
  background: linear-gradient(135deg, rgba(58, 125, 255, 0.35), rgba(20, 36, 72, 0.95));
  box-shadow: 0 14px 40px rgba(0, 20, 60, 0.45);
}

.card--ghost {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(12, 18, 32, 0.72);
  box-shadow: 0 8px 26px rgba(0, 0, 0, 0.35);
}

.card-kicker {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(220, 234, 255, 0.65);
}

.card-title {
  font-size: 16px;
  font-weight: 800;
  color: #f5f8ff;
}

.card-desc {
  font-size: 12px;
  line-height: 1.45;
  color: rgba(200, 218, 250, 0.78);
}
</style>
