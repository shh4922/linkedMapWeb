export interface DefaultResponse<T> {
  status: number;
  message: string;
  data:T
}

export interface DefaultError {
  status:number;
  message:string;
  data:string|null
}
