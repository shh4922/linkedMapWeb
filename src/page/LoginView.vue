<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/auth/auth.ts'
import type { DefaultError } from '@/api/DefaultResponse.ts'
import type { AxiosError } from 'axios'


const loginInput = reactive({
  email: '',
  password: ''
})

const router = useRouter()

const submit = async () => {
  const res = await login(loginInput.email, loginInput.password)
  if(res.error) {
    if(res.error?.status === 400) {
      alert("이메일 또는 패스워드가 잘못되었습니다")
    }
    if(res.error?.status === 500) {
      alert("예기치못한 에러가 발생했습니다.")
    }
    return
  }
  localStorage.setItem('accessToken', res.data?.data?.accessToken ?? "")
  router.push({name:'home'})
}

</script>

<template>
  <div class="auth-container">
    <h1>로그인</h1>
    <div class="loginForm" >
      <input type="email" v-model="loginInput.email" placeholder="이메일" required />
      <input type="password" v-model="loginInput.password" placeholder="비밀번호" required />
      <button @click="submit">로그인</button>
    </div>
    <p class="link-text">
      아직 계정이 없으신가요?
      <router-link :to="{name:'register'}">회원가입</router-link>
    </p>
  </div>
</template>

<style scoped lang="scss">
.auth-container {
  max-width: 100%;
  margin: 3rem 2rem;
  padding: 2rem;
  border: 1px solid #ffe1d6;
  background-color: #fff8f5;
  border-radius: 12px;
  text-align: center;
  font-family: "nanum-5";

  h1 {
    color: #ff774d;
    margin-bottom: 2rem;
  }

  .loginForm {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
      padding: 0.8rem;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 1rem;
    }

    button {
      background-color: #ff774d;
      color: white;
      padding: 0.8rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background-color: #ff6335;
      }
    }
  }

  .link-text {
    margin-top: 1.5rem;
    color: #555;

    a {
      color: #ff774d;
      text-decoration: underline;
      margin-left: 0.3rem;
    }
  }
}
</style>
