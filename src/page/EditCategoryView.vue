<script setup lang="ts">

import CategoryCell from '@/components/cell/CategoryCell.vue'
</script>

<template>
  <main>
    <h3>내가 속한 카테고리</h3>
    <ul>
      <CategoryCell/>
      <CategoryCell/>
      <CategoryCell/>
    </ul>
<!--    <div class="noCategory">-->
<!--      <p>님 카테고리 없는듯</p>-->
<!--      <p>추가하고 좀 만들어보셈</p>-->
<!--      <router-link to="add">카테고리 추가하러 가기버튼임 눌러보셈</router-link>-->
<!--    </div>-->

  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  padding: 0 1rem;

  h3 {
    font-family: "nanum-5";
    font-size: 1rem;
    font-weight: 600;
    margin: 1.2rem 0 0.8rem;
    color: #222;
  }

  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .noCategory {
    margin-top: 2rem;
    text-align: center;

    p {
      font-size: 1rem;
      font-family: "nanum-5";
      color: #444;
      margin: 0.2rem 0;
    }

    a {
      font-size: 1rem;
      font-family: "nanum-5";
      color: #ff774d;
      text-decoration: underline;
      display: inline-block;
      margin-top: 0.5rem;
    }
  }
}


</style>
