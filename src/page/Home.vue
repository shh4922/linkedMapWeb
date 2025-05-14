<script setup lang="ts">

import router from '@/router'
  import { ref, watch } from 'vue'
  import Map from '@/components/map/Map.vue'
  import { useToggleRoomStore } from '@/store/useToggleRoomStore.ts'
import { useFetchMarkerList } from '@/api/marker/marker.query.ts'
import MarkerModel from '@/components/map/marker/MarkerModel.ts'

const map = ref<InstanceType<typeof Map> | null>(null)
const isAnimating = ref(false)
const roomStore = useToggleRoomStore()

const checkedRoomId = ref<string | null>(null)
const {data: markerListRes, refetch} = useFetchMarkerList(checkedRoomId)

watch(()=> roomStore.changedRoomId, (newValue)=> {
  if(newValue?.checked) {
    checkedRoomId.value = newValue.roomId.toString()
    refetch()
  } else {
    if(newValue?.roomId === undefined) return
    map.value?.getInstance()?.onDeleteMarkerListByRoomId(newValue.roomId)
  }
})



watch(()=> markerListRes?.value?.data, (newValue) => {
  if (!newValue) return
  newValue.forEach((marker) => {
    const markerModel = new MarkerModel(marker.id.toString(), marker.lng, marker.lat, Number(checkedRoomId.value))
    markerModel.setCustomOverlayMarker(marker.title)
    map.value?.getInstance()?.onCreateMarker(markerModel)
  })

}, { immediate: true })


const moveToSearch = () => {
  isAnimating.value = true
  setTimeout(() => {
    router.push({ name: 'search' })
  }, 300) // 애니메이션 시간 후 이동
}

</script>

<template>
<main>
  <div class="input-box" :class="{ animate: isAnimating }">
    <input class="search-container" placeholder="위치를 검색하세요" @click="moveToSearch"/>
  </div>
  <Map class="map" ref="map" style="width: 100%; height: 100vh"/>
</main>


</template>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 100vh;
}
.input-box {
  position: absolute; /* 지도 위에 고정 */
  top: 5%; /* 상단 여백 */
  left: 50%; /* 가로 중앙 정렬 */
  transform: translateX(-50%); /* 중앙 정렬 보정 */
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9); /* 반투명 배경 */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
  border-radius: 8px;
  z-index: 2; /* 지도 위에 표시되도록 z-index 설정 */
  width: 80%;
  height: 6%;
  transition: all 1s ease;

  &.animate {
    top: -10%; // 위로 사라지듯 올라감
    opacity: 0;
  }

  .search-container {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    font-size: 1.2rem;
    border-radius: 8px;
  }
}
</style>

