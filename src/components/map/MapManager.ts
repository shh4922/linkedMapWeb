
import type { MapInterface } from '@/components/map/interface/MapInterface.ts'
import kakaoMap from '@/components/map/mapType/kakaoMap.ts'
import  MarkerModel from '@/components/map/marker/MarkerModel.ts'
import type { LatLng } from '@/components/map/LatLng.ts'
import markerModel from '@/components/map/marker/MarkerModel.ts'

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
    const findIndex = this.markerList.findIndex(marker => marker.id === markerModel.id)
    if(findIndex !== -1) {return}

    this.markerList.push(markerModel)
    this.mapInterface?.onCreateMaerker(markerModel)
  }

  onUpdateMarker = (markerModel:MarkerModel) => {
    const findIndex = this.markerList.findIndex((marker) => marker.id === markerModel.id)
    if(findIndex === -1) return

    this.mapInterface?.onUpdateMarker(markerModel)
    this.markerList[findIndex] = markerModel
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
    console.log("특정방 마커 삭제후", this.markerList)
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

  onSetZoomLevel = (zoomLevel:number) => {
    this.mapInterface?.setZoomLevel(zoomLevel)
  }

  getInstance = () => {
    return this.mapInterface
  }
}
