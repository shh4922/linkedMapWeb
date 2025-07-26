import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { DefaultError, Result } from '@/api/DefaultResponse.ts'
import axios, { AxiosError } from 'axios'
import { login, register, type Token } from '@/api/auth/auth.ts'

export const useRegister = () => {
  return useMutation<
    string,
    DefaultError,
    {
      email:string,
      password:string,
      userName: string
    }
  >({
    mutationFn: ({email,password,userName}) => {
      return register(email,password,userName)
    },
    // onSuccess: (data, variables) => {
    //   // queryClient.invalidateQueries({queryKey:['roomDetail', variables.roomId.toString()]})
    // },
    onError: (error, variables) => {
      console.error('useRegister-Error', error)
    }
  })
}

export const useLogin = () => {

  return useMutation<
    Token,
    DefaultError,
    {
      email:string,
      password:string,
    }
  >({
    mutationFn: ({email,password}) => {
      return login(email,password)
    },
    // onSuccess: (data, variables) => {
    //   // queryClient.invalidateQueries({queryKey:['roomDetail', variables.roomId.toString()]})
    // },
    onError: (error) => {
      console.error('useLogin-Error', error)
    }
  })
}
