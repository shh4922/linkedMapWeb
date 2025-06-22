import axios, { Axios, type AxiosError } from 'axios'
import {interceptorAxios} from "@/api/interceptorAxios";
import type { CustomError, DefaultError, DefaultResponse, Result } from '@/api/DefaultResponse'
import type { AxiosRequestConfig } from 'axios';

const http: Axios = axios.create({
  baseURL: import.meta.env.VITE_BASEURL+import.meta.env.VITE_API_VERSION,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": '*',
  },
  timeout: 5000
})



export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<Result<T>> => {
  try {
    const response = await http.get<DefaultResponse<T>>(url, config);
    return { data: response.data.data };
  } catch (error) {
    const err = error as AxiosError<DefaultError>
    return  { error:err }
  }
};

export const post = async <T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<Result<T>> => {
  try {
    const res = await http.post<DefaultResponse<T>>(url, data, config);
    return { data: res.data.data };
  } catch (error) {
    const err = error as AxiosError<DefaultError>
    return  { error:err }
  }
};


export const getWithToken = async <T>(url: string, config?: AxiosRequestConfig): Promise<Result<T>> => {
  try {
    const res = await interceptorAxios.get<DefaultResponse<T>>(url, config);
    return { data: res.data.data };
  } catch (error) {
    const err = error as AxiosError<DefaultError>

    if(err.response) {
      const customError: CustomError = {
        status: err.status!,
        serverResponse: err.response?.data
      }

      // 401 일때는 임시로 화면에 안던지게 함
      if(err.status === 401) {
        return {error:customError}
      }

      throw customError
    }

    const e:CustomError = {
      serverResponse: {
        status: 1000,
        message: "??",
        data: null
      },
      status: 0
    }
    throw e
  }
};


export const postWithToken = async <T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<Result<T>> => {
  try {
    const res = await interceptorAxios.post<DefaultResponse<T>>(url, data, config);
    return {data:res.data.data};
  } catch (error) {
    const err = error as AxiosError<DefaultError>

    if(err.response) {
      const customError: CustomError = {
        status: err.status!,
        serverResponse: err.response?.data
      }

      // 401 일때는 임시로 화면에 안던지게 함
      if(err.status === 401) {
        return {error:customError}
      }

      throw customError
    }

    const e:CustomError = {
      serverResponse: {
        status: 1000,
        message: "??",
        data: null
      },
      status: 0
    }
    throw e
  }
};


export const deleteWithToken = async <T>(url: string, config?: AxiosRequestConfig): Promise<Result<T>> => {
  try {
    const response = await interceptorAxios.delete<DefaultResponse<T>>(url, config);
    return { data: response.data.data };
  } catch (error) {
    const err = error as AxiosError<DefaultError>
    if(err.status === 401) {
      return {error:err}
    }
    throw  { error:err }
  }
};


export const pathWithToken = async <T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<Result<T>> => {
  try {
    const res = await interceptorAxios.patch<DefaultResponse<T>>(url, data, config);
    return {data: res.data.data};
  } catch (error) {
    const err = error as AxiosError<DefaultError>
    throw {error: err}
  }
};

export const putWithToken = async <T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<Result<T>> => {
  try {
    const res = await interceptorAxios.put<DefaultResponse<T>>(url, data, config);
    return {data: res.data.data};
  } catch (error) {
    const err = error as AxiosError<DefaultError>
    throw  {error: err}
  }
};
