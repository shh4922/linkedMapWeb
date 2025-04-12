import type { MapInterface } from '@/components/map/interface/MapInterface.ts'
import type MarkerModel from '@/components/map/marker/MarkerModel.ts'
import { createApp } from 'vue'
import CustomOverlayMarker from '@/components/map/marker/CustomOverlayMarker.vue'
import markerModel from '@/components/map/marker/MarkerModel.ts'

export default class kakaoMap implements MapInterface {
  map;

  constructor(container: HTMLElement) {
    this.map = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(37.5665, 126.9780),
      level: 3,
    });
  }

  onCreateMaerker(marker: MarkerModel): void {
    const position = new kakao.maps.LatLng(marker.lat, marker.lng)
    const markerData = new kakao.maps.Marker({
      position: position,
    });
    markerData.setMap(this.map);

    const container = document.createElement('div')
    const app = createApp(CustomOverlayMarker, { name: marker.name })
    app.mount(container)

    new kakao.maps.CustomOverlay({
      position: position,
      content: container,
      xAnchor: 0.3,
      yAnchor: 2.2,
      map: this.map
    })

    // marker.kakaoOverlay = customOverlay
  }

}
