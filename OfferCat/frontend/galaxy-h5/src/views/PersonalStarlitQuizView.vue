<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { loadPersonalGalaxyFromStorage } from '@/data/personalGalaxyModel'
import {
  incrementStarlit,
  STARLIT_MAX_STARS,
  STARLIT_QUESTION_COUNT,
  getStarsLit,
} from '@/data/personalStarlitStore'
import { goExitFromStarlitQuiz } from '@/utils/navigation'

const route = useRoute()
const router = useRouter()

const fusionId = computed(() => String(route.query.fusionId || ''))

const fusionTitle = computed(() => {
  const q = route.query.title
  if (typeof q === 'string' && q.trim()) return q
  const id = fusionId.value
  if (!id) return '小行星'
  const g = loadPersonalGalaxyFromStorage()
  const f = g?.fusions.find((x) => x.id === id)
  return f?.title ?? '小行星'
})

type Q = { idx: number; text: string; options: string[]; correct: number }

function buildMockQuestions(title: string): Q[] {
  const out: Q[] = []
  const opts = ['正确', '错误', '视场景而定', '以上皆非']
  for (let i = 0; i < STARLIT_QUESTION_COUNT; i++) {
    const correct = i % 4
    const text = `【${title}】第 ${i + 1} / ${STARLIT_QUESTION_COUNT} 题（占位）：与交叉岗位相关的表述，选项「${opts[correct]}」为本题预设答案。`
    out.push({ idx: i, text, options: [...opts], correct })
  }
  return out
}

const questions = ref<Q[]>([])
const cursor = ref(0)
const starsLit = ref(0)
const toast = ref('')
const finished = ref(false)

watch(
  [fusionId, fusionTitle],
  ([id]) => {
    if (!id) return
    starsLit.value = getStarsLit(id)
    questions.value = buildMockQuestions(fusionTitle.value)
    cursor.value = 0
    finished.value = false
  },
  { immediate: true },
)

const current = computed(() => questions.value[cursor.value] ?? null)

function showToast(msg: string) {
  toast.value = msg
  window.setTimeout(() => {
    toast.value = ''
  }, 1400)
}

function pick(choiceIndex: number) {
  if (!fusionId.value || finished.value || !current.value) return
  const q = current.value
  if (choiceIndex === q.correct) {
    starsLit.value = incrementStarlit(fusionId.value)
    showToast('点亮 +1 星')
    if (cursor.value >= STARLIT_QUESTION_COUNT - 1 || starsLit.value >= STARLIT_MAX_STARS) {
      finished.value = true
      return
    }
    cursor.value += 1
  } else {
    showToast('再想想看')
  }
}

function goExit() {
  goExitFromStarlitQuiz(router)
}

function goQuestionBankPlaceholder() {
  showToast('对接题库：uni.navigateTo 刷题页（占位）')
}
</script>

<template>
  <div class="quiz-root">
    <header class="bar">
      <button type="button" class="ghost" @click="goExit">← 退出</button>
      <div class="mid">
        <h1 class="title">点亮星辰</h1>
        <p class="sub">{{ fusionTitle }}</p>
      </div>
      <span class="spacer" />
    </header>

    <div v-if="!fusionId" class="empty">
      <p>缺少小行星参数。</p>
      <button type="button" class="cta" @click="goExit">退出</button>
    </div>

    <template v-else>
      <section class="star-strip" aria-label="已点亮星数">
        <div class="star-label">已点亮 {{ starsLit }} / {{ STARLIT_MAX_STARS }} 星</div>
        <div class="star-dots" role="list">
          <span
            v-for="i in STARLIT_MAX_STARS"
            :key="i"
            class="dot"
            :class="{ on: i <= starsLit }"
            role="listitem"
          />
        </div>
      </section>

      <section v-if="finished" class="card done">
        <p class="done-title">本轮已完成</p>
        <p class="done-desc">已点亮 {{ starsLit }} 颗星；数据已写入本机（占位）。退出后将回到专业星系（大星图）。</p>
        <button type="button" class="cta" @click="goExit">退出</button>
        <button type="button" class="secondary" @click="goQuestionBankPlaceholder">进入题库刷题（占位）</button>
      </section>

      <section v-else-if="current" class="card">
        <p class="progress">题目 {{ cursor + 1 }} / {{ STARLIT_QUESTION_COUNT }}</p>
        <p class="qtext">{{ current.text }}</p>
        <div class="opts">
          <button
            v-for="(opt, j) in current.options"
            :key="j"
            type="button"
            class="opt"
            @click="pick(j)"
          >
            {{ opt }}
          </button>
        </div>
      </section>

      <p v-if="toast" class="toast" role="status">{{ toast }}</p>
    </template>
  </div>
</template>

<style scoped>
.quiz-root {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(168deg, #0b1220 0%, #05070d 55%);
  color: #e8f0ff;
  padding: calc(10px + var(--gx-safe-top, 0px)) 16px calc(20px + var(--gx-safe-bottom, 0px));
  box-sizing: border-box;
}

.bar {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 16px;
}

.mid {
  flex: 1;
  min-width: 0;
}

.title {
  margin: 0;
  font-size: 18px;
  font-weight: 850;
}

.sub {
  margin: 4px 0 0;
  font-size: 12px;
  color: rgba(190, 210, 245, 0.75);
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

.star-strip {
  margin-bottom: 14px;
}

.star-label {
  font-size: 12px;
  color: rgba(255, 220, 160, 0.9);
  margin-bottom: 8px;
  font-weight: 650;
}

.star-dots {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
}
.dot.on {
  background: linear-gradient(135deg, #ffe08a, #ffb347);
  box-shadow: 0 0 8px rgba(255, 200, 120, 0.55);
}

.card {
  flex: 1;
  border-radius: 16px;
  padding: 16px;
  border: 1px solid rgba(140, 200, 255, 0.22);
  background: rgba(12, 18, 34, 0.88);
}

.done {
  text-align: center;
}

.done-title {
  margin: 0 0 8px;
  font-size: 17px;
  font-weight: 800;
}

.done-desc {
  margin: 0 0 16px;
  font-size: 13px;
  line-height: 1.55;
  color: rgba(200, 218, 250, 0.82);
}

.progress {
  margin: 0 0 10px;
  font-size: 12px;
  color: rgba(180, 200, 230, 0.7);
}

.qtext {
  margin: 0 0 14px;
  font-size: 14px;
  line-height: 1.55;
}

.opts {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.opt {
  text-align: left;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.05);
  color: #eaf2ff;
  font-size: 14px;
  cursor: pointer;
}

.cta {
  width: 100%;
  margin-top: 8px;
  padding: 12px 14px;
  border-radius: 12px;
  border: none;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  background: linear-gradient(135deg, #3a7dff, #1e4fc4);
  color: #fff;
}

.secondary {
  width: 100%;
  margin-top: 10px;
  padding: 11px 14px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: transparent;
  color: #eaf2ff;
  font-size: 13px;
  cursor: pointer;
}

.empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.toast {
  position: fixed;
  left: 50%;
  bottom: calc(24px + var(--gx-safe-bottom, 0px));
  transform: translateX(-50%);
  padding: 10px 16px;
  border-radius: 999px;
  background: rgba(20, 28, 48, 0.92);
  border: 1px solid rgba(140, 200, 255, 0.25);
  font-size: 13px;
  z-index: 20;
}
</style>
