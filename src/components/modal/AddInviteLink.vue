<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { postInviteLink } from '@/api/invite/invite.ts'

const props = defineProps<{
  roomId: string
}>()

const inviteLink = ref<string|null>(null)

onMounted(()=> {
  createInviteLink()
})

const createInviteLink = async () => {
  const res = await postInviteLink(props.roomId)
  console.log(res)
  if(res.status !== 200) return
  inviteLink.value = res.data.url
  console.log("만든 링크는 ",inviteLink.value)
}

</script>

<template>
  <div v>
    <h1>초대링크 만들기</h1>
    <p v-if="inviteLink !== null">{{inviteLink}}</p>
    <p>링크복사하기</p>
  </div>
</template>

<style scoped lang="scss">

</style>
