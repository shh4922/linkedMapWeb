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
  align-items: flex-start;
  padding: 0 1rem;
  h3 {
    font-family: "nanum-5";
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .noCategory {
    margin-top: 1rem;
    p {
      font-size: 2rem;
      font-family: nanum-5;
    }
    a {
      font-size: 2.5rem;
      font-family: nanum-5;
      color: dodgerblue;
    }
  }


  ul {
    //padding: 1rem;
    width: 100%;
  }

}


</style>
