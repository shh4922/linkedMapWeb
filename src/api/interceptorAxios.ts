import axios from "axios";

import {removeToken, setTokenInLocal} from "@/utils/token";

/**
 * 네트워크 요청시 token 만료에 대한 처리를 한번에 하기 위해 사용됩니다.
 * 브라우저 상태코드로 401이 나온다면, 서버로 refreshToken 재발급을 요청합니다.
 * 차후에 서버에서 데이터를 받는법을 익히면 다시 설명드리겠습니다.
 */
// import.meta.env.VITE_BASEURL+import.meta.env.VITE_API_VERSION,
const interceptorAxios = axios.create({
  baseURL: import.meta.env.VITE_BASEURL+import.meta.env.VITE_API_VERSION,
  timeout: 5000,
})

interceptorAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken")

    if(accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  }
)

// 401일때 token refresh 하기위해 사용
interceptorAxios.interceptors.response.use(
  (res) => { return res },
  async (error) => {
    switch (error?.response?.status) {
      case 401:
        console.error(401)
        break
        // try {
        //   const refresh = localStorage.getItem('r')
        //
        //   const headers :{ "Content-Type": string; refresh: string; "Access-Control-Allow-Origin": string } = {
        //     'Content-Type': 'application/json',
        //     'refresh': `Bearer ${refresh}`,
        //     'Access-Control-Allow-Origin': '*'
        //   }
        //
        //   const res =  await fetchRefreshToken(headers)
        //
        //   if(res.tokens.access_token !== null) {
        //     removeToken()
        //     setTokenInLocal(res.tokens.access_token, res.tokens.refresh_token)
        //   } else {
        //     alert("세션이 만료되었습니다.")
        //     return Promise.reject(error)
        //   }
        //
        //   error.config.headers.Authorization = `Bearer ${localStorage.getItem("a")}`
        //   return axios.request(error.config);
        //
        // } catch (error) {
        //   console.error(`token expire!! \n ${error}` )
        //   throw error
        // }

      case 403:
        alert("권한이 없습니다")
        break;
      case 404:
        alert("요청하신 페이지를 찾을 수 없습니다.")
        break;

      case 500:
        alert("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.")
        break
      default:
        console.error(`interceptor default Error!! \n ${error}` )
        break
    }
    return Promise.reject(error)
  }
);




export { interceptorAxios }
