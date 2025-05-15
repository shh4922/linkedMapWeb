import { type QueryFunctionContext, useQueries, useQuery } from '@tanstack/vue-query'
import { fetchMarkerList } from '@/api/marker/marker.ts'
import { computed, type Ref } from 'vue'
import { useFetchMyRoomList } from '@/api/category/category.query.ts'


export const useFetchMarkerList = (roomId: Ref<string|null>) => {

  return useQuery({
    queryFn: () => fetchMarkerList(roomId.value),
    queryKey: computed(()=> ['markerList', roomId.value]),
    enabled: computed(()=> roomId.value !== null),
    staleTime: 1000*60*3, // 신선한 상태 시간, 만료시 백그라운드에서 몰래 재요청, 응답오는동안은 캐시된 데이터 사용
    gcTime: 1000*60*5,    // 메모리에서 완전히 날리는 시간, 이후에 다시 요청시 새로 요청

  })
}

export function useFetchMarkerListByRoomList(roomList: Ref<string[]|null>) {

  return useQueries({
    queries: (roomList.value ?? []).map(roomId => ({
      // 1) queryKey: 이 쿼리의 식별자
      queryKey: ['markerList', roomId],
      // 2) queryFn: 실제 데이터를 가져오는 함수
      queryFn: () => fetchMarkerList(roomId),
      // 3) enabled: 항상 활성화
      enabled: true,
      // 4) 캐시 전략
      staleTime: Infinity,
      cacheTime: 1000 * 60 * 60,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    })),
  })
}
