import { useQuery } from '@tanstack/vue-query'
import { fetchMarkerList } from '@/api/marker/marker.ts'


export const useFetchMarkerList = (roomId:string) => {
  return useQuery({
    queryFn: () => fetchMarkerList(roomId),
    queryKey: ['markerList',roomId],
    gcTime: 1000*60*5,
    staleTime: 1000*60*3,
    enabled: !!roomId
  })
}
