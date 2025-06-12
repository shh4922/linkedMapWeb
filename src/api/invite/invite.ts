import { getWithToken, postWithToken } from '@/api/http.ts'
import type { InviteResponse } from '@/api/invite/invite.model.ts'

export const postInviteLink = async (roomId:string) => {
  const data = {
    roomId:roomId
  }
  return postWithToken<InviteResponse>('/invite/create',data)
}


export const joinRoom = (roomId:string, key:string) => {
  const data = {
    roomId: roomId,
    inviteKey: key
  }
  return postWithToken("/invite/join", data)
}

export const checkInviteKey = (key:string) => {
  return getWithToken(`/invite/check/${key}`)
}
