import { getWithToken, postWithToken } from '@/api/http.ts'
import type { RoomDetail, Room } from '@/api/room/room.model.ts'
import type { DefaultResponse } from '@/api/DefaultResponse.ts'

export const fetchMyRoomList = async ():Promise<DefaultResponse<Room[]>> => {
  return getWithToken<Room[]>("/room/me")
}

export const postCreateRoom = async (title:string, description:string) => {
  const data = {
    roomName: title,
    description: description
  }
  return postWithToken<DefaultResponse<string>>("/room/create",data)
}

export const fetchRoomDetail = async (roomId: string) => {
  return getWithToken<RoomDetail>(`/room/detail/${roomId}`)
}

export const expelledRoomMember = async (roomMemberId:number, roomId:number) => {
  const data = {
    roomMemberId: roomMemberId,
    roomId: roomId
  }
  return postWithToken("/roommember/expelled",data)
}
