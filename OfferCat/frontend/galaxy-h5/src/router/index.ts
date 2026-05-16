import { createRouter, createWebHashHistory } from 'vue-router'
import MajorSelectView from '@/views/MajorSelectView.vue'
import GalaxyView from '@/views/GalaxyView.vue'
import PersonalGalaxyHubView from '@/views/PersonalGalaxyHubView.vue'
import PersonalGalaxyView from '@/views/PersonalGalaxyView.vue'
import PersonalGalaxyShowcaseView from '@/views/PersonalGalaxyShowcaseView.vue'
import PersonalStarlitQuizView from '@/views/PersonalStarlitQuizView.vue'

/** 与 Vite `base: './'` 一致，避免嵌在 `/static/galaxy-h5/iframe.html` 下 hash 路由匹配失败导致白屏 */
const history = createWebHashHistory(import.meta.env.BASE)

export const router = createRouter({
  history,
  routes: [
    { path: '/', name: 'select', component: MajorSelectView },
    { path: '/galaxy', name: 'galaxy', component: GalaxyView },
    /** 更长前缀在前，避免与 `/personal` 的匹配歧义（vue-router 按序/排名解析） */
    { path: '/personal/design', name: 'personalDesign', component: PersonalGalaxyView },
    { path: '/personal/showcase', name: 'personalShowcase', component: PersonalGalaxyShowcaseView },
    { path: '/personal/starlit', name: 'personalStarlit', component: PersonalStarlitQuizView },
    { path: '/personal', name: 'personalHub', component: PersonalGalaxyHubView },
    { path: '/personal-galaxy', redirect: { name: 'personalHub' } },
  ],
})
