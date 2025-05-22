<script setup lang="ts">
import type { RoomMember } from '@/api/category/category.model.ts'
import { computed, ref } from 'vue'
import { useMyInfo } from '@/store/myInfoStore.ts'
import EditPermissionModal from '@/components/modal/EditPermissionModal.vue'

const emit = defineEmits(['togglePermissionModal'])

const isShowChangePermision = () => {
  emit('togglePermissionModal',true,props.userInfo)
}

const fireUser = () => {
  alert("유저 추방하기")
}

const props = defineProps<{
  userInfo: RoomMember
  currentOwnerId: number
}>()

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
<!--<style scoped lang="scss">-->
<!--.user-card {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  align-items: center;-->
<!--  border: 2px solid #ddd;-->
<!--  border-radius: 10px;-->
<!--  padding: 1rem;-->
<!--  margin-bottom: 1rem;-->
<!--  background: #fff;-->
<!--  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);-->
<!--  transition: transform 0.2s;-->

<!--  &:hover {-->
<!--    transform: scale(1.01);-->
<!--  }-->

<!--  .info {-->
<!--    display: flex;-->
<!--    flex-direction: column;-->
<!--    gap: 0.3rem;-->
<!--    font-size: 0.95rem;-->
<!--    color: #333;-->
<!--  }-->

<!--  .actions {-->
<!--    display: flex;-->
<!--    flex-direction: column;-->
<!--    gap: 0.5rem;-->

<!--    .btn {-->
<!--      padding: 0.7rem 1rem;-->
<!--      border: none;-->
<!--      border-radius: 6px;-->
<!--      color: white;-->
<!--      cursor: pointer;-->
<!--      font-size: 1rem;-->
<!--      transition: background-color 0.3s ease;-->
<!--    }-->

<!--    .permission {-->
<!--      background-color: #3B82F6; // 파란색-->
<!--    }-->

<!--    .fire {-->
<!--      color: #DC2626;-->
<!--      border: 1px solid #DC2626;-->
<!--      background-color: white;-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</style>-->
