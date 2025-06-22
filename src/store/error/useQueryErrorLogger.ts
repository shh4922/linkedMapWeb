import { watch } from 'vue'

export const useQueryErrorLogger = (errorRef: any, isErrorRef: any) => {
  watch(isErrorRef, (val) => {
    if (val && errorRef.value) {
      console.error('[QUERY ERROR]:', errorRef.value)
    }
  })
}
