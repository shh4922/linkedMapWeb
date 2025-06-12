import { deleteWithToken, getWithToken, postWithToken, putWithToken } from '@/api/http.ts'
import type { Marker } from '@/api/marker/marker.model.ts'
import type { DefaultResponse } from '@/api/DefaultResponse.ts'
import { blobToFile, compressImage } from '@/utils/image.ts'



export const fetchMarkerList = (roomId:string|null) => {
  return getWithToken<Marker[]>(`/markers/${roomId}`)
}

export const saveMarker = async (title:string, lat:number, lng:number, description:string, storeType:string, address:string, roadAddress:string, roomId:number, imageBlob:Blob|null=null) => {
  const formData = new FormData()
  const data = {
    title: title,
    lat: lat,
    lng: lng,
    description: description,
    storeType: storeType,
    address: address,
    roadAddress: roadAddress,
    roomId: roomId,
  }

  formData.append('dto', new Blob(
    [JSON.stringify(data)],
    { type:'application/json'}))

  if(imageBlob) {
    const file = blobToFile(imageBlob, "marker.jpeg")
    const compressedImage = await compressImage(file)
    formData.append('image', compressedImage)
  }

  return postWithToken<string>('/marker/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// TODO: 업데이트 완료시, 캐싱해둔거 다시 패치
/** 마커 업데이트*/
export const updateMarker = async (markerId:string, title:string, description:string, storeType:string, imageBlob:Blob|null=null) => {
  const formData = new FormData()
  const data = {
    // markerId: markerId,
    markerId: "10",
    title: title,
    description: description,
    storeType: storeType,

  }
  formData.append('dto', new Blob(
    [JSON.stringify(data)],
    { type:'application/json'}))

  if(imageBlob) {
    const file = blobToFile(imageBlob, "marker.jpeg")
    const compressedImage = await compressImage(file)
    formData.append('image', compressedImage)
  }

  return putWithToken<string>('/marker/update', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const deleteMarkerByMarkerId = (markerId:string) => {
  return deleteWithToken(`/marker/${markerId}`)
}
