import { createRouter, createWebHashHistory } from 'vue-router'
import MajorSelectView from '@/views/MajorSelectView.vue'
import GalaxyView from '@/views/GalaxyView.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'select', component: MajorSelectView },
    { path: '/galaxy', name: 'galaxy', component: GalaxyView },
  ],
})
