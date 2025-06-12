import { getWithToken, postWithToken } from '@/api/http.ts'
import type { myInfo } from '@/api/user/user.model.ts'
import type { AxiosRequestConfig } from 'axios'

export const fetchMyInfo = () => {
  return getWithToken<myInfo>('/user/my')
}

