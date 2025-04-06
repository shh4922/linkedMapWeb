<script setup lang="ts">
import {  useRouter } from 'vue-router'
import { pageType, usePageStore } from '@/store/usePageStore.ts'

const router = useRouter()

const moveToPage = (name: string) => {
  router.push({ name: name })
}

const pageStore = usePageStore()
</script>

<template>
  <div class="bottom-nav">
    <div class="nav-item" @click="pageStore.setCurrentPage(pageType.HOME)">
      <i class="pi pi-map" style="font-size: 2.5rem"></i>
    </div>
    <div class="nav-item" @click="pageStore.setCurrentPage(pageType.CATEGORY)">
      <i class="pi pi-list" style="font-size: 2.5rem"></i>
    </div>
    <div class="nav-item">
      <p>3</p>
    </div>
    <div class="nav-item" @click="moveToPage('mypage')">
      <i class="pi pi-user" style="font-size: 2.5rem"></i>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* 네비게이션 바 */
.bottom-nav {
  display: flex;
  height: 8%; /* 높이 설정 */
  border-top: 1px solid #ccc; /* 상단 구분선 */
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  background-color: gray;
  //z-index: 10;
  background-color: white;
}

/* 네비게이션 아이템 */
.nav-item {
  flex: 1; /* 동일한 크기로 나누기 */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 14px; /* 텍스트 크기 */
  color: #333; /* 텍스트 색상 */
}

/* 각 요소 구분선 */
.nav-item:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  height: 100%; /* 세로선의 길이 */
  width: 1px; /* 선 두께 */
  background-color: #ccc; /* 선 색상 */
}
</style>
