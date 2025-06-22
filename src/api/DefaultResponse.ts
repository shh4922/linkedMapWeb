import type { AxiosError } from 'axios'

export interface DefaultResponse<T> {
  status: number;
  message: string;
  data:T
}


export interface Result<T> {
  data?: T
  error?: CustomError
    //AxiosError<DefaultError>
}


export interface CustomError {
  status: number
  serverResponse: DefaultError
}
export interface DefaultError {
  status:number;
  message:string;
  data:string|null
}



