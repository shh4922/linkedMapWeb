import { deleteWithToken, getWithToken, postWithToken, putWithToken } from '@/api/http.ts'
import type { RoomDetail, Room } from '@/api/room/room.model.ts'
import { blobToFile, compressImage } from '@/utils/image.ts'

/** GET RoomList 내가 속한 방 리스트 */
export const fetchMyRoomList = async () => {
  return getWithToken<Room[]>("/room/me")
}



/** POST Room Create */
export const postCreateRoom = async (title:string, description:string, file:File|null=null) => {
  const formData = new FormData()

  formData.append('dto', new Blob([JSON.stringify({
    roomName: title,
    description: description
  })], {type: 'application/json'}))

  if (file) {
    const compressedFile = await compressImage(file)
    formData.append('image', compressedFile)
  }

  return postWithToken('/room/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

/** GET room Detail */
export const fetchRoomDetail = async (roomId: string) => {
  return getWithToken<RoomDetail>(`/room/detail/${roomId}`)

}

/** POST 유저 추방 */
export const expelledRoomMember = async (roomMemberId:number, roomId:number) => {
  const data = {
    roomMemberId: roomMemberId,
    roomId: roomId
  }
  return postWithToken<string>("/roommember/expelled",data)
}


/** PUT room Update  */
export const updateRoom = async (roomId: number, roomName:string, description:string, imageBlob:Blob|null=null) => {
  const formData = new FormData()
  formData.append('dto', new Blob([JSON.stringify({
    roomId: roomId,
    roomName: roomName,
    description: description,
  })], {type: 'application/json'}))

  if(imageBlob) {
    const file = blobToFile(imageBlob, "marker.jpeg")
    const compressedFile = await compressImage(file)
    formData.append('image', compressedFile)
  }

  return putWithToken('/room/update', formData)
}

export const deleteRoom = (roomId: number) => {
  return deleteWithToken<string>(`room/${roomId}`)
}
