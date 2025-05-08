import { getWithToken } from '@/api/http.ts'
import type { myInfo } from '@/api/user/user.model.ts'

export const fetchMyInfo = () => {
  return getWithToken<myInfo>('/user/my')
}
