import { ref, onMounted, onUnmounted } from 'vue'
import type { LatLng } from '@/components/map/LatLng.ts'
import { defineStore } from 'pinia'



export const useCurrentPosition= defineStore('currentPosition', () => {
  const position = ref<LatLng | null>(null)
  const heading = ref<number | null>(null)

  const error = ref<string | null>(null)

  let watcherId: number | null = null

  const start = () => {
    if (!navigator.geolocation) {
      error.value = '이 브라우저는 Geolocation을 지원하지 않습니다.'
      return
    }

    startHeading()
    watcherId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        position.value = {
          lat: coords.latitude,
          lng: coords.longitude,
        }
        error.value = null

      },
      (err) => {
        error.value = err.message
      },

      // 기본 옵션
      {
        enableHighAccuracy: true,
        timeout: 10_000,
        maximumAge: 5_000
      }
    )
  }

  const stop = () => {
    if (watcherId !== null) {
      navigator.geolocation.clearWatch(watcherId)
      watcherId = null
      stopHeading()
    }
  }

  // 2) 방향 스트리밍
  const onDeviceOrientation = (e: DeviceOrientationEvent) => {
    console.log(e.alpha, e.absolute,)
    let h: number|undefined
    if (typeof (e as any).webkitCompassHeading === 'number') {
      h = (e as any).webkitCompassHeading
    } else if (e.absolute && typeof e.alpha === 'number') {
      h = e.alpha
    }

    if (h != null) {
      heading.value = (360 - h) % 360
    }
  }

  const startHeading = () => {
    console.log("startHead")
    if (window.DeviceOrientationEvent) {
      console.log("startHead 2")
      window.addEventListener('deviceorientation', onDeviceOrientation, true)
    }
  }
  const stopHeading = ()=> {
    window.removeEventListener('deviceorientation', onDeviceOrientation)
  }

  return {
    position,
    heading,
    start,
    stop
  }
})




  // onMounted(start)
  // onUnmounted(stop)

  // return { position, start, stop, heading }

