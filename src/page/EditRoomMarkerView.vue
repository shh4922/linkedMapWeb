<script setup lang="ts">
import Map from '@/components/map/Map.vue'
import CategoryMarkerCell from '@/components/cell/CategoryMarkerCell.vue'
import { onMounted, ref, watch } from 'vue'
import MarkerModel from '@/components/map/marker/MarkerModel.ts'
import { fetchMarkerList } from '@/api/marker/marker.ts'
import { useRoute } from 'vue-router'
import type { Marker } from '@/api/marker/marker.model.ts'
import { useFetchMarkerList } from '@/api/marker/marker.query.ts'
import type { LatLng } from '@/components/map/LatLng.ts'

const route = useRoute()
const map = ref<InstanceType<typeof Map> | null>(null)

const {data: markerList} = useFetchMarkerList(route.params.roomId as string)
const selectMarker = ref<number | null>(null)

watch(() => markerList?.value?.data, (newMarkers) => {
  if (!newMarkers || !map.value) return
  newMarkers.forEach((marker) => {
    const markerModel = new MarkerModel(marker.id.toString(), marker.lng, marker.lat)
    markerModel.setCustomOverlayMarker(marker.title)
    map.value?.getInstance()?.onCreateMarker(markerModel)
  })
  },
  { immediate: true }  // 이미 로딩되어 있으면 즉시 실행
)

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

</script>

<template>
  <main>
    <Map class="map" ref="map" style="height: 40%; width: 100%" />
    <p v-if="markerList?.data.length ===0">마커가 없습니다.</p>

    <ul>
      <CategoryMarkerCell v-for="(marker) in markerList?.data"
                          :key="marker.id"
                          :marker="marker"
                          :selected-marker="selectMarker"
                          @select-marker="onSelectMarker" />
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
