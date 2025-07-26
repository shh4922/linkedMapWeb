<script setup lang="ts">
import { computed, onMounted, type Ref, ref, watch } from 'vue'
import { fetchMyRoomList } from '@/api/room/room.ts'
import type { Room } from '@/api/room/room.model.ts'
import { useToggleRoomStore } from '@/store/useToggleRoomStore.ts'
import { useFetchMyRoomList } from '@/api/room/room.query.ts'

const token = localStorage.getItem('accessToken')
const roomStore = useToggleRoomStore()


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


</script>

<template>
  <div class="category-container">
    <i class="pi pi-times" @click="$emit('close')"></i>
    <div v-if="!token" class="login">
      <router-link :to="{ name: 'login' }">
        로그인후, 그룹을 만들어보세요!
      </router-link>
    </div>

    <template v-else>
      <div class="roomListHeader">
        <p>내가 속한 그룹</p>
        <router-link :to="{ name: 'editCategory' }" class="edit">
          그룹 편집
        </router-link>
      </div>

      <div v-if="roomList2?.data && roomList2?.data.length === 0" class="empty-state">
        <p class="empty-message">
          아직 속해있는 그룹이 없습니다.
        </p>
        <router-link
          :to="{ name: 'createRoom' }"
          class="empty-action"
        >
          그룹 생성하러 가기
        </router-link>
      </div>
      <ul v-else class="category-list">
        <li
          v-for="(room, index) in roomList2?.data"
          :key="index"
        >
          <div class="category-item">
            <p>{{ room.roomName }}</p>
            <input
              type="checkbox"
              id="toggleSwitch"
              class="toggle-input"
              :checked="getRoomCheckRef(room.roomId).value"
              @change="(e) => onToggleChange(e, room.roomId)"
            />
          </div>
        </li>
      </ul>
    </template>
  </div>
</template>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
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

    p {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 600;
      color: #333;
    }
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

  /* ● 빈 상태 스타일 ● */
  .empty-state {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 1.5rem;
    background-color: #faf9f7;
    border: 1px solid #f0eae4;
    border-radius: 0.75rem;
    margin-top: 1rem;

    .empty-message {
      margin: 0;
      font-size: 1rem;
      color: #666;
      font-style: italic;
      text-align: center;
    }

    .empty-action {
      display: inline-block;
      padding: 0.6rem 1.2rem;
      color:  #ff774d;
      font-size: 0.95rem;
      font-weight: 600;
      border-radius: 8px;
      text-decoration: none;
    }
  }

  .category-list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    overflow-y: auto;

    /* 깔끔한 스크롤바 */
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.2) transparent;

    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 3px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
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

  &::before {
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

  &:checked {
    background-color: #ff774d;
  }

  &:checked::before {
    transform: translateX(20px);
  }
}
</style>
