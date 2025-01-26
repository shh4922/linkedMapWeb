<script setup lang="ts">
import {  ref } from 'vue'
import { useRouter } from 'vue-router'
const search = ref("")
const router = useRouter()

function moveToSearch() {
  router.push("/search")
}



</script>

<template>
  <header>
    <input class="search-container" value="text" v-model="search" placeholder="위치를 검색하세요" @click="moveToSearch"/>
  </header>
</template>

<style scoped>
header {
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
