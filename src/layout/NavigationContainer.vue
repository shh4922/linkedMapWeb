<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="navigation-container">
    <div class="back" @click="router.go(-1)">
      <i class="pi pi-arrow-left"></i>
      <p>뒤로가기</p>
    </div>
    <router-view />
  </div>
</template>

<style scoped lang="scss">
@import url('https://cdn.jsdelivr.net/gh/hiun/NanumSquareRound@1.0/NanumSquareRound.css');
@import url('https://cdn.jsdelivr.net/npm/pretendard@1.3.6/dist/web/static/pretendard.css');

.navigation-container {
  width: 100%;
  height: 100%;
  position: relative;
  font-family: 'Pretendard', sans-serif;

  .back {
    height: 56px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0 1rem;
    margin-bottom: 1rem;
    border-radius: 12px;
    background-color: #fff;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: all 0.2s ease;
    color: #ff914d;

    i {
      font-size: 1.1rem;
    }

    p {
      font-size: 1rem;
      font-family: 'NanumSquareRound', sans-serif;
      font-weight: 700;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
    }
  }
}
</style>
