import type { MapInterface } from '@/components/map/interface/MapInterface.ts'
import  MarkerModel from '@/components/map/marker/MarkerModel.ts'
import { createApp } from 'vue'
import CustomOverlayMarker from '@/components/map/marker/CustomOverlayMarker.vue'
import app from '@/App.vue'


export default class kakaoMap implements MapInterface {

  map;

  constructor(container: HTMLElement) {
    this.map = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(36.0665, 127.8780),
      level: 13,
    });
  }

  onCreateMaerker(marker: MarkerModel): void {
    const position = new kakao.maps.LatLng(marker.lat, marker.lng)

    const container = document.createElement('div')
    const app = createApp(CustomOverlayMarker, { name: marker.name })
    app.mount(container)

    const overlayMarker = new kakao.maps.CustomOverlay({
      position: position,
      content: container,
      map: this.map
    })

    marker.mapMarkerInfo = overlayMarker
    // marker.kakaoOverlay = customOverlay
  }

  onDeleteMaerker(marker: MarkerModel): void {
    marker.mapMarkerInfo.setMap(null);
    // console.log("delteMarker In kakaoMap", id)
  }

}
