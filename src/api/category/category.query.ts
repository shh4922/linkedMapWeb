import { useQuery } from '@tanstack/vue-query'
import { fetchRoomDetail, fetchMyRoomList } from '@/api/category/category.ts'

export const useFetchMyRoomList = () => {
  return useQuery({
    queryFn: () => fetchMyRoomList(),
    queryKey: ['myRoomList'],
    gcTime: 1000*60*5,
    staleTime: 1000*60*3,
    enabled: !!localStorage.getItem("accessToken")
  })
}

export const useFetchRoomDetail = (roomId:string) => {
  return useQuery({
    queryFn: () => fetchRoomDetail(roomId),
    queryKey: ['roomDetail', roomId],
    gcTime: 1000*60*5,
    staleTime: 1000*60*3,
    enabled: !!roomId
  })
}
