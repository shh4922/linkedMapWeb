<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import HomeSheetView from '@/components/bottomNav/views/HomeSheetView.vue'
import { pageType, usePageStore } from '@/store/usePageStore.ts'
import CreateCategory from '@/components/bottomNav/views/CreateCategory.vue'
import MyPageView from '@/components/bottomNav/views/MyPageView.vue'

const pageStore = usePageStore()

const translateY = ref(60); // 초기 위치: 1/4만 보이도록 설정 (80%)
let startY = 0;
let currentY = 60; // 현재 위치 초기값


const isPageOpen = computed(() => pageStore.getIsPageOpen)
const openSheet = () => {
  translateY.value = 60; // 초기 위치로 열기
  currentY = 60; // 현재 위치 업데이트
};

const closeSheet = () => {
  translateY.value = 100; // 닫을 때 아래로 내리기
};

const startDrag = (event: TouchEvent) => {
  event.stopPropagation(); // 이벤트 버블링 방지
  startY = event.touches[0].clientY;
};

const onDrag = (event: TouchEvent) => {
  event.stopPropagation(); // 이벤트 버블링 방지
  event.preventDefault();
  const deltaY = event.touches[0].clientY - startY;
  const newTranslateY = currentY + (deltaY / window.innerHeight) * 100;
  translateY.value = Math.min(Math.max(newTranslateY, 0), 100);
};


const endDrag = () => {
  if (translateY.value > 85) {
    closeSheet();
  } else if (translateY.value < 50) {
    translateY.value = 0; // 완전히 열림
  } else {
    translateY.value = 50; // 중간 위치
  }
  currentY = translateY.value;
};


onMounted(()=>{
  openSheet()
  console.log(pageStore.getCurrentPage)
})

watch( isPageOpen, (newValue)=> {
  if(!newValue){
    closeSheet()
  } else {
    openSheet()
  }
})
</script>

<template>

  <div
    class="bottom-sheet"
    @click.stop
    :style="{ transform: `translateY(${translateY}%)` }"
    @touchstart="startDrag"
    @touchmove="onDrag"
    @touchend="endDrag">

    <HomeSheetView v-if="pageStore.getCurrentPage === pageType.HOME" />
    <CreateCategory v-if="pageStore.getCurrentPage === pageType.CATEGORY"/>
    <MyPageView  v-if="pageStore.getCurrentPage === pageType.MY"/>

  </div>

</template>

<style scoped lang="scss">
.bottom-sheet {
  height: 80vh;
  background-color: white;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  touch-action: none; /* 터치 이벤트 방지 */
}
</style>
