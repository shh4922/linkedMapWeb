import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // server: {
  //   proxy: {
  //     '/api': 'http://localhost:5173',  // 필요한 경우 API 요청에 대한 프록시 설정
  //   },
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',  // 모든 출처에서 접근 허용
  //   }
  // },
})
