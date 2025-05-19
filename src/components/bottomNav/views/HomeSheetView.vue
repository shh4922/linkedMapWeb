<script setup lang="ts">
import { computed } from 'vue'

import { useToggleRoomStore } from '@/store/useToggleRoomStore.ts'
import { useMarkserListStore } from '@/store/useMarkserListStore.ts'
import HomeMarkerCell from '@/components/cell/HomeMarkerCell.vue'

const markerListStore = useMarkserListStore()
const roomStore = useToggleRoomStore()

const checkedRoomList = computed<string[]>(() =>
  Object.entries(roomStore.isCheckedMap)
    .filter(([_, checked]) => checked)  // 1) filter: [id, checked] 형태의 각 항목에서 checked === true 만
    .map(([id]) => id)                  // 2) map: 앞에 있던 [id, checked] 중 id(문자열)만 꺼내 배열로!
)


const currentMarkers = computed(() =>
  // 방별 마커 배열을 꺼내서 한 번에 합칩니다.
  checkedRoomList.value.flatMap(roomId =>
    markerListStore.markerListByRoomId[roomId] ?? []
  )
)


</script>

<template>
  <div class="container">
    <p v-if="currentMarkers.length === 0">선택된 그룹이 없슴</p>
    <p class="markerList" v-else v-for="(marker,index) in currentMarkers" :key="marker !== null ? marker.id : index">
      <HomeMarkerCell :marker="marker" :selected-marker="null" />
    </p>
  </div>
</template>

<style scoped lang="scss">
.container {
  max-height: 350px;
  overflow-y: auto;   /* 내용이 넘치면 세로 스크롤 */
  padding-right: 0.5rem; /* 스크롤바 너비 여유 */
  padding: 1rem;

  /* optional: 스크롤바 스타일 */
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
  padding-bottom: 60px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
}

.markerList {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

</style>
