import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/page/Home.vue'
import Search from '@/page/Search.vue'
import CreateCategory from '@/page/CreateCategory.vue'
import KakaoLogin from '@/page/KakaoLogin.vue'
import Mainlayout from '@/layout/Mainlayout.vue'
import MyPateView from '@/page/MyPateView.vue'
import NavigationContainer from '@/layout/NavigationContainer.vue'
import EditCategoryView from '@/page/EditCategoryView.vue'

//라우트(routes) 정의 : URL 요청에 대해 어떤 페이지(컴포넌트)를 보여줄지에 대한 매핑정보를 정의
const routes = [
  {
    path: '/',
    component: Mainlayout,
    children: [

      {
        path: '',
        name: 'home',
        component: Home,
      },
      {
        path: 'my',
        name: 'mypage',
        component: MyPateView,
      },
    ]
  },


  {
    path: '/navigationView',
    name: 'navigationView',
    component: NavigationContainer,
    children: [
      {
        path: 'search',
        name: 'search',
        component: Search,
      },
      {
        path: 'editCategory',
        name: 'editCategory',
        component: EditCategoryView
      }
    ]
  }
  // {
  //   path: '/createCategory',
  //   name: 'createCategory',
  //   component: CreateCategory,
  // },
  // {
  //   path: '/auth/kakao',
  //   name: 'kakaoLogin',
  //   component: KakaoLogin,
  // },
];
const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
