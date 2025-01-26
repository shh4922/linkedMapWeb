import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/page/Home.vue'
import Search from '@/page/Search.vue'

//라우트(routes) 정의 : URL 요청에 대해 어떤 페이지(컴포넌트)를 보여줄지에 대한 매핑정보를 정의
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
  },
];
const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
