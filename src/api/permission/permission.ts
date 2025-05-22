import { pathWithToken } from '@/api/http.ts'

export const updatePermission = ( memberId:number, roomId:number, permission:string) => {
  console.log(memberId,roomId,permission)
  const data = {
    targetMemberId: memberId,
    roomId:roomId,
    permission: permission
  }
  return pathWithToken<string>('/roommember/update/permission', data)
}
