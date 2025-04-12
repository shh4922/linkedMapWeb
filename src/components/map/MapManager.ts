import { ref } from 'vue'
import type { MapInterface } from '@/components/map/interface/MapInterface.ts'
import kakaoMap from '@/components/map/mapType/kakaoMap.ts'
import type MarkerModel from '@/components/map/marker/MarkerModel.ts'

export default class MapManager {
  dom: HTMLElement
  mapInterface = ref<MapInterface|null>(null)

  /** store에 저장된 지도타입에 따라 로드하는 지도 변경*/
  constructor(dom:HTMLElement) {
    this.dom = dom;
    this.mapInterface.value = new kakaoMap(this.dom)
  }

  onCreateMarker = (markerModel:MarkerModel) => {
    this.mapInterface.value?.onCreateMaerker(markerModel)
  }

  getInstance = () => {
    return this.mapInterface.value
  }
}
