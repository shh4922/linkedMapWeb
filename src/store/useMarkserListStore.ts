import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Marker } from '@/api/marker/marker.model.ts'
import { fetchMarkerList } from '@/api/marker/marker.ts'

interface markerListByRoomId {
  roomId: Marker[]
}
export const useMarkserListStore = defineStore('markerListStore', ()=> {
  const markerListByRoomId = ref<Record<string, Marker[]|null>>({})

  const setMarkerList = (roomId:string, markerList:Marker[]) => {
    markerListByRoomId.value[roomId] = markerList
  }

  const getMarkerList = (roomIdList: string[]) => {
    // for(let i=0; i<roomIdList.length; i++) {
    //   if(markerListByRoomId.value[roomIdList[i]] === undefined) {
    //     // TODO: fetch 하는 함수 작성
    //     // const res = await fetchMarkerList(roomIdList[i])
    //     // setMarkerList(roomIdList[i], res.data)
    //   }
    // }
    return markerListByRoomId
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

  const deleteRoom = (roomId:string) => {
    delete markerListByRoomId.value[roomId]
    console.log(markerListByRoomId)
  }

  return {
    markerListByRoomId,
    setMarkerList,
    getMarkerList,
    getFilteredMarkerList,
    fetchOnce,
    deleteRoom
  }

})
