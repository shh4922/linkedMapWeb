<script setup lang="ts">
import {  ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useFetchMarkerList } from '@/api/marker/marker.query.ts'
import Map from '@/components/map/Map.vue'
import RoomMarkerCell from '@/components/cell/RoomMarkerCell.vue'
import MarkerModel from '@/components/map/marker/MarkerModel.ts'
import type { Marker } from '@/api/marker/marker.model.ts'
import type { LatLng } from '@/components/map/LatLng.ts'
import EditMarkerModal from '@/components/modal/EditMarkerModal.vue'


const route = useRoute()
const map = ref<InstanceType<typeof Map> | null>(null)

const {data: markerListResponse, refetch, isError} = useFetchMarkerList(route.params.roomId as string)

const markerList = ref<Marker[]|null>(null)
const selectMarker = ref<Marker | null>(null)
const isShowEditMarker = ref(false)

watch(isError, (newValue) => {
  alert("마커를 불러오는 중 오류가 발생했습니다.")
})

watch(() => markerListResponse?.value?.data, (newValue) => {
  if (!newValue) return
    markerList.value = newValue
  },
  { immediate: true }  // 이미 로딩되어 있으면 즉시 실행
)

watch(
  [markerList, map],
  ([list, mapInstance]) => {
    if (!list || !mapInstance) return
    list.forEach((marker) => {
      const markerModel = new MarkerModel(marker.id.toString(), marker.lng, marker.lat, marker.roomId)
      markerModel.setCustomOverlayMarker(marker.title)
      map.value?.getInstance()?.onCreateMarker(markerModel)
    })
  },
  { immediate: true }
)

watch(() => selectMarker.value, (newValue) => {
  if(newValue === null) return

  const latlng : LatLng = {
    lat: newValue.lat,
    lng: newValue.lng
  }
  map.value?.getInstance()?.onSetZoomLevel(3)
  map.value?.getInstance()?.onSetPosition(latlng)
})

/** 특정 마커를 선택 했을떄 이벤트 */
const onSelectMarker = (marker: Marker) => {
  if(selectMarker.value?.id === marker.id) {
    selectMarker.value = null
    map.value?.getInstance()?.onSetZoomLevel(13)
    return
  } else {
    selectMarker.value = marker
  }
}

/** 마커 삭제 이벤트 */
const onDeleteMarker = (markerId: number) => {

  if(markerList.value === null) { return }

  const findMarkerIndex = markerList?.value?.findIndex((marker)=> marker.id === markerId)
  if(findMarkerIndex === -1 || findMarkerIndex === undefined) return

  markerList.value = markerList.value.filter(m => m.id !== markerId)
  map.value?.getInstance()?.onDeleteMarker(markerId.toString())
  selectMarker.value = null
  refetch()
}

const onToggleEditMarker = (isShow:boolean, marker: Marker|null=null) => {
  if(marker) {
    selectMarker.value = marker
  }
  isShowEditMarker.value = isShow
}
</script>

<template>
  <main>
    <Map class="map" ref="map" style="height: 40%; width: 100%" />

    <div class="empty-message" v-if="(markerList?.length === 0)">
      <p>“아직 표시된 장소가 없어요. </p>
      <p><router-link :to="{name:'search'}">여기 </router-link>를 눌러서 마커를 추가해 보세요!”</p>
    </div>


    <ul>
      <RoomMarkerCell v-for="(marker) in markerList"
                      :key="marker.id"
                      :marker="marker"
                      :selected-marker="selectMarker?.id ?? 0"
                      @select-marker="onSelectMarker"
                      @deleteMarker="onDeleteMarker"
                      @toggleEditMarker="onToggleEditMarker"
      />
    </ul>

    <div v-if="isShowEditMarker" class="overlay"></div>
    <EditMarkerModal v-if="isShowEditMarker && selectMarker"
                     :marker-info="selectMarker"
                     @closeEditMarkerModal="onToggleEditMarker"
                     class="editMarkerModal" />
  </main>
</template>

<style scoped lang="scss">
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.2);
  backdrop-filter: blur(2px);
  z-index: 10;
}

.editMarkerModal {
  position: fixed;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  z-index: 11;
}


main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;

  .map {
    width: 100%;
    height: 40%;
  }
  /* 빈 상태 메시지 */
  .empty-message {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    font-family: nanum-4;
    font-size: 1.3rem;
    color: coral;
    border-radius: 0.5rem;
    font-style: italic;
    text-align: center;
  }

  ul {
    flex: 1;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}

</style>
