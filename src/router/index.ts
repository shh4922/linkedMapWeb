import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/page/Home.vue'
import Search from '@/page/Search.vue'

import Mainlayout from '@/layout/MainContainer.vue'
import MyPateView from '@/page/MyPateView.vue'
import NavigationContainer from '@/layout/NavigationContainer.vue'
import EditCategoryView from '@/page/EditCategoryView.vue'
import CategoryDetail from '@/page/CategoryDetail.vue'
import EditCategoryMarkerView from '@/page/EditCategoryMarkerView.vue'
import LoginView from '@/page/LoginView.vue'
import RegisterView from '@/page/RegisterView.vue'

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
        path: 'categoryDetail',
        name: 'categoryDetail',
        component: CategoryDetail,
      },
      {
        path: 'editCategory',
        name: 'editCategory',
        component: EditCategoryView
      },
      {
        path: 'editCategoryMarker',
        name: 'editCategoryMarker',
        component: EditCategoryMarkerView
      },
      {
        path: 'login',
        name: 'login',
        component: LoginView
      },
      {
        path: 'register',
        name: 'register',
        component: RegisterView
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
