<script setup lang="ts">
const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_REST
const REDIRECT_URI = 'http://localhost:5173/kakao'

const loginWithKakao = () => {
  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`
  window.location.href = kakaoUrl
}
</script>

<template>
  <button @click="loginWithKakao">카카오로그인</button>
</template>

<style scoped lang="scss">

</style>
