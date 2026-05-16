<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { buildLeaderboardRows, getSelfDisplayName, setSelfDisplayName } from '@/data/starlitLeaderboard'
import { getTotalStarsLitForFusions, STARLIT_MAX_STARS_PER_FUSION } from '@/data/personalStarlitStore'

const props = defineProps<{
  open: boolean
  fusionIds: string[]
}>()

const emit = defineEmits<{
  close: []
}>()

const rows = ref(buildLeaderboardRows())
const selfNameDraft = ref(getSelfDisplayName())

const canvasTotal = computed(() => getTotalStarsLitForFusions(props.fusionIds))

function refresh() {
  rows.value = buildLeaderboardRows()
  selfNameDraft.value = getSelfDisplayName()
}

function applyName() {
  setSelfDisplayName(selfNameDraft.value)
  refresh()
}

watch(
  () => props.open,
  (v) => {
    if (v) refresh()
  },
)

watch(
  () => props.fusionIds,
  () => {
    if (props.open) refresh()
  },
  { deep: true },
)
</script>

<template>
  <teleport to="body">
    <div
      v-if="open"
      class="lb-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="starlit-lb-title"
      @click.self="emit('close')"
    >
      <div class="lb-card" @click.stop>
        <header class="lb-head">
          <div>
            <h2 id="starlit-lb-title" class="lb-title">点亮排行榜</h2>
            <p class="lb-sub">按已点亮星数排序 · 本星系合计 {{ canvasTotal }} 星</p>
          </div>
          <button type="button" class="lb-close" aria-label="关闭" @click="emit('close')">×</button>
        </header>

        <div class="lb-name-row">
          <label class="lb-name-label" for="lb-self-name">我的昵称</label>
          <input
            id="lb-self-name"
            v-model="selfNameDraft"
            class="lb-name-input"
            maxlength="20"
            placeholder="展示在榜上"
            @change="applyName"
            @keydown.enter="applyName"
          />
        </div>

        <p class="lb-hint">
          总星数 = 各小行星点亮之和（每颗最多 {{ STARLIT_MAX_STARS_PER_FUSION }}）。当前为本机演示榜，接入后端后同步全站数据。
        </p>

        <ol class="lb-list">
          <li v-for="(row, idx) in rows" :key="row.id" class="lb-row" :class="{ self: row.isSelf }">
            <span class="lb-rank">{{ idx + 1 }}</span>
            <span class="lb-name">{{ row.displayName }}</span>
            <span class="lb-stars">{{ row.totalStars }} 星</span>
          </li>
        </ol>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.lb-backdrop {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
  background: rgba(4, 8, 16, 0.55);
}

.lb-card {
  width: 100%;
  max-width: 360px;
  max-height: min(78vh, 520px);
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  border: 1px solid rgba(140, 200, 255, 0.28);
  background: linear-gradient(165deg, rgba(18, 28, 48, 0.98) 0%, rgba(8, 12, 22, 0.98) 100%);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
  overflow: hidden;
}

.lb-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  padding: 14px 14px 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.lb-title {
  margin: 0;
  font-size: 17px;
  font-weight: 800;
  color: #f4f8ff;
}

.lb-sub {
  margin: 4px 0 0;
  font-size: 12px;
  color: rgba(190, 210, 240, 0.78);
}

.lb-close {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  color: #eaf2ff;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
}

.lb-name-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px 0;
}

.lb-name-label {
  flex-shrink: 0;
  font-size: 12px;
  color: rgba(200, 218, 250, 0.75);
}

.lb-name-input {
  flex: 1;
  min-width: 0;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(0, 0, 0, 0.25);
  color: #eaf2ff;
  font-size: 13px;
}

.lb-hint {
  margin: 8px 14px 0;
  font-size: 11px;
  line-height: 1.45;
  color: rgba(180, 200, 230, 0.55);
}

.lb-list {
  margin: 10px 0 0;
  padding: 0 10px 14px;
  list-style: none;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.lb-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 8px;
  border-radius: 10px;
  font-size: 13px;
  color: #e8f2ff;
}

.lb-row.self {
  background: rgba(232, 184, 106, 0.12);
  border: 1px solid rgba(232, 184, 106, 0.28);
}

.lb-rank {
  width: 28px;
  flex-shrink: 0;
  font-weight: 800;
  color: rgba(180, 210, 255, 0.65);
}

.lb-row.self .lb-rank {
  color: #e8c070;
}

.lb-name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.lb-stars {
  flex-shrink: 0;
  font-weight: 700;
  color: #c8e4ff;
}

.lb-row.self .lb-stars {
  color: #f0d090;
}
</style>
