<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const search = ref("")
const router = useRouter()

function moveToSearch() {
  router.push("/search")
}

</script>

<template>
  <div id="app">
    <div class="input-box">
      <input class="search-container" value="text" v-model="search" placeholder="위치를 검색하세요" @click="moveToSearch"/>
    </div>
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
  //background-color: #181818;
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
/* 모바일 화면에서 width를 100%로 조정 */
@media screen and (max-width: 768px) {
  #app {
    width: 100%; /* 모바일에서 너비를 100%로 조정 */
    margin: 0;

  }
}

.input-box {
  position: absolute; /* 지도 위에 고정 */
  top: 10px; /* 상단 여백 */
  left: 50%; /* 가로 중앙 정렬 */
  transform: translateX(-50%); /* 중앙 정렬 보정 */
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9); /* 반투명 배경 */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
  border-radius: 8px;
  z-index: 2; /* 지도 위에 표시되도록 z-index 설정 */
  width: 80%;
  height: 7%;
;
}

.search-container {
  width: 100%;
  height: 100%;
  padding: 0 10px;
  font-size: 16px;
}
</style>
