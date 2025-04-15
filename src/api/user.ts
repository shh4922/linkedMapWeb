import { post } from '@/api/http.ts'

export const login = (email:string, password:string) => {
  const data = {
    email: email,
    password: password,
  }
  return post('/login',data)
}

export const register = (email:string, password:string, userName:string) => {
  const data = {
    email: email,
    password: password,
    userName: userName,
  }
  return post('/register',data)
}

