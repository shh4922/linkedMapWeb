<script setup lang="ts">
import type { RoomMember } from '@/api/room/room.model.ts'
import { computed, ref } from 'vue'
import { useMyInfo } from '@/store/myInfoStore.ts'
import EditPermissionModal from '@/components/modal/EditPermissionModal.vue'
import { expelledRoomMember } from '@/api/room/room.ts'
import type { AxiosError } from 'axios'

const emit = defineEmits(['togglePermissionModal'])
const props = defineProps<{
  userInfo: RoomMember,
  roomId: string,
  currentOwnerId: number
}>()

const fireUser = async () => {
  if (!confirm(`${props.userInfo.name} 를 추방 하시겠습니까?`)){
    return
  }

  const res = await expelledRoomMember(props.userInfo.memberId, Number(props.roomId))
  if(res.data) {
    alert("추방이 완료되었습니다.")
  }
}

const isShowChangePermision = () => {
  emit('togglePermissionModal',true,props.userInfo)
}

const myInfo = computed(() => {
  return useMyInfo().getMyInfo
})
</script>

<template>
  <li class="user-card">
    <div class="info">
      <p><strong>이름</strong>: {{userInfo.name}}</p>
      <p><strong>이메일</strong>: {{userInfo.email}}</p>
      <p><strong>권한</strong>: {{userInfo.role}}</p>
    </div>
    <div class="actions" v-if="myInfo?.memberId === currentOwnerId && userInfo.role !== 'OWNER'">
      <button @click="isShowChangePermision" class="btn permission">권한변경</button>
      <button @click="fireUser" class="btn fire">추방하기</button>
    </div>
  </li>
</template>
<style scoped lang="scss">
$main-color: #ff6f61;
$text-color: #333;
$sub-text-color: #888;

.user-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  background: #fff;

  .info {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    font-size: 0.95rem;
    color: $text-color;

    strong {
      font-weight: bold;
    }
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .btn {
      padding: 0.5rem 1rem;
      border-radius: 6px;
      font-size: 0.95rem;
      font-family: 'nanum-5';
      cursor: pointer;
      transition: all 0.2s ease;
      font-weight: bold;
    }

    .permission {
      background-color: $main-color;
      color: white;
      border: none;

      &:hover {
        opacity: 0.9;
      }
    }

    .fire {
      background-color: white;
      color: $main-color;
      border: 1px solid $main-color;

      &:hover {
        background-color: $main-color;
        color: white;
      }
    }
  }
}
</style>
