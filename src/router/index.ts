import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw
} from 'vue-router'

import Home from '@/page/Home.vue'
import Search from '@/page/Search.vue'

import Mainlayout from '@/layout/MainContainer.vue'

import NavigationContainer from '@/layout/NavigationContainer.vue'
import EditRoomView from '@/page/EditRoomView.vue'
import RoomDetail from '@/page/RoomDetail.vue'
import EditRoomMarkerView from '@/page/EditRoomMarkerView.vue'
import LoginView from '@/page/LoginView.vue'
import RegisterView from '@/page/RegisterView.vue'
import MyPageView from '@/components/bottomNav/views/MyPageView.vue'
import CreateRoom from '@/components/bottomNav/views/CreateRoom.vue'
import Invite from '@/page/Invite.vue'

//라우트(routes) 정의 : URL 요청에 대해 어떤 페이지(컴포넌트)를 보여줄지에 대한 매핑정보를 정의
const routes:  Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    component: Mainlayout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
      },

    ]
  },

  {
    path: '/search',
    name: 'search',
    component: Search,
  },
  {
    path: '/invite/:roomId/:key',
    name: 'invite',
    component: Invite
  },
  {
    path: '/navigationView',
    name: 'navigationView',
    component: NavigationContainer,
    children: [
      {
        path: 'roomDetail/:roomId',
        name: 'roomDetail',
        component: RoomDetail,
        props: true
      },
      {
        path: 'editCategory',
        name: 'editCategory',
        component: EditRoomView
      },
      {
        path: 'createRoom',
        name: 'createRoom',
        component: CreateRoom
      },
      {
        path: 'editRoomMarker/:roomId',
        name: 'editRoomMarker',
        component: EditRoomMarkerView
      },
      {
        path: 'login',
        name: 'login',
        component: LoginView,
        beforeEnter: (to, from, next) => {
          const isAuthenticated = false; // TODO: 실제 로그인 확인 로직으로 변경하기

          if (isAuthenticated) {
            next({ name: "home" });
          } else {
            next();
          }
        }
      },
      {
        path: 'register',
        name: 'register',
        component: RegisterView
      },
      {
        path: 'my',
        name: 'mypage',
        component: MyPageView,
      },
    ]
  }

];
const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
