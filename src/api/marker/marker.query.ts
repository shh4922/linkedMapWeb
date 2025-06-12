import { type QueryFunctionContext, useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/vue-query'
import { fetchMarkerList, saveMarker, updateMarker } from '@/api/marker/marker.ts'
import { computed, type Ref } from 'vue'
import { useFetchMyRoomList } from '@/api/room/room.query.ts'
import type { Result } from '@/api/DefaultResponse.ts'
import { AxiosError } from 'axios'


export const useFetchMarkerList = (roomId: string) => {

  return useQuery({
    queryFn: () => fetchMarkerList(roomId),
    queryKey:['markerList', roomId],
    enabled: !!roomId,
    staleTime: 1000*60*3, // 신선한 상태 시간, 만료시 백그라운드에서 몰래 재요청, 응답오는동안은 캐시된 데이터 사용
    gcTime: 1000*60*5,    // 메모리에서 완전히 날리는 시간, 이후에 다시 요청시 새로 요청

  })
}


// roomId:string, markerId:string, title:string, description:string, storeType:string, imageBlob:Blob|null=null
export const useUpdateMarker = () => {
  const queryClient = useQueryClient()
  return useMutation<
    Result<string>,
    AxiosError,
    {
      roomId:string
      markerId:string
      title:string
      description:string
      storeType:string
      imageBlob:Blob|null
    }
  >({
    mutationFn: ({roomId,markerId,title,description,storeType,imageBlob}) => {
      return updateMarker(markerId, title, description, storeType, imageBlob)
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({queryKey:['markerList', variables.roomId]})
    },
    onError: (error, variables) => {
      console.error('Marker update failed:', error)
    }
  })
}

export const useCreateMarker = () => {
  const queryClient = useQueryClient()
  return useMutation<
    Result<string>,
    AxiosError,
    {
      title:string,
      lat:number,
      lng:number,
      description:string,
      storeType:string,
      address:string,
      roadAddress:string,
      roomId:number,
      imageBlob:Blob|null
    }
  >({
    mutationFn: ({title,lat,lng,description,storeType,address,roadAddress,roomId,imageBlob}) => {
      return saveMarker(title,lat,lng,description,storeType,address,roadAddress,roomId,imageBlob)
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({queryKey:['markerList', variables.roomId]})
    },
    onError: (error, variables) => {
      console.error('Marker update failed:', error)
    }
  })
}
