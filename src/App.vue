
<script setup lang="ts">

import { onMounted} from 'vue'
import { fetchMyInfo } from '@/api/user/user.ts'
import { useMyInfo } from '@/store/myInfoStore.ts'

// CropperJS의 CSS를 전역으로 한 번만 로드
import 'cropperjs/dist/cropper.css'
import ToastMessage from '@/components/error/ToastMessage.vue'

const myInfoStore = useMyInfo()


onMounted(()=> {
  getMyInfo()
})

/**
 * 내정보 패치후 스토어에 저장
 * 새로고침시, 스토어 초기화 되서 이렇게해둠.
 */
const getMyInfo = async () => {
  if(localStorage.getItem('accessToken') === null || localStorage.getItem('accessToken') === undefined) return
  const res = await fetchMyInfo()

  if(res.data) {
    myInfoStore.setMyInfo(res.data)
  }

}

</script>

<template>
  <div id="app">
    <!--  전역 toastMessage  -->
    <ToastMessage />
    <router-view />
  </div>
</template>

<style lang="scss">


/* 혹은 다크모드 미디어쿼리 내부에서 덮어쓰기 */
@media (prefers-color-scheme: dark) {
  html, body {
    background-color: #fff !important;
    color: #333 !important;
  }
  /* 필요하다면 더 구체적인 컴포넌트 셀렉터에도 !important 로 덮어쓰세요 */
}


html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-size: 10px;

  /* 여러분이 쓰시는 배경/텍스트 색상으로 바꿔주세요 */
  background-color: #fff !important;
  color: #333 !important;
  /* 라이트 모드만 쓰겠다고 선언 */
  color-scheme: light !important;
}

//body {
//  padding-top: constant(safe-area-inset-top);    /* 구버전 iOS */
//  padding-top: env(safe-area-inset-top);         /* 최신 브라우저 */
//  padding-bottom: constant(safe-area-inset-bottom);
//  padding-bottom: env(safe-area-inset-bottom);
//}


#app {
  display: flex;
  flex-direction: column;
  //- env(safe-area-inset-bottom)
  //- env(safe-area-inset-top)
  //height: calc(100vh - 50px );
  min-height: calc(100vh - 50px );
  overflow-y: auto;
  margin: 0 auto;
  width: 769px; /* 데스크탑 기준의 고정 너비 */
  position: relative;
}

input {
  border: none;
}

button {
  border: none
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

@font-face {
  font-family:'nanum-1';
  src: url('@/assets/font/NanumSquareNeo-aLt.ttf') format('truetype');
}
@font-face {
  font-family:'nanum-2';
  src: url('@/assets/font/NanumSquareNeo-bRg.ttf') format('truetype');
}
@font-face {
  font-family:'nanum-3';
  src: url('@/assets/font/NanumSquareNeo-cBd.ttf') format('truetype');
}
@font-face {
  font-family:'nanum-4';
  src: url('@/assets/font/NanumSquareNeo-dEb.ttf') format('truetype');
}
@font-face {
  font-family:'nanum-5';
  src: url('@/assets/font/NanumSquareNeo-eHv.ttf') format('truetype');
}


/* 모바일 화면에서 width를 100%로 조정 */
@media screen and (max-width: 768px) {
  #app {
    width: 100%; /* 모바일에서 너비를 100%로 조정 */
    margin: 0;

  }
}

</style>
