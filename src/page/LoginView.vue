<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/auth/auth.ts'
import type { DefaultError } from '@/api/DefaultResponse.ts'
import type { AxiosError } from 'axios'
import { fetchMyInfo } from '@/api/user/user.ts'
import { useMyInfo } from '@/store/myInfoStore.ts'
import { useToastStore } from '@/store/useToastMessage.ts'
import { useLogin } from '@/api/auth/auth.query.ts'

const myInfoStore = useMyInfo()
const { mutate:login,isSuccess } = useLogin()
const loginInput = reactive({
  email: '',
  password: '',
})
const toastMessage = useToastStore()
const router = useRouter()

const submit = async () => {
  if(loginInput.email ==='' || loginInput.password === '') {
    toastMessage.show('빈칸을 입력하세요', 'error')
  }
  const vars = {
    email:loginInput.email,
    password:loginInput.password
  }

  login(vars,{
    onSuccess(data, variables, context) {
      localStorage.setItem('accessToken', data.accessToken ?? '')
      getMyInfo()
    },
    onError(error, variables, context) {
      toastMessage.show(error.message, 'error')
      return
    },
  })

}

const getMyInfo = async () => {
  if (
    localStorage.getItem('accessToken') === null ||
    localStorage.getItem('accessToken') === undefined
  ) {
    return
  }

  const res = await fetchMyInfo()
  if (res.data) {
    myInfoStore.setMyInfo(res.data)
    router.push({ name: 'home' })
    toastMessage.show('로그인완료',)
  }
  return
}
</script>

<template>
  <div class="auth-container">
    <h1>로그인</h1>
    <div class="loginForm">
      <input type="email" v-model="loginInput.email" placeholder="이메일" required />
      <input type="password" v-model="loginInput.password" placeholder="비밀번호" required />
      <button @click="submit">로그인</button>
    </div>
    <p class="link-text">
      아직 계정이 없으신가요?
      <router-link :to="{ name: 'register' }">회원가입</router-link>
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
  font-family: 'nanum-5';

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
