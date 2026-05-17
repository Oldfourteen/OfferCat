<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { loadPersonalGalaxyFromStorage } from '@/data/personalGalaxyModel'
import {
  incrementStarlit,
  hydrateStarlitFromServer,
  STARLIT_MAX_STARS_PER_FUSION,
  STARLIT_QUESTION_COUNT,
  getStarsLit,
} from '@/data/personalStarlitStore'
import { galaxyApiReady } from '@/utils/galaxySession'
import { packKeyFromFusionId } from '@/utils/packKey'
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
const loadingQuestions = ref(false)
const questionsSource = ref<'api' | 'mock'>('mock')

async function loadQuestionsForFusion(id: string, title: string) {
  loadingQuestions.value = true
  questions.value = []
  try {
    const galaxy = loadPersonalGalaxyFromStorage()
    if (galaxyApiReady() && galaxy) {
      const packKey = packKeyFromFusionId(id, galaxy.fusions)
      if (packKey) {
        const { fetchStarlitQuestions } = await import('@/api/galaxyBackend')
        const rows = await fetchStarlitQuestions(packKey)
        if (rows.length > 0) {
          questions.value = rows.map((r) => ({
            idx: r.questionNo - 1,
            text: r.stem,
            options: r.options,
            correct: r.correctIndex,
          }))
          questionsSource.value = 'api'
          return
        }
      }
    }
  } catch {
    /* fallback mock */
  } finally {
    if (!questions.value.length) {
      questions.value = buildMockQuestions(title)
      questionsSource.value = 'mock'
    }
    loadingQuestions.value = false
  }
}

watch(
  [fusionId, fusionTitle],
  async ([id]) => {
    if (!id) return
    const galaxy = loadPersonalGalaxyFromStorage()
    if (galaxy?.fusions?.length) {
      await hydrateStarlitFromServer(galaxy.fusions)
    }
    starsLit.value = getStarsLit(id)
    cursor.value = 0
    finished.value = false
    await loadQuestionsForFusion(id, fusionTitle.value)
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
    if (cursor.value >= questions.value.length - 1 || starsLit.value >= STARLIT_MAX_STARS_PER_FUSION) {
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
        <p v-if="questionsSource === 'api'" class="sub api-tag">题库来自服务端</p>
      </div>
      <span class="spacer" />
    </header>

    <div v-if="!fusionId" class="empty">
      <p>缺少小行星参数。</p>
      <button type="button" class="cta" @click="goExit">退出</button>
    </div>

    <template v-else>
      <section class="star-strip" aria-label="已点亮星数">
        <div class="star-label">已点亮 {{ starsLit }} / {{ STARLIT_MAX_STARS_PER_FUSION }} 星</div>
        <div class="star-dots" role="list">
          <span
            v-for="i in STARLIT_MAX_STARS_PER_FUSION"
            :key="i"
            class="dot"
            :class="{ on: i <= starsLit }"
            role="listitem"
          />
        </div>
      </section>

      <div v-if="loadingQuestions" class="loading">加载题目…</div>

      <section v-else-if="finished" class="done">
        <p>本套题目已完成或已达星数上限。</p>
        <button type="button" class="cta" @click="goExit">返回展示星图</button>
      </section>

      <section v-else-if="current" class="q-card">
        <p class="q-text">{{ current.text }}</p>
        <div class="q-opts">
          <button
            v-for="(opt, i) in current.options"
            :key="i"
            type="button"
            class="q-opt"
            @click="pick(i)"
          >
            {{ String.fromCharCode(65 + i) }}. {{ opt }}
          </button>
        </div>
      </section>

      <p v-if="toast" class="toast" role="status">{{ toast }}</p>

      <footer class="foot">
        <button type="button" class="ghost wide" @click="goQuestionBankPlaceholder">去题库刷题（占位）</button>
      </footer>
    </template>
  </div>
</template>

<style scoped>
.quiz-root {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #0f141f;
  color: #eaf2ff;
}

.bar {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: calc(8px + var(--gx-safe-top, 0px)) 10px 8px;
  background: rgba(8, 12, 22, 0.92);
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
  color: rgba(200, 220, 250, 0.8);
}

.api-tag {
  color: rgba(180, 230, 180, 0.9);
}

.spacer {
  width: 56px;
}

.ghost {
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.06);
  color: #eaf2ff;
  font-size: 13px;
  cursor: pointer;
}

.ghost.wide {
  width: 100%;
}

.star-strip {
  padding: 14px 16px;
}

.star-label {
  font-size: 13px;
  margin-bottom: 8px;
}

.star-dots {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
}

.dot.on {
  background: #f0d090;
  box-shadow: 0 0 6px rgba(240, 208, 144, 0.8);
}

.loading,
.empty,
.done {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 24px;
}

.q-card {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}

.q-text {
  font-size: 15px;
  line-height: 1.55;
  margin: 0 0 16px;
}

.q-opts {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.q-opt {
  text-align: left;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.05);
  color: #eaf2ff;
  font-size: 14px;
  cursor: pointer;
}

.toast {
  position: fixed;
  left: 50%;
  bottom: calc(80px + var(--gx-safe-bottom, 0px));
  transform: translateX(-50%);
  padding: 10px 16px;
  border-radius: 10px;
  background: rgba(20, 28, 48, 0.95);
  border: 1px solid rgba(240, 208, 144, 0.4);
  font-size: 13px;
}

.foot {
  padding: 12px 16px calc(16px + var(--gx-safe-bottom, 0px));
}

.cta {
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #e8b86a, #c9782a);
  color: #1a0f05;
  font-weight: 700;
  cursor: pointer;
}
</style>