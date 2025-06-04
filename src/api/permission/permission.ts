import { pathWithToken } from '@/api/http.ts'

export const updatePermission = ( memberId:number, roomId:number, permission:string) => {
  const data = {
    roomMemberId: memberId,
    roomId:roomId,
    permission: permission
  }
  return pathWithToken<string>('/roommember/update/permission', data)
}
