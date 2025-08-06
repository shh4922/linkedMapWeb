<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'

const route = useRoute()

onMounted(()=>{
  const code = route.query.code as string
  console.info("code",code)
  // if (code) {
  //   const res = await axios.post('/api/auth/kakao', { code })
  //   localStorage.setItem('token', res.data.token)
  //   router.push('/') // 홈이나 메인 화면으로 이동
  // }
})


</script>

<template>
  <h1>카카오로그인</h1>
</template>

<style scoped lang="scss">

</style>
