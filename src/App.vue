
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

  const setViewportHeight = () => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  setViewportHeight()

  // 뷰포트가 바뀌면 다시 계산 (주소창 접히거나 방향 전환 등)
  window.addEventListener('resize', setViewportHeight)
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
    <ToastMessage />
    <div class="main-container">
      <router-view />
    </div>
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

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  font-size: 10px;
  background-color: #fff;
  color: #333;
  overscroll-behavior: none;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  -webkit-text-size-adjust: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%; // 🔥 769px 제거
  max-width: 100%;
  margin: 0 auto;
  position: relative;
  padding: 0;
  /* 사용하는 곳에서 */


  height: calc(var(--vh, 1vh) * 100);
}

//main-container {
//  flex: 1; /* 남는 공간만 차지 */
//  max-height:calc(var(--vh, 1vh) * 100);
//  overflow: auto;
//}
.main-container {
  height: calc(var(--vh, 1vh) * 100);
  overflow: auto;

  // ✅ 스크롤 가려지지 않게
  //scroll-padding-bottom: 60px;

  // ✅ 하단바를 가리지 않도록 여백 확보
  //margin-bottom: 60px;

  // ❌ padding-bottom은 제거
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
