<script setup lang="ts">
import Map from '@/components/Map.vue'
import BottomNavBar from '@/components/BottomNavBar.vue'
import { ref } from 'vue'
import BottomCategory from '@/bottomNav/BottomCategory.vue'

const translateY = ref(60); // 초기 위치: 1/4만 보이도록 설정 (80%)
let startY = 0;
let currentY = 60; // 현재 위치 초기값

const openSheet = () => {
  translateY.value = 60; // 초기 위치로 열기
  currentY = 60; // 현재 위치 업데이트
};

const closeSheet = () => {
  translateY.value = 100; // 닫을 때 아래로 내리기
  setTimeout(() => {
    isHomeOpen.value = ""; // 닫기 애니메이션 후 숨김 처리
  }, 300);
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

const isHomeOpen = ref("");

function toggleBottomSheet(sheetName: string) {
  if (isHomeOpen.value === sheetName) {
    closeSheet();
  } else {
    isHomeOpen.value = sheetName;
    openSheet();
  }
}
</script>

<template>
  <div id="app">
    <Map />
    <!-- Bottom Sheet -->
    <div v-if="isHomeOpen === 'home'" class="overlay" @click="closeSheet">
<!--      <BottomCategory />-->
      <div
        class="bottom-sheet"
        @click.stop
        :style="{ transform: `translateY(${translateY}%)` }"
        @touchstart="startDrag"
        @touchmove="onDrag"
        @touchend="endDrag"
      >
        <BottomCategory/>
      </div>
    </div>
    <BottomNavBar @toggle-sheet="toggleBottomSheet" />
  </div>
</template>

<style scoped>
/* 오버레이 배경 */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000; /* 다른 요소 위에 오도록 z-index 설정 */
  touch-action: none; /* 터치 이벤트 방지 */
}

/* Bottom Sheet 스타일 */
.bottom-sheet {
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 20px 20px 0 0;
  padding: 16px;
  position: absolute;
  bottom: 0;
  transition: transform 0.3s ease-out;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  height: 80vh; /* 화면 높이의 80%로 설정 */
  touch-action: none; /* 터치 이벤트 방지 */
}

/* 드래그 핸들 */
.drag-bar {
  width: 40px;
  height: 5px;
  background: #ccc;
  border-radius: 10px;
  margin: 0 auto 10px;
}

/* 헤더 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 닫기 버튼 */
.header button {
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
}
</style>
