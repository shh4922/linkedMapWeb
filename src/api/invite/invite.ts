import { postWithToken } from '@/api/http.ts'
import type { InviteResponse } from '@/api/invite/invite.model.ts'

export const postInviteLink = async (roomId:string) => {
  const data = {
    roomId:roomId
  }
  return postWithToken<InviteResponse>('/invite/create',data)
}
