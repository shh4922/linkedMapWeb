<script setup lang="ts">

import BottomNavBar from '@/components/BottomNavBar.vue'

import BottomSheetContainer from '@/components/bottomNav/BottomSheetContainer.vue'
import RoomListModal from '@/components/modal/RoomListModal.vue'
import { ref } from 'vue'
import { useBackgroundBlur } from '@/store/useBackgroundBlur.ts'

const blur = useBackgroundBlur()

</script>


<template>
  <div class="main-container">
    <router-view/>
    <BottomSheetContainer class="sheetContainer" />
    <BottomNavBar class="sheetNavBar" />

    <div v-if="blur.isShowBlur" @click="blur.toggleBlur(false)" class="modal-overlay" />
    <RoomListModal
      class="roomListModal"
      v-if="blur.isShowBlur"
      @close="()=>{blur.toggleBlur(false)}" />
  </div>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4); // 회색 배경
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
  pointer-events: auto; // 모달 쪽은 이벤트 다시 활성화
}
.roomListModal {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 5;
  transform: translate(-50%, -50%);
}
.main-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden; // ← 메인컨테이너 넘어가는 부분은 hidden, sheetContainer 때문에 넣음

  .sheetContainer {
    position: absolute;
    bottom: 0;
    z-index: 2;
    width: 100%;
    overflow: hidden;
  }

  .sheetNavBar {
    position: absolute;
    bottom: 0;
    z-index: 3;
    width: 100%;
  }
}

</style>
