<script setup lang="ts">
import {  ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useFetchMarkerList } from '@/api/marker/marker.query.ts'
import Map from '@/components/map/Map.vue'
import RoomMarkerCell from '@/components/cell/RoomMarkerCell.vue'
import MarkerModel from '@/components/map/marker/MarkerModel.ts'
import type { Marker } from '@/api/marker/marker.model.ts'
import type { LatLng } from '@/components/map/LatLng.ts'

const route = useRoute()
const map = ref<InstanceType<typeof Map> | null>(null)

const {data: markerListResponse, refetch} = useFetchMarkerList(route.params.roomId as string)
const markerList = ref<Marker[]|null>(null)
const selectMarker = ref<number | null>(null)

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

/** 특정 마커를 선택 했을떄 이벤트 */
const onSelectMarker = (marker: Marker) => {
  if(selectMarker.value === marker.id) {
    selectMarker.value = null
  } else {
    selectMarker.value = marker.id
  }

  const latlng : LatLng = {
    lat: marker.lat,
    lng: marker.lng
  }
  map.value?.getInstance()?.onSetPosition(latlng)
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
                      :selected-marker="selectMarker"
                      @select-marker="onSelectMarker"
                      @deleteMarker="onDeleteMarker"
      />
    </ul>
  </main>
</template>

<style scoped lang="scss">
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
    color: coral;                   // 텍스트는 화이트
    //background-color: ;        // 코랄 배경
    //border: 1px solid coral;        // 코랄 테두리
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
