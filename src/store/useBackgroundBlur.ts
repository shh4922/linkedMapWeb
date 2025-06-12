import { defineStore } from 'pinia'
import type { myInfo } from '@/api/user/user.model.ts'



export const useBackgroundBlur = defineStore('backgroundBlur', {
  state: () => ({
    isShowBlur: false
  }),

  actions: {
    toggleBlur(isShow:boolean)  {
      this.isShowBlur = isShow
    }
  }

})
