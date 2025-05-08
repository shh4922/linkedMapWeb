<script setup lang="ts">
import Map from '@/components/map/Map.vue'
import CategoryMarkerCell from '@/components/cell/CategoryMarkerCell.vue'
import { onMounted, ref } from 'vue'
import MarkerModel from '@/components/map/marker/MarkerModel.ts'
import { fetchMarkerList } from '@/api/marker/marker.ts'
import { useRoute } from 'vue-router'

const route = useRoute()
const map = ref<InstanceType<typeof Map> | null>(null)
onMounted(() => {
  const marker = new MarkerModel( "1", 126.9780, 37.5665)
  marker.setCustomOverlayMarker("test")
  map.value?.getInstance()?.onCreateMarker(marker)
  console.log(route.params.roomId)
  getMarkerList()
})
const deleteMarker = () => {
  map.value?.getInstance()?.onDeleteMarker("1")
}

const getMarkerList = async () => {
  const res =  await fetchMarkerList(route.params.roomId as string)
  console.log("res",res)
}

</script>

<template>
  <main>
    <Map class="map" ref="map" style="height: 50%; width: 100%" />
    <button @click="deleteMarker">delete</button>
    <ul>
      <CategoryMarkerCell />
      <CategoryMarkerCell />
      <CategoryMarkerCell />
      <CategoryMarkerCell />
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
