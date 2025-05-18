<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { useMyInfo } from '@/store/myInfoStore.ts'

const route = useRoute()
const myInfo = useMyInfo()

onMounted(()=> {
  console.log(myInfo.getMyInfo)
  console.log(route.params)
})
</script>

<template>
  <div>
    <h1>초대 링크 받은 페이지</h1>

  </div>
</template>

<style scoped lang="scss">

</style>
