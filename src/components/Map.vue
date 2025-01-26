<script setup lang="ts">
import { onMounted, ref } from 'vue'
const mapContainer = ref<HTMLDivElement | null>(null) // 타입 명시

let mapInstance: any // Kakao 지도 객체

function initMap() {
  const script = document.createElement('script')
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=8a56cffbdb88cac49b532e32cf48731d&autoload=false`
  document.head.appendChild(script)

  script.onload = () => {
    window.kakao.maps.load(() => {
      if (mapContainer.value) {
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도 중심 좌표
          level: 29, // 지도 확대 레벨
          maxLevel: 13, // 지도 축소 제한 레벨
        }
        // 지도 생성
        mapInstance = new window.kakao.maps.Map(mapContainer.value, options)

        // 1. 제한할 지도 영역 설정 (예: 대한민국 영역)
        const bounds = new window.kakao.maps.LatLngBounds(
          new window.kakao.maps.LatLng(33.0, 124.0), // 남서쪽 좌표
          new window.kakao.maps.LatLng(38.6, 131.0)  // 북동쪽 좌표
        )

        // 2. 지도에 영역 제한 설정
        mapInstance.setMaxBounds(bounds)
      }
    });
  }
}

onMounted(()=> {
  initMap()
})
</script>

<template>
  <div class="map-container">
    <div class="map" ref="mapContainer" style="width: 100%; height: 100%"></div>
  </div>

</template>

<style scoped>
.map-container {
  display: flex;
  width: 100%;
  height: 100%;

}
</style>
