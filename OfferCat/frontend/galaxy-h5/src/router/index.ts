import { createRouter, createWebHashHistory } from 'vue-router'
import MajorSelectView from '@/views/MajorSelectView.vue'
import GalaxyView from '@/views/GalaxyView.vue'
import PersonalGalaxyHubView from '@/views/PersonalGalaxyHubView.vue'
import PersonalGalaxyView from '@/views/PersonalGalaxyView.vue'
import PersonalGalaxyShowcaseView from '@/views/PersonalGalaxyShowcaseView.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'select', component: MajorSelectView },
    { path: '/galaxy', name: 'galaxy', component: GalaxyView },
    { path: '/personal', name: 'personalHub', component: PersonalGalaxyHubView },
    { path: '/personal/design', name: 'personalDesign', component: PersonalGalaxyView },
    { path: '/personal/showcase', name: 'personalShowcase', component: PersonalGalaxyShowcaseView },
    { path: '/personal-galaxy', redirect: { name: 'personalHub' } },
  ],
})
