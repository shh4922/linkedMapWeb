import { post } from '@/api/http.ts'

export const register = (email:string, password:string, userName:string) => {
  const data = {
    email: email,
    password: password,
    username: userName,
  }
  return post('/register',data)
}

// export const login = (email:string, password:string) => {
//   const data = {
//     email: email,
//     password: password,
//   }
//   return axios.post(`${import.meta.env.VITE_BASEURL}${import.meta.env.VITE_API_VERSION}/login`, data)
// }
