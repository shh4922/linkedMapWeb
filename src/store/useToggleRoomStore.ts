import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useToggleRoomStore = defineStore('toggleRoomState', ()=> {
  const isCheckedMap = ref<Record<number, boolean>>({})

  const setCheckedMap = (roomId:number) => {
    if(!isCheckedMap.value[roomId]) {
      isCheckedMap.value[roomId] = false
    }
    // if (!(roomId in isCheckedMap.value)) {
    //
    //   isCheckedMap.value = {
    //     ...isCheckedMap.value,
    //     [roomId]: false,
    //   }
    // }
  }
  const setRoomChecked = (roomId: number, checked: boolean) => {

    isCheckedMap.value[roomId] = checked

    // isCheckedMap.value = {
    //   ...isCheckedMap.value,
    //   [roomId]: checked,
    // }
  }


  return {
    isCheckedMap,
    setCheckedMap,
    setRoomChecked,
  }
})
