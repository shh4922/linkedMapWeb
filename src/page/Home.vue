<script setup lang="ts">
import router from '@/router'
import { computed, onMounted, ref, watch } from 'vue'
import Map from '@/components/map/Map.vue'
import { useToggleRoomStore } from '@/store/useToggleRoomStore.ts'
import MarkerModel from '@/components/map/marker/MarkerModel.ts'
import type { Marker } from '@/api/marker/marker.model.ts'
import { useMarkserListStore } from '@/store/useMarkserListStore.ts'
import { useCurrentPosition } from '@/store/useCurrentPosition.ts'
import type { LatLng } from '@/components/map/LatLng.ts'
import { pageType, usePageStore } from '@/store/usePageStore.ts'

const pageStore = usePageStore()
const map = ref<InstanceType<typeof Map> | null>(null)
const isAnimating = ref(false)
const roomStore = useToggleRoomStore()

const markerListStore = useMarkserListStore()

const currentPositionStore = useCurrentPosition()

const checkedRoomList = computed<string[]>(
  () =>
    Object.entries(roomStore.isCheckedMap)
      .filter(([_, checked]) => checked) // 1) filter: [id, checked] 형태의 각 항목에서 checked === true 만
      .map(([id]) => id), // 2) map: 앞에 있던 [id, checked] 중 id(문자열)만 꺼내 배열로!
)

onMounted(() => {
  init()
  if (currentPositionStore.position !== null) {
    onChangeMyPosition(currentPositionStore.position)
  }
})

/** 새로운 lat, lng 받아오면 위치 업데이트*/
watch(
  () => currentPositionStore.position,
  (newPosition) => {
    onChangeMyPosition(newPosition)
  },
)

/** 사용자 보는 방향 변경시 위치 업데이트. 그런데 기능완성 안됌. 테스트를 못함*/
watch(
  () => currentPositionStore.heading,
  (h) => {
    console.log('방향변경', h, typeof h)
  },
)

watch(checkedRoomList, async (newValue, oldValue) => {
  // 기존에 있던거에서 제거할 방 id
  const clear = oldValue.filter((roomId) => !newValue.includes(roomId))
  const add = newValue.filter((roomId) => !oldValue.includes(roomId))

  // 마커 삭제
  clear.forEach((roomId) => {
    map.value?.getInstance()?.onDeleteMarkerListByRoomId(Number(roomId))
  })

  for (const roomId of add) {
    // fetchOnce: 캐시 없으면 API 호출, 있으면 바로 반환
    const markers = await markerListStore.fetchOnce(roomId)

    createMarkerList(markers)
  }
})

watch(
  () => markerListStore.selectedMarker,
  (newValue) => {
    if (newValue === null) {
      map.value?.getInstance()?.onSetZoomLevel(13)
      return
    }
    const latlng: LatLng = {
      lat: newValue?.lat ?? 0,
      lng: newValue?.lng ?? 0,
    }
    map.value?.getInstance()?.onSetZoomLevel(3)
    map.value?.getInstance()?.onSetPosition(latlng)
  },
)

const init = async () => {
  // pageStore.setCurrentPage(pageType.HOME)
  // pageStore.toggleSheetView(true)
  for (const roomId of checkedRoomList.value) {
    const markers = await markerListStore.fetchOnce(roomId)
    createMarkerList(markers)
  }
}

const onChangeMyPosition = (position: any) => {
  const myMarker = map.value?.getInstance()?.onFindMarker('my')
  if (myMarker === null) {
    const my = new MarkerModel('my', position.lng, position.lat, -1)
    my.setCurrentMyPosition(90)
    map.value?.getInstance()?.onCreateMarker(my)
  } else {
    if (myMarker === undefined) return
    myMarker.lng = position.lng
    myMarker.lat = position.lat

    map.value?.getInstance()?.onUpdateMarker(myMarker)
  }
}

const createMarkerList = (markerList: Marker[]) => {
  markerList.forEach((marker) => {
    const markerModel = new MarkerModel(
      marker.id.toString(),
      marker.lng,
      marker.lat,
      Number(marker.roomId),
    )
    markerModel.setCustomOverlayMarker(marker.title)
    map.value?.getInstance()?.onCreateMarker(markerModel)
  })
}

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
      <input
        class="search-container"
        placeholder="위치를 검색하여 마커를 추가해보세요"
        @click="moveToSearch"
      />
    </div>
    <!--  <i class="pi pi-users" :class="isShowRoomModal ? 'active' : '' " @click="toggleRoomModal" ></i>-->
    <!--  <i class="pi pi-map-marker" @click="currentPositionStore.start()"></i>-->

    <Map class="map" ref="map" style="width: 100%; height: 100vh" />
  </main>
</template>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 100vh;
}

i {
  z-index: 10;
  position: absolute;
  top: 130px;
  right: 20px;
  background-color: white;
  font-size: 1.5rem;
  padding: 1rem;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  cursor: pointer;
  color: coral; /* 아이콘 색은 메인 톤으로 */
}
.pi-map-marker {
  top: 140px;
}
.pi-users {
  top: 140px;
}
.pi-users.active {
  color: blue;
  font-weight: bold;
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
  border: 2px solid coral;

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
