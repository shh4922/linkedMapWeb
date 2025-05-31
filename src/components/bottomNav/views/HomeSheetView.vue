<script setup lang="ts">
import { computed, watch } from 'vue'

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


watch(checkedRoomList.value, (newCheckedRooms) => {
  // 선택된 그룹이 변경되면 마커 리스트를 초기화합니다.
  console.log(newCheckedRooms)
})

watch(currentMarkers.value, (newMarkers) => {
  // 현재 마커 리스트가 변경되면 필요한 작업을 수행합니다.
  console.log(newMarkers)
})

</script>

<template>
  <div class="container">

    <div class="header">
      <p>선택한 그룹의 마커 리스트</p>
      <router-link :to="{name:'createRoom'}">그룹 생성하기</router-link>
    </div>

    <!-- ‘선택된 그룹이 없슴’ 메시지 -->
    <p v-if="checkedRoomList.length === 0" class="empty-message">
      선택된 그룹이 없습니다.
    </p>

    <!-- ‘마커가 없습니다.’ 메시지 -->
    <p v-else-if="currentMarkers.length === 0" class="empty-message">
      마커가 없습니다.
    </p>

    <!-- 마커 리스트 -->
    <div v-else class="marker-list">
      <HomeMarkerCell
        v-for="marker in currentMarkers"
        :key="marker.id"
        :marker="marker"
        :selected-marker="null"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  font-family: "nanum-5";
  max-height: 350px;
  overflow-y: auto;     /* 내용이 넘치면 세로 스크롤 */
  padding: 1rem 0.5rem;
  padding-bottom: 60px; /* 하단 여유 */

  /* 얇고 깔끔한 스크롤바 */
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;

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
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  font-family: nanum-5;
  font-size: 1rem;
  color: #333;

  p {
    margin: 0;
    font-weight: bold;
  }

  a {
    color: #ff774d; /* 링크 색상 */
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline; /* 호버 시 밑줄 */
    }
  }
}

/* 빈 상태 메시지 공통 스타일 */
.empty-message {
  width: 100%;
  padding: 2rem 1rem;
  margin: 0 auto;
  text-align: center;
  font-family: nanum-5;
  font-size: 1rem;
  color: #888;
  border-radius: 0.5rem;
  font-style: italic;
}

/* 마커 리스트가 존재할 때 wrapper */
.marker-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
