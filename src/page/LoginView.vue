<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const login = () => {
  console.log('로그인 요청', email.value, password.value)
  // 실제 로그인 로직 처리
  router.push('/mypage')
}
</script>

<template>
  <div class="auth-container">
    <h1>로그인</h1>
    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="이메일" required />
      <input type="password" v-model="password" placeholder="비밀번호" required />
      <button type="submit">로그인</button>
    </form>
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

  form {
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
