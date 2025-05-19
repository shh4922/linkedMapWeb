import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Marker } from '@/api/marker/marker.model.ts'
import { fetchMarkerList } from '@/api/marker/marker.ts'



export const useMarkserListStore = defineStore('markerListStore', ()=> {
  const markerListByRoomId = ref<Record<string, Marker[]|null>>({})
  const selectedMarker = ref<Marker|null>(null)

  const setMarkerList = (roomId:string, markerList:Marker[]) => {
    markerListByRoomId.value[roomId] = markerList
  }

  const selectMarker = (marker:Marker) => {
    if (selectedMarker.value?.id === marker.id) {
      selectedMarker.value = null
    } else {
      selectedMarker.value = marker
    }
  }


  const getFilteredMarkerList = (roomIdList: string[]) => {
    const filteredMarkerList:Record<string, Marker[]|null> = {}

    roomIdList.forEach((roomId)=> {
      if(filteredMarkerList[roomId] === null) {
        filteredMarkerList[roomId] = null
      } else {
        filteredMarkerList[roomId] = markerListByRoomId.value[roomId]
      }

    })

    return filteredMarkerList
  }

  const fetchOnce = async (roomId: string) => {
    if (!markerListByRoomId.value[roomId]) {
      const res = await fetchMarkerList(roomId)
      markerListByRoomId.value[roomId] = res.data
    }
    return markerListByRoomId.value[roomId]
  }

  /** 특정 roomId 의 value 삭제 */
  const deleteRoom = (roomId:string) => {
    delete markerListByRoomId.value[roomId]
  }

  return {
    markerListByRoomId,
    selectedMarker,
    setMarkerList,
    getFilteredMarkerList,
    fetchOnce,
    deleteRoom,
    selectMarker
  }

})
