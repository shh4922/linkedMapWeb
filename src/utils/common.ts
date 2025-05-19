import moment from 'moment'
import type { LatLng } from '@/components/map/LatLng.ts'


export const forrmatDate = (date: string) => {
  return moment(date).format('YYYY-MM-DD');
}

/**
 * 두 좌표 사이에 거리 구하기.
 * @param latlng
 * @param latlng2
 */
export const getDistanceKm = (latlng:LatLng, latlng2:LatLng):number =>  {
  const R = 6371; // 지구 반지름(킬로미터)
  const toRad = (deg: number) => deg * Math.PI / 180;

  // 위도·경도 차분 (절대값 처리)
  const dLat = toRad(Math.abs(latlng2.lat - latlng.lat))
  const dLon = toRad(Math.abs(latlng2.lng - latlng.lng))

  const φ1 = toRad(latlng.lat)
  const φ2 = toRad(latlng2.lat)

  const sinDLat = Math.sin(dLat / 2)
  const sinDLon = Math.sin(dLon / 2)

  const hav =
    sinDLat * sinDLat +
    Math.cos(φ1) * Math.cos(φ2) * sinDLon * sinDLon

  const c = 2 * Math.atan2(Math.sqrt(hav), Math.sqrt(1 - hav))

  return R * c
}
