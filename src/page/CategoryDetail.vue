<script setup lang="ts">

import Map from '@/components/Map.vue'
</script>

<template>
  <main>
<!--    <Map style="width: 100px; height: 100px"/>-->
    <section class="categoryInfo">
      <h2 class="title">빵 맛집</h2>

      <div class="info">
<!--        <p>설명</p>-->
        <p class="description">이세상 모든 빵순위를 위한 진짜 찐찐 맛집(description)</p>
      </div>

      <div class="subInfoContainer">
        <div class="subInfo">
          <p class="sub-head">카테고리 생성일</p>
          <p>2024년 12월 03일</p>
        </div>
        <div class="subInfo">
          <p class="sub-head">등록된 유저수</p>
          <p>5명</p>
        </div>
        <div class="subInfo">
          <p class="sub-head">등록된 마커수</p>
          <p>31개</p>
        </div>
      </div>

    </section>

    <p>등록된 유저 리스트</p>
    <ul>
      <li>
        <p>이름: 신현호</p>
        <p>이메일: gusgh4922@gmail.com</p>
        <p>권한: 방장</p>
      </li>
    </ul>

<!--    <p>등록된 마커 리스트</p>-->
<!--    <ul>-->

<!--    </ul>-->
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  //background-color: red;
  padding: 0 1rem;

  .categoryInfo {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-bottom: 2px solid black;

    .title {
      font-size: 2.5rem;
      font-family: nanum-5;
    }

    .info {

      p {
        font-size: 1.2rem;
      }
      .description {
        font-size: 1.8rem;
        font-family: nanum-5;
      }
    }

    .subInfoContainer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      .subInfo {
        display: flex;
        flex-direction: column;
        align-items: center;
        p {
          font-size: 1.2rem;
          font-family: nanum-4;
        }
        .sub-head {
          font-size: 1rem;
          font-family: nanum-3;
          color: gray;
        }
      }
    }
  }

  ul {
    width: 100%;
    background-color: red;
  }
}
</style>
