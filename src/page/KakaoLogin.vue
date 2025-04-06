<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import axios from 'axios'

const route = useRoute()

onMounted(()=>{
  const code = route.query.code as string
  if(code){
    getTokenWithCode(code)
  }
})

async function getTokenWithCode(code: string){
  const params = {
    code: code
  }
  const res = await axios.get('http://localhost:8080/api/v1/kakao/auth', {
    params: params
  })
  console.log(res)
}

</script>

<template>
  <h1>카카오 로그인</h1>
</template>

<style scoped>

</style>
