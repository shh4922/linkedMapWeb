import type MarkerModel from '@/components/map/marker/MarkerModel.ts'

export interface MarkerInterface {
  onCreateMaerker: (marker:MarkerModel) => void,
}
