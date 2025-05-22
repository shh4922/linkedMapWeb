import axios, { Axios, type AxiosError, type AxiosResponse } from 'axios'
import {interceptorAxios} from "@/api/interceptorAxios";
import type { DefaultError, DefaultResponse } from '@/api/DefaultResponse'
import type { AxiosRequestConfig } from 'axios';

const http: Axios = axios.create({
  baseURL: import.meta.env.VITE_BASEURL+import.meta.env.VITE_API_VERSION,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000
})

export interface Result<T> {
  data?: T
  error?: AxiosError<DefaultError>
}

export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await http.get<DefaultResponse<T>>(url, config);
  return response.data.data;
};

export const post = async <T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<Result<T>> => {
  try {
    const res = await http.post<T>(url, data, config);
    return { data: res.data };
  } catch (error) {
    const err = error as AxiosError<DefaultError>
    return  { error:err }
  }
};


export const getWithToken = async <T>(url: string, config?: AxiosRequestConfig): Promise<DefaultResponse<T>> => {
  const res = await interceptorAxios.get<DefaultResponse<T>>(url, config);
  return res.data
};

export const postWithToken = async <T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<DefaultResponse<T>> => {
  const response = await interceptorAxios.post<DefaultResponse<T>>(url, data, config);
  return response.data
};

export const deleteWithToken = async <T>(url: string, config?: AxiosRequestConfig): Promise<Result<T>> => {
  try {
    const response = await interceptorAxios.delete<T>(url, config);
    return { data: response.data };
  } catch (error) {
    const err = error as AxiosError<DefaultError>
    return  { error:err }
  }
};

export const pathWithToken = async <T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<DefaultResponse<T>> => {
  const response = await interceptorAxios.patch<DefaultResponse<T>>(url, data, config);
  return response.data
};
