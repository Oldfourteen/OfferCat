<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { loadPersonalGalaxyFromStorage, loadPersonalGalaxyHydrated } from '@/data/personalGalaxyModel'
import {
  incrementStarlit,
  hydrateStarlitFromServer,
  STARLIT_MAX_STARS_PER_FUSION,
  STARLIT_QUESTION_COUNT,
  getStarsLit,
} from '@/data/personalStarlitStore'
import { getGalaxyApiBase } from '@/utils/galaxySession'
import { packKeyFromFusion, resolveMajorCode } from '@/utils/packKey'
import { threeJobsForMajorPair } from '@/data/crossJobCatalog'
import type { PersonalFusionInst, PersonalMajorInst } from '@/data/personalGalaxyModel'
import { goExitFromStarlitQuiz } from '@/utils/navigation'

const route = useRoute()
const router = useRouter()

const fusionId = computed(() => String(route.query.fusionId || ''))
const packKeyFromRoute = computed(() => {
  const q = route.query.packKey
  return typeof q === 'string' && q.trim() ? q.trim() : ''
})

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
const loadError = ref('')
const activePackKey = ref('')

const maxStarsForQuiz = computed(() => {
  const n = questions.value.length
  if (n > 0) return Math.min(STARLIT_MAX_STARS_PER_FUSION, n)
  return STARLIT_MAX_STARS_PER_FUSION
})

async function resolvePackKey(
  fusion: PersonalFusionInst,
  majors: readonly PersonalMajorInst[],
): Promise<string | null> {
  let pk = packKeyFromFusion(fusion, majors)
  if (pk) return pk
  const codeA = resolveMajorCode(fusion.majorA, majors)
  const codeB = resolveMajorCode(fusion.majorB, majors)
  if (!codeA || !codeB) return null
  try {
    const jobs = await threeJobsForMajorPair(codeA, codeB)
    if (!jobs.length) return null
    let jobSlot = fusion.jobSlot ?? 0
    let row = fusion.row
    if (fusion.title?.trim()) {
      const i = jobs.findIndex((j) => j.title === fusion.title)
      if (i >= 0) {
        jobSlot = i
        row = jobs[i]
      }
    }
    if (!row) row = jobs[jobSlot] ?? jobs[0]
    pk = packKeyFromFusion({ ...fusion, row, jobSlot }, majors)
    return pk
  } catch {
    return null
  }
}

async function loadQuestionsForFusion(id: string, title: string) {
  loadingQuestions.value = true
  loadError.value = ''
  activePackKey.value = ''
  questions.value = []
  try {
    const galaxy = await loadPersonalGalaxyHydrated()
    const apiOn = getGalaxyApiBase().length > 0
    if (!apiOn) {
      loadError.value = '未注入星图 API（请从 App 星图入口进入并确认网关地址）'
    } else if (!galaxy?.fusions?.length) {
      loadError.value = '未找到个人星图数据，请先在「设计专属星图」保存后再答题'
    } else {
      const fusion = galaxy.fusions.find((x) => x.id === id)
      if (!fusion) {
        loadError.value = '当前小行星不在已保存星图中，请返回展示页重试'
      } else {
      const packKey =
        packKeyFromRoute.value ||
        (await resolvePackKey(fusion, galaxy.majors)) ||
        ''
      if (!packKey) {
        const a = resolveMajorCode(fusion.majorA, galaxy.majors)
        const b = resolveMajorCode(fusion.majorB, galaxy.majors)
        loadError.value = !a || !b
          ? '无法识别两颗大行星学科，请回设计页重新放入星空并连边保存'
          : '无法解析本题库 pack_key，请重新连边选择岗位后保存星系'
      } else {
        activePackKey.value = packKey
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
          const cap = maxStarsForQuiz.value
          if (starsLit.value > cap) starsLit.value = cap
          return
        }
        loadError.value = `题库包「${packKey}」暂无题目，请确认已导入 starlit_question_bank.sql`
      }
      }
    }
  } catch (e) {
    const base = e instanceof Error ? e.message : '加载题库失败'
    loadError.value = activePackKey.value
      ? `${base}（pack_key: ${activePackKey.value}）`
      : base
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
    const galaxy = await loadPersonalGalaxyHydrated()
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
    if (cursor.value >= questions.value.length - 1 || starsLit.value >= maxStarsForQuiz.value) {
      finished.value = true
      return
    }
    cursor.value += 1
  } else {
    showToast('再想想看')
  }
}

function goExit() {
  const src = typeof route.query.source === 'string' ? route.query.source : 'showcase'
  goExitFromStarlitQuiz(router, src)
}

function goQuestionBankPlaceholder() {
  if (questionsSource.value === 'api') {
    showToast('当前已是服务端题库')
    return
  }
  showToast(loadError.value || '题库未接通，请检查网关与 SQL 导入')
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
        <div class="star-label">已点亮 {{ starsLit }} / {{ maxStarsForQuiz }} 星</div>
        <div class="star-dots" role="list">
          <span
            v-for="i in maxStarsForQuiz"
            :key="i"
            class="dot"
            :class="{ on: i <= starsLit }"
            role="listitem"
          />
        </div>
      </section>

      <div v-if="loadingQuestions" class="loading">加载题目…</div>

      <p v-else-if="loadError && questionsSource === 'mock'" class="load-err">{{ loadError }}</p>

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
        <button type="button" class="ghost wide" @click="goQuestionBankPlaceholder">
          {{ questionsSource === 'api' ? '题库已接通' : '题库未接通 · 查看原因' }}
        </button>
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

.load-err {
  margin: 0 16px 8px;
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 12px;
  line-height: 1.45;
  color: #ffdcb4;
  background: rgba(120, 60, 20, 0.35);
  border: 1px solid rgba(240, 200, 140, 0.35);
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