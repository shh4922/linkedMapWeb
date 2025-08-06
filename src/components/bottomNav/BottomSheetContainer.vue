<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import HomeSheetView from '@/components/bottomNav/views/HomeSheetView.vue'
import { pageType, usePageStore } from '@/store/usePageStore.ts'

const pageStore = usePageStore()

const translateY = ref(pageStore.getIsPageOpen ? 60 : 100) // 초기 위치: 1/4만 보이도록 설정 (80%)

const isPageOpen = computed(() => pageStore.getIsPageOpen)
const openSheet = () => {
  translateY.value = 60 // 초기 위치로 열기
}

const closeSheet = () => {
  translateY.value = 100 // 닫을 때 아래로 내리기
}

onMounted(() => {
  pageStore.setCurrentPage(pageType.MY)
  if (pageStore.getIsPageOpen && pageStore.currentPage === pageType.HOME) {
    openSheet()
  }
})

watch(isPageOpen, (newValue) => {
  if (!newValue) {
    closeSheet()
  } else {
    openSheet()
  }
})
</script>

<template>
  <div class="bottom-sheet" @click.stop :style="{ transform: `translateY(${translateY}%)` }">
    <!-- 페이지 내용은 자유롭게 스크롤 -->
    <div class="sheet-content">
      <HomeSheetView />
    </div>
  </div>
</template>

<style scoped lang="scss">
.bottom-sheet {
  height: calc(var(--vh, 1vh) * 80);
  background-color: white;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  touch-action: none;
}
</style>
