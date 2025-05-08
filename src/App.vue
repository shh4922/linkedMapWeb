<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { fetchMyInfo } from '@/api/user/user.ts'
import { useMyInfo } from '@/store/myInfoStore.ts'

const search = ref("")
const router = useRouter()

function moveToSearch() {
  router.push("/search")
}


</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-size: 10px;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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
