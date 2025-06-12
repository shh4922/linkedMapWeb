
import { deleteWithToken, post, postWithToken } from '@/api/http.ts'
import type { Result } from '@/api/DefaultResponse.ts'
export interface Token {
  accessToken: string;
  refreshToken: string;
}
export const login = (email:string, password:string) => {
  const data = {
    email: email,
    password: password,
  }
  return post<Token>('/login',data)
}

export const register = (email:string, password:string, userName:string) => {
  const data = {
    email: email,
    password: password,
    userName: userName,
  }
  return post('/register',data)
}

export const logout = () => {
  return postWithToken<string>('/logout')
}

export const deleteAccount = () => {
  return deleteWithToken('/user/delete')
}

