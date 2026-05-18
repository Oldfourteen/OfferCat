import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { loadCrossJobCatalog } from '@/data/crossJobCatalog'
import './styles/tokens.css'

void loadCrossJobCatalog().catch(() => {
  /* 首屏预加载岗位表，供 pack_key 学科顺序索引 */
})

createApp(App).use(router).mount('#app')
