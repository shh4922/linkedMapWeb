import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { DefaultError, Result } from '@/api/DefaultResponse.ts'
import { AxiosError } from 'axios'
import { joinRoom } from '@/api/invite/invite.ts'

export const useJoinRoom = () => {
  const queryClient = useQueryClient()
  return useMutation<
    Result<string>,
    DefaultError,
    {
      roomId: string,
      key: string
    }
  >({
    mutationFn: ({roomId,key}) => {
      return joinRoom(roomId, key)
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({queryKey:['roomDetail', variables.roomId.toString()]})
    },
    onError: (error, variables) => {
      console.error('Marker update failed:', error)
    }
  })
}


