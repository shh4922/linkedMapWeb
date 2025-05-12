import type { MarkerInterface } from '@/components/map/interface/MarkerInterface.ts'
import type { LatLng } from '@/components/map/LatLng.ts'

export interface MapInterface extends MarkerInterface{
  setPosition: (latlng:LatLng) => void
}
