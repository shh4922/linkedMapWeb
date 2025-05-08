import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import vueDebounce from 'vue-debounce'
import { VueQueryPlugin } from '@tanstack/vue-query'

const piana = createPinia()

createApp(App)
  .use(router)
  .use(piana)
  .use(VueQueryPlugin)
  .directive('debounce', vueDebounce({lock:true}))
  .mount('#app')

window.Kakao.init(import.meta.env.VITE_KAKAO_JS)
