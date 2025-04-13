<script setup lang="ts">
import {  onMounted, ref } from 'vue'
import MapManager from '@/components/map/MapManager.ts'
import type MarkerModel from '@/components/map/marker/MarkerModel.ts'

const mapContainer = ref<HTMLElement | null>(null);
let mapManager:MapManager|null = null

const markerList = ref<MarkerModel[]>([])

const init = () => {
  if(mapContainer.value) {
    mapManager = new MapManager(mapContainer.value, markerList.value)
  } else {
    console.error("돔 생성 안됌")
  }
}

const getInstance = (): MapManager | null => {
    return mapManager
}

onMounted(()=> {
  init()
})

defineExpose({
  getInstance
})

</script>

<template>
  <div ref="mapContainer" style="width: 100%; height: 100%;"></div>
</template>

<style scoped lang="scss">
.map-container {
  width: 100%;
  height: 100%;
}



</style>
