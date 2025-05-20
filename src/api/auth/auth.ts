
import { post, postWithToken, type Result } from '@/api/http.ts'
export interface Token {
  accessToken: string;
  refreshToken: string;
}
export const login = (email:string, password:string) => {
  const data = {
    email: email,
    password: password,
  }
  return post<Result<Token>>('/login',data)
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


