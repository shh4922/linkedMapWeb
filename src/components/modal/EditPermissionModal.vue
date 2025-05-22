<script setup lang="ts">
import type { RoomMember } from '@/api/category/category.model.ts'
import { ref } from 'vue'
import { updatePermission } from '@/api/permission/permission.ts'

const props = defineProps<{
  roomId: string
  roomMember: RoomMember|null
}>()

const emit = defineEmits(['togglePermissionModal'])
const closeModal = () => {
  emit('togglePermissionModal', false)
}
const permission = ref<string>(props.roomMember?.role ?? "")

const changePermission = async () => {
  console.log("sadasd")
  if(props.roomMember === null) return

  const res = await updatePermission(props.roomMember.memberId, Number(props.roomId), permission.value)
  console.log(res)

  if(res.data === '-1') {
    alert("실패")
  }
  if (res.data === '0') {
    alert("성공")
  }

}
</script>

<template>
  <article>
    <div class="info">
      <p><strong>이름</strong>: {{ roomMember?.name ?? "" }}}</p>
      <p><strong>이메일</strong>: {{ roomMember?.email }}</p>
      <p><strong>권한</strong>: {{ roomMember?.role}}</p>
    </div>

    <select v-model="permission">
      <option value="MANAGER">매니저</option>
      <option value="USER">일반</option>
      <option value="READ_ONLY">읽기전용</option>
    </select>

    <div>
      <button @click="changePermission">save</button>
      <button @click="closeModal">cancle</button>
    </div>
  </article>
</template>

<style scoped lang="scss"></style>
