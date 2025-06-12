<script setup lang="ts">

import { ref } from 'vue'
import { postInviteLink } from '@/api/invite/invite.ts'
import { useToastStore } from '@/store/useToastMessage.ts'

const props = defineProps<{
  roomId: string
}>()

const inviteLink = ref<string|null>(null)
const toastStore = useToastStore()


const getInviteLink = async () => {
  const res = await postInviteLink(props.roomId)
  if(res.data) {
    inviteLink.value = res.data.url
    try {
      await navigator.clipboard.writeText(inviteLink.value)
      toastStore.show("복사되었습니다",)
    } catch (err) {
      toastStore.show("키보드의 ctrl+C 또는 마우스 오른쪽의 복사하기를 이용해주세요.",'error')
    }
  }
}


</script>

<template>
  <article class="invite-link-modal">
    <header class="modal-header">
      <h4>초대 링크 공유하기</h4>
      <button class="close-btn" @click="$emit('close')">×</button>
    </header>

    <div class="modal-body">
      <p v-if="inviteLink" class="link-text">{{ inviteLink }}</p>
    </div>

    <footer class="modal-footer" v-if="!inviteLink">
      <button class="action-btn" @click="getInviteLink">
        링크 생성 및 복사
      </button>
    </footer>

    <ToastMessage ref="toastMessage"/>
  </article>
</template>

<style scoped lang="scss">
.invite-link-modal {
  display: flex;
  flex-direction: column;
  width: 320px;
  max-width: 90%;
  background: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: nanum-5;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;

  h4 {
    margin: 0;
    font-size: 1.25rem;
    color: coral;
  }
  .close-btn {
    background: none;
    border: none;
    font-size: 1.25rem;
    color: coral;
    cursor: pointer;
    line-height: 1;
  }
}

.modal-body {
  padding: 1rem;

  .link-text {
    width: 100%;
    word-break: break-all;
    padding: 0.75rem;
    background: #f9f9f9;
    border-radius: 0.5rem;
    font-size: 0.95rem;
    color: #333;
  }
}

.modal-footer {
  padding: 1rem;
  text-align: center;

  .action-btn {
    width: 100%;
    padding: 0.75rem;
    background-color: coral;
    color: #fff;
    font-family: nanum-4;
    font-size: 1rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.85;
    }
  }
}
</style>

