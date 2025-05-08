
import { post, type Result } from '@/api/http.ts'
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



// export interface authResponse {
//   access_token: string,
//   refresh_token: string,
// }
//
// export function fetchTokenWithKakaoCode(code: string):Promise<{tokens: authResponse}> {
//   const params= { code: code }
//   return get<{tokens: authResponse}>("/auth/oauth/kakao",{ params:params })
// }
//
// export function fetchRefreshToken(headers:any): Promise<{tokens: authResponse}> {
//   return get<{tokens: authResponse}>("/auth/refresh",{
//     headers:headers,
//   })
// }
