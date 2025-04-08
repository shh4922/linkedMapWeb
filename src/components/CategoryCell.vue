<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const moveToDetail = () => {
  router.push({name: 'categoryDetail', params: {id: 1}})
}
</script>

<template>
  <li @click="moveToDetail">
    <p class="title">빵 맛집</p>
    <p class="discription">이세상 모든 빵순위를 위한 진짜 찐찐 맛집(description)</p>
    <div class="category-info">

      <p><span>방장:</span> 신현호</p>
      <p><span>참여인원:</span> 2명</p>
      <p><span>마커수:</span> 31개</p>
    </div>
  </li>
</template>

<style scoped lang="scss">
li {
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  font-family: "nanum-5";
  gap: 1rem;
  border: 3px solid black;
  border-radius: 6px;
  margin-bottom: 1rem;

  .title {
    width: 30%;
    font-size: 1.5rem;

  }
  .discription {
    width: 40%;
    font-size: 1rem;
    font-family: "nanum-4";
    color: gray;
  }
  .category-info {
    width: 30%;
    font-size: 1.2rem;
    span {
      font-family: "nanum-4";

    }
    p {
      font-family: "nanum-5";
    }
  }
}
</style>
