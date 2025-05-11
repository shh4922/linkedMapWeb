<script setup lang="ts">
import Map from '@/components/map/Map.vue'
import CategoryMarkerCell from '@/components/cell/CategoryMarkerCell.vue'
import { onMounted, ref, watch } from 'vue'
import MarkerModel from '@/components/map/marker/MarkerModel.ts'
import { fetchMarkerList } from '@/api/marker/marker.ts'
import { useRoute } from 'vue-router'
import type { Marker } from '@/api/marker/marker.model.ts'
import { useFetchMarkerList } from '@/api/marker/marker.query.ts'

const route = useRoute()
const map = ref<InstanceType<typeof Map> | null>(null)

const {data: markerList} = useFetchMarkerList(route.params.roomId as string)




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


</script>

<template>
  <main>
    <Map class="map" ref="map" style="height: 50%; width: 100%" />
    <p v-if="markerList?.data.length ===0">마커가 없습니다.</p>

    <ul>
      <CategoryMarkerCell v-for="(marker) in markerList?.data" :key="marker.id" :marker="marker"/>
    </ul>
  </main>
</template>

<style scoped lang="scss">
main {
  width: 100%;
  height: 100%;

  .map {
    width: 100%;
    height: 50%;
  }
  .info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 0.5px solid lightgrey;
    text-align: center;
  }

  ul {

    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 400px;
    overflow-y: auto;
  }
}

</style>
