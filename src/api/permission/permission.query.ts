import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { Result } from '@/api/DefaultResponse.ts'
import { AxiosError } from 'axios'
import { updatePermission } from '@/api/permission/permission.ts'

export const useUpdatePermission = () => {
  const queryClient = useQueryClient()
  return useMutation<
    Result<string>,
    AxiosError,
    {
      roomMemberId: number,
      roomId: number,
      permission: string
    }
  >({
    mutationFn: ({roomMemberId,roomId,permission}) => {
      return updatePermission(roomMemberId, roomId, permission)
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({queryKey:['roomDetail', variables.roomId.toString()]})
    },
  })
}
