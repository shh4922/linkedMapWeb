<script setup lang="ts">
import { createApp, onMounted, ref } from 'vue'

import MapManager from '@/components/map/MapManager.ts'
import type MarkerModel from '@/components/map/marker/MarkerModel.ts'

const mapContainer = ref<HTMLElement | null>(null);
let mapManager:MapManager|null = null

const markerList = ref<MarkerModel[]>([])

const init = () => {
  if(mapContainer.value) {
    mapManager = new MapManager(mapContainer.value)
  } else {
    console.error("돔 생성 안됌")
  }
}

// const initMap = () => {
//   const script = document.createElement('script')
//   script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=8a56cffbdb88cac49b532e32cf48731d&autoload=false`
//   document.head.appendChild(script)
//
//
//
//   script.onload = () => {
//     window.kakao.maps.load(() => {
//       if (mapContainer.value) {
//         const options = {
//           center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도 중심 좌표
//           level: 29, // 지도 확대 레벨
//           maxLevel: 13, // 지도 축소 제한 레벨
//         }
//         // 지도 생성
//         mapInstance = new window.kakao.maps.Map(mapContainer.value, options)
//
//         // 1. 제한할 지도 영역 설정 (예: 대한민국 영역)
//         const bounds = new window.kakao.maps.LatLngBounds(
//           new window.kakao.maps.LatLng(33.0, 124.0), // 남서쪽 좌표
//           new window.kakao.maps.LatLng(38.6, 131.0)  // 북동쪽 좌표
//         )
//
//         // 2. 지도에 영역 제한 설정
//         // mapInstance.setMaxBounds(bounds)
//       }
//     });
//   }
// }

// const onCreateMarker = (markerModel: MarkerModel) => {
//   const container = document.createElement('div')
//   const app = createApp(CustomOverlayMarker, {name: markerModel.name})
//   app.mount(container)
//   if (!mapContainer.value) {
//     console.warn("지도가 아직 초기화되지 않았습니다.")
//     return;
//   }
//   new kakao.maps.CustomOverlay({
//     position: new kakao.maps.LatLng(markerModel.lat, markerModel.lng),
//     content: container,
//     map: mapContainer.value
//   })
// }

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
