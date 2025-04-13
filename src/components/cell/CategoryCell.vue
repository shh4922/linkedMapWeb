<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const moveToDetail = () => {
  router.push({name: 'categoryDetail', params: {id: 1}})
}
</script>

<template>
  <li @click="moveToDetail" class="category-card">
    <div class="title">빵 맛집</div>
    <div class="description">이세상 모든 빵순이를 위한 진짜 찐찐 맛집</div>
    <div class="category-info">
      <p><span>방장</span>신현호</p>
      <p><span>참여인원</span>2명</p>
      <p><span>마커수</span>31개</p>
    </div>
  </li>
</template>

<style scoped lang="scss">
$main-orange: #ff774d;
$light-orange: #fff9f6;
$text-main: #1e1e1e;
$text-muted: #999;
$border-color: #ffe1d6;

.category-card {
  display: flex;
  flex-direction: column;
  padding: 1rem 1.2rem;
  border: 1px solid $border-color;
  border-radius: 12px;
  background: #fff;
  cursor: pointer;
  transition: background 0.2s ease;
  font-family: "nanum-5";
  gap: 0.6rem;

  &:hover {
    background: $light-orange;
  }

  .title {
    font-size: 1rem;
    font-weight: 600;
    color: $text-main;
  }

  .description {
    font-size: 0.9rem;
    color: $text-muted;
    line-height: 1.4;
  }

  .category-info {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 0.82rem;
    color: $text-main;

    p {
      margin: 0.2rem 0;
      span {
        font-weight: 500;
        margin-right: 0.4rem;
        color: $text-muted;
      }
    }
  }
}
</style>
