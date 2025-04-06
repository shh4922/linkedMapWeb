<script setup lang="ts">

import BottomNavBar from '@/components/BottomNavBar.vue'

import BottomSheetContainer from '@/layout/BottomSheetContainer.vue'


</script>


<template>
  <div class="main-container">
    <router-view/>
    <BottomSheetContainer class="sheetContainer" />
    <BottomNavBar class="sheetNavBar" />
  </div>
</template>

<style scoped lang="scss">
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
