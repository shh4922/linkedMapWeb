import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface checkedRoomInterface {
  roomId: number
  checked: boolean
}

export const useToggleRoomStore = defineStore('toggleRoomState', ()=> {
  const isCheckedMap = ref<Record<number, boolean>>({})
  // const checkedRoomList = ref<number[]>([])

  const changedRoomId = ref<checkedRoomInterface|null>(null)

  /** 방을 받아온 후, 홈 시트 뷰에 방을 추가하는 함수*/
  const setCheckedMap = (roomId:number) => {
    if(!isCheckedMap.value[roomId]) {
      isCheckedMap.value[roomId] = false
    }
  }

  /** 방을 체크 했을 때, 홈 시트 뷰에 방을 체크 해 주는 함수*/
  const setRoomChecked = (roomId: number, checked: boolean) => {
    isCheckedMap.value[roomId] = checked

    if(checked) {
      // checkedRoomList.value.push(roomId)
      changedRoomId.value = {
        roomId: roomId,
        checked: true
      }
    }
    else {

      // checkedRoomList.value = checkedRoomList.value.filter(roomId => roomId !== roomId)
      changedRoomId.value = {
        roomId: roomId,
        checked: false
      }
    }


  }


  return {
    isCheckedMap,
    setCheckedMap,
    setRoomChecked,
    changedRoomId
  }
})
