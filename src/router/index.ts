import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/page/Home.vue'
import Search from '@/page/Search.vue'
import CreateCategory from '@/components/bottomNav/views/CreateCategory.vue'
import KakaoLogin from '@/page/KakaoLogin.vue'
import Mainlayout from '@/layout/MainContainer.vue'
import MyPateView from '@/page/MyPateView.vue'
import NavigationContainer from '@/layout/NavigationContainer.vue'
import EditCategoryView from '@/page/EditCategoryView.vue'
import CategoryDetail from '@/page/CategoryDetail.vue'

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
    path: '/search',
    name: 'search',
    component: Search,
  },
  {
    path: '/navigationView',
    name: 'navigationView',
    component: NavigationContainer,
    children: [
      {
        path: 'editCategory',
        name: 'editCategory',
        component: EditCategoryView
      },
      {
        path: 'categoryDetail',
        name: 'categoryDetail',
        component: CategoryDetail,
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
