<script setup lang="ts">
import { computed, onMounted, type Ref, ref, watch } from 'vue'
import { fetchMyRoomList } from '@/api/room/room.ts'
import type { Room } from '@/api/room/room.model.ts'
import { useToggleRoomStore } from '@/store/useToggleRoomStore.ts'
import { useFetchMyRoomList } from '@/api/room/room.query.ts'

const token = localStorage.getItem('accessToken')
const roomList: Ref<Room[]|null> = ref(null);
const isCheckedMap = ref<Record<number, boolean>>({})
const roomStore = useToggleRoomStore()


// const getRoomList = async () => {
//   const res = await fetchMyRoomList()
//   roomList.value = res.data
//
//   res.data.forEach((room) => {
//     roomStore.setCheckedMap(room.roomId)
//   })
// }
const {data:roomList2} = useFetchMyRoomList()


const getRoomCheckRef = (roomId: number) => {
  return computed(() => {
    return roomStore.isCheckedMap[roomId] ?? false
  })

}

const onToggleChange = (event: Event, roomId: number) => {
  const target = event.target as HTMLInputElement
  roomStore.setRoomChecked(roomId, target.checked)
}

// onMounted(()=> {
//   getRoomList()
// })

</script>

<template>
  <div>
    <div v-if="!token" class="login">
      <p>로그인후, 그룹을 만들어보세요!</p>
    </div>

    <div v-else class="category-container">
      <div v-if="roomList?.length === 0">
        <p>그룹을 만들어보세요~</p>
      </div>

      <div class="roomListHeader">
        <p>내가 속한 그룹</p>
        <router-link :to="{name: 'editCategory'}" class="edit">그룹 편집</router-link>
      </div>

      <ul class="category-list">
        <li v-for="(room, index) in roomList2?.data" :key="index">
          <div class="category-item">
            <p>{{room.roomName}}</p>
            <input
              type="checkbox"
              id="toggleSwitch"
              class="toggle-input"
              :checked="getRoomCheckRef(room.roomId).value"
              @change="(e) => onToggleChange(e,room.roomId)"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem;
  font-family: "nanum-5";
}

.category-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 1.2rem;
  font-family: "nanum-5";
  gap: 1.5rem;
  background-color: white;
  min-width: 300px;
  min-height: 40rem;
  max-height: 50rem;
  height: 400px;

  overflow: hidden;
  border-radius: 1rem;

  .roomListHeader {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .edit {
    padding: 0.4rem 0.8rem;
    background-color: #ff774d;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background-color: #ff6335;
    }
  }
}

.category-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  height: 100%;
  overflow-y: auto;

  /* 선택 사항: 깔끔한 스크롤바 스타일 */
  scrollbar-width: thin;
  scrollbar-color: rgba(0,0,0,0.2) transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,0.2);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
}

.category-item {
  background: #fff8f5;
  border: 1px solid #ffe1d6;
  border-radius: 8px;
  padding: 0.8rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  color: #333;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
}

.toggle-input {
  appearance: none;
  width: 42px;
  height: 22px;
  border-radius: 11px;
  background-color: #ddd;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;
}

.toggle-input::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  background-color: #fff;
  border-radius: 50%;
  transition: transform 0.3s;
}

.toggle-input:checked {
  background-color: #ff774d;
}

.toggle-input:checked::before {
  transform: translateX(20px);
}

</style>
