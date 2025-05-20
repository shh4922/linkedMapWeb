import type { MapInterface } from '@/components/map/interface/MapInterface.ts'
import  MarkerModel from '@/components/map/marker/MarkerModel.ts'
import { createApp } from 'vue'
import CustomOverlayMarker from '@/components/map/marker/CustomOverlayMarker.vue'
import type { LatLng } from '@/components/map/LatLng.ts'
import MyMarker from '@/components/map/marker/MyMarker.vue'



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
    const app = this.getCustomMarker(marker)
    app.mount(container)

    const overlayMarker = new kakao.maps.CustomOverlay({
      position: position,
      content: container,
      map: this.map
    })

    marker.mapMarkerInfo = overlayMarker
  }

  onDeleteMaerker(marker: MarkerModel): void {
    marker.mapMarkerInfo.setMap(null);
    // console.log("delteMarker In kakaoMap", id)
  }

  setPosition(latlng: LatLng): void {
    this.map.setCenter(new kakao.maps.LatLng(latlng.lat, latlng.lng));
  }

  onUpdateMarker(markerModel: MarkerModel): void {
    markerModel.mapMarkerInfo.setPosition(new kakao.maps.LatLng(markerModel.lat, markerModel.lng))
  }

  setZoomLevel(zoomLevel: number): void {
    this.map.setLevel(zoomLevel)
  }

  private getCustomMarker(markerModel:MarkerModel) {
    if(markerModel.id === 'my') {
      return createApp(MyMarker)
    }
    return createApp(CustomOverlayMarker, { name: markerModel.name })
  }


}
