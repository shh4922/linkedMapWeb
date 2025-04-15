import axios, { Axios } from 'axios'
import {interceptorAxios} from "@/api/interceptorAxios";
import type {DefaultResponse} from "@/api/DefaultResponse";
import type { AxiosRequestConfig } from 'axios';

const http: Axios = axios.create({
  baseURL: import.meta.env.VITE_BASEURL+import.meta.env.VITE_API_VERSION,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000
})

export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await http.get<DefaultResponse<T>>(url, config);
  return response.data.data;
};

export const post = async <T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> => {
  const response = await http.post<T>(url, data, config);
  return response.data;
};

export const getWithToken = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await interceptorAxios.get<DefaultResponse<T>>(url, config);
  return response.data.data
};
export const postWithToken = async <T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> => {
  const response = await interceptorAxios.post<T>(url, data, config);
  return response.data
};
export const deleteWithToken = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await interceptorAxios.delete<T>(url, config);
  return response.data
};
