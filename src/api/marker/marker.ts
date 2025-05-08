import { getWithToken, postWithToken } from '@/api/http.ts'
import type { Marker } from '@/api/marker/marker.model.ts'

export const fetchMarkerList = (roomId:string) => {
  return getWithToken<Marker[]>(`/markers/${roomId}`)
}

export const saveMarker = (title:string, lat:number, lng:number, description:string='', storeType:string, address:string, roadAddress:string, roomId:number, imageUrl:string="") => {
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
