import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { fetchRoomDetail, fetchMyRoomList, expelledRoomMember, postCreateRoom } from '@/api/room/room.ts'
import type { Result } from '@/api/DefaultResponse.ts'
import { AxiosError } from 'axios'
import { updateMarker } from '@/api/marker/marker.ts'

export const useFetchMyRoomList = () => {
  return useQuery({
    queryFn: () => fetchMyRoomList(),
    queryKey: ['myRoomList'],
    gcTime: 1000*60*5,
    staleTime: 1000*60*3,
    enabled: !!localStorage.getItem("accessToken")
  })
}

export const useFetchRoomDetail = (roomId:string, options?:{enabled?: boolean}) => {
  return useQuery({
    queryFn: () => fetchRoomDetail(roomId),
    queryKey: ['roomDetail', roomId],
    gcTime: 1000*60*5,
    staleTime: 1000*60*3,
    retry:0,
    enabled: !!roomId && (options?.enabled ?? true),
  })
}

export const useExpelledRoomMember = () => {
  const queryClient = useQueryClient()
  return useMutation<
    Result<string>,
    AxiosError,
    {
      roomMemberId: number,
      roomId: number
    }
  >({
    mutationFn: ({roomMemberId,roomId}) => {
      return expelledRoomMember(roomMemberId, roomId)
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({queryKey:['roomDetail', variables.roomId.toString()]})
    },
    onError: (error, variables) => {
      console.error('Marker update failed:', error)
    }
  })
}

export const useCreateRoom = () => {
  const queryClient = useQueryClient()
  return useMutation<
    Result<string>,
    AxiosError,
    {
      title:string,
      description:string,
      imageBlob:Blob|null
    }
  >({
    mutationFn: ({title, description, imageBlob}) => {
      return postCreateRoom(title, description, imageBlob)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['myRoomList']})
    },
    onError: (error, variables) => {
      console.error('Marker update failed:', error)
    }
  })
}
