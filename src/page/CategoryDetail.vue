<script setup lang="ts">

import CategoryUserCell from '@/components/cell/CategoryUserCell.vue'
const deleteCategory = () => {
  alert("카테고리 삭제")
}
</script>

<template>
  <main>
    <section class="categoryInfo">
      <div class="info">
        <h2 class="title">빵 맛도리</h2>
        <p class="description">이세상 모든 빵순위를 위한 진짜 찐찐 맛집(description)</p>
      </div>

      <div class="subInfoContainer">
        <div class="subInfo">
          <p class="sub-head">카테고리 생성일</p>
          <p>2024년 12월 03일</p>
        </div>

        <div class="subInfo">
          <p class="sub-head">가입한 유저수</p>
          <p>5명</p>
        </div>

        <div class="subInfo">
          <p class="sub-head">등록된 마커수</p>
          <p>31개</p>
        </div>
      </div>
      <div class="editCategory">
        <router-link :to="{name:'editCategoryMarker'}" class="moveEditMarker">마커 관리하러 가기</router-link>
        <button @click="deleteCategory">삭제하기</button>
<!--        <button class="getout" @click="deleteCategory">카테고리 나가기</button>-->
      </div>

    </section>

    <section class="userContainer">
      <p class="userListTitle">가입한 유저임</p>
      <ul>
        <CategoryUserCell />
        <CategoryUserCell />
        <CategoryUserCell />
      </ul>
    </section>


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
    margin-bottom: 1rem;



    .info {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;

      .title {
        font-size: 2rem;
        font-family: nanum-5;
        width: 40%;
        word-break: break-word; // 길어진 단어 줄바꿈
        white-space: normal;    // 줄바꿈 허용
        text-align: left;       // 왼쪽 정렬이 더 자연스러울 수도 있음
      }

      .description {
        font-size: 1.5rem;
        font-family: nanum-5;
        color: gray;
        flex: 1;
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
        align-items: flex-start;
        font-family: nanum-5;
        font-size: 1.3rem;

        .sub-head {
          color: gray;
          font-size: 1rem;
        }
      }
    }

    .editCategory {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;

      .moveEditMarker {
        text-align: center;
        background-color: coral;
        padding: 1rem;
        border-radius: 0.5rem;
        color: #fff;
        flex: 1;
        font-size: 1rem;
        font-family: nanum-5;
      }
      button {
        outline: none;
        padding: 1.2rem 1rem;
        color: white;
        background-color: red;
        font-size: 1rem;
        font-family: nanum-5;
        border-radius: 0.5rem;
      }
      .getout {
        flex: 1;
      }
    }

  }

  .userContainer {
    display: flex;
    flex-direction: column;
    width: 100%;
    //background-color: red;
    gap: 1rem;

    .userListTitle {
      font-family: nanum-5;
      font-size: 1.5rem;
    }
    ul {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1rem;


    }
  }

}
</style>
