import { defineStore } from 'pinia'
import type { myInfo } from '@/api/user/user.model.ts'

interface MyInfoState {
  myInfo: myInfo|null
}

export const useMyInfo = defineStore('myInfo', {
  state: ():MyInfoState => ({
    myInfo: null
  }),

  getters: {
    getMyInfo: (state) : myInfo|null => {
      return state.myInfo
    },
  },

  actions: {
    setMyInfo(myInfo:myInfo|null)  {
      this.myInfo = myInfo
    }
  }

})
