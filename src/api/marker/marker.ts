import { deleteWithToken, getWithToken, postWithToken } from '@/api/http.ts'
import type { Marker } from '@/api/marker/marker.model.ts'
import type { DefaultResponse } from '@/api/DefaultResponse.ts'



export const fetchMarkerList = (roomId:string|null):Promise<DefaultResponse<Marker[]>> => {
  return getWithToken<Marker[]>(`/markers/${roomId}`)
}

export const saveMarker = (title:string, lat:number, lng:number, description:string, storeType:string, address:string, roadAddress:string, roomId:number, imageUrl:string="") => {
  const data = {
    title: title,
    lat: lat,
    lng: lng,
    description: description,
    storeType: storeType,
    address: address,
    roadAddress: roadAddress,
    roomId: roomId,
    imageUrl: imageUrl
  }
  console.log(data)
  return postWithToken('/marker/create', data)

}

export const deleteMarkerByMarkerId = (markerId:string) => {
  return deleteWithToken(`/marker/${markerId}`)
}
