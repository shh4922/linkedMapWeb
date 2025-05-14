
import type { MapInterface } from '@/components/map/interface/MapInterface.ts'
import kakaoMap from '@/components/map/mapType/kakaoMap.ts'
import type MarkerModel from '@/components/map/marker/MarkerModel.ts'
import type { LatLng } from '@/components/map/LatLng.ts'

export default class MapManager {
  dom: HTMLElement
  mapInterface:MapInterface|null = null
  markerList:MarkerModel[]

  /** store에 저장된 지도타입에 따라 로드하는 지도 변경*/
  constructor(dom:HTMLElement, markerList:MarkerModel[]) {
    this.dom = dom;
    this.mapInterface = new kakaoMap(this.dom)

    this.markerList = markerList
  }

  onCreateMarker = (markerModel:MarkerModel) => {
    // 마커가 이미 존재하는지 확인
    const findIndex = this.markerList.findIndex(marker => marker.id === markerModel.id)
    if(findIndex !== -1) return

    this.markerList.push(markerModel)
    this.mapInterface?.onCreateMaerker(markerModel)
  }

  onDeleteMarkerListByRoomId = (roomId:number) => {
    const filterMarkerList = this.markerList.filter((marker) => {
      return marker.roomId === roomId
    })

    filterMarkerList.forEach((marker) => {
      this.onDeleteMarker(marker.id)
    })

    this.markerList = this.markerList.filter((marker) => {
      return marker.roomId !== roomId
    })
  }

  onDeleteMarker = (id:string) => {
    const findIndex = this.markerList.findIndex((marker) => {
      return marker.id === id
    })
    if(findIndex === -1) {
      console.error("해당 마커를 못찾겠음;")
      return
    }

    this.mapInterface?.onDeleteMaerker(this.markerList[findIndex])
    this.markerList = this.markerList.filter((marker) => {
      return marker.id !== id
    })
  }

  onFindMarker = (id:string):MarkerModel|null => {
    const findIndex = this.markerList.findIndex((marker) => {
      return marker.id === id
    })
    if(findIndex === -1) return null
    return this.markerList[findIndex]
  }

  onSetPosition = (latlng:LatLng) => {
    this.mapInterface?.setPosition(latlng)
  }

  getInstance = () => {
    return this.mapInterface
  }
}
