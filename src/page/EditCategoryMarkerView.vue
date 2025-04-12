<script setup lang="ts">
import Map from '@/components/map/Map.vue'
import CategoryMarkerCell from '@/components/cell/CategoryMarkerCell.vue'
import { onMounted, ref } from 'vue'
import MarkerModel from '@/components/map/marker/MarkerModel.ts'

const map = ref<InstanceType<typeof Map> | null>(null)

onMounted(() => {
  const marker = new MarkerModel( 126.9780, 37.5665)
  marker.setCustomOverlayMarker("test")
  map.value?.getInstance()?.onCreateMarker(marker)
})

</script>

<template>
  <main>
    <Map class="map" ref="map" style="height: 50%; width: 100%" />
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
    display: flex;
    flex-direction: column;
  }
}

</style>
