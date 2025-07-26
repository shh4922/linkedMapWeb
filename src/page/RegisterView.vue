<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/api/user.ts'
import type { AxiosError } from 'axios'
import { useToastStore } from '@/store/useToastMessage.ts'
import { useRegister } from '@/api/auth/auth.query.ts'
import { useExpelledRoomMember } from '@/api/room/room.query.ts'
import router from '@/router'

const registerInput = reactive({
  name : "",
  email : "",
  password : "",
})

const {mutate: register} = useRegister()
const toastStore = useToastStore()

const submit = async() => {
  if(registerInput.name === '' || registerInput.email === '' || registerInput.password === '') {
    toastStore.show("정보를 모두 입력하세요.",'error')
    return
  }
  const vars = {
    email: registerInput.email,
    password: registerInput.password,
    userName: registerInput.name
  }
  register(vars,{
    onSuccess() {
      router.push({
        name:'home'
      })
      toastStore.show('가입에 완료되었습니다.')
    },
    onError(error) {
        toastStore.show(error.message,'error')
    },
  })
}
</script>

<template>
  <div class="auth-container">
    <h1>회원가입</h1>
    <div class="loginForm">
      <input type="text" v-model="registerInput.name" placeholder="이름" required />
      <input type="email" v-model="registerInput.email" placeholder="이메일" required />
      <input type="password" v-model="registerInput.password" placeholder="비밀번호 최소6자 이상" required />
      <button @click="submit">회원가입</button>
    </div>

    <p class="link-text">
      이미 계정이 있으신가요?
      <router-link to="login">로그인</router-link>
    </p>

    <!-- 장난스러운 안내 문구 -->
    <p class="privacy-joke">제 서비스는 개인정보 진짜 최소화합니다 진짜임;;</p>
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

  .privacy-joke {
    margin-top: 2rem;
    font-size: 0.9rem;
    color: #888;
    font-style: italic;
  }
}
</style>
