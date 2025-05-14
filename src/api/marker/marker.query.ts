import { useQuery } from '@tanstack/vue-query'
import { fetchMarkerList } from '@/api/marker/marker.ts'
import { computed, type Ref } from 'vue'


export const useFetchMarkerList = (roomIdRef: Ref<string|null>) => {
  return useQuery({
    queryFn: () => fetchMarkerList(roomIdRef.value!),
    queryKey: computed(() => ['markerList', roomIdRef.value]),
    gcTime: 1000*60*5,
    staleTime: 1000*60*3,
    enabled: !!roomIdRef.value
  })
}
