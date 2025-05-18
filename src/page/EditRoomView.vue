<script setup lang="ts">

import RoomCell from '@/components/cell/RoomCell.vue'
import { useFetchMyRoomList } from '@/api/category/category.query.ts'

const {data:roomList} = useFetchMyRoomList()

</script>

<template>
  <main>
    <div class="head">
      <h3>내가 속한 그룹</h3>
      <router-link :to="{name:'createCategory'}">그룹 추가하기</router-link>
    </div>
    <div class="noCategory" v-if="roomList?.data.length === 0">
      <p>님 그룹이 없는듯</p>
      <p>추가하고 좀 만들어보셈</p>
      <router-link to="add">그룹 만들기 버튼임 눌러보셈</router-link>
    </div>
    <ul v-else>
      <RoomCell v-for="(room, index) in roomList?.data" :key="index" :room="room"/>
    </ul>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      font-family: "nanum-5";
      font-size: 1rem;
      font-weight: 600;
      margin: 1.2rem 0 0.8rem;
      color: #222;
    }
    a {
      font-family: "nanum-5";
      font-size: 1rem;
      font-weight: 600;
      margin: 1.2rem 0 0.8rem;
      color: #ff774d;
    }
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
