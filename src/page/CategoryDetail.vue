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
        <div class="info-head">
          <h2 class="title">빵 맛도리</h2>
          <button @click="deleteCategory">삭제하기</button>
<!--          <i class="pi pi-trash"></i>-->
        </div>
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
<!--        <button @click="deleteCategory">삭제하기</button>-->
<!--        <button class="getout" @click="deleteCategory">카테고리 나가기</button>-->
      </div>

    </section>

    <section class="userContainer">
      <p class="userListTitle">가입한 유저임</p>
      <ul>
        <CategoryUserCell />
<!--        <CategoryUserCell />-->
<!--        <CategoryUserCell />-->
      </ul>
    </section>


  </main>
</template>


<style scoped lang="scss">
$main-color: #ff6f61; // 오렌지 계열 메인 색상
$text-color: #333;
$sub-text-color: #888;

main {
  background-color: #ffffff;
  padding: 0 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .categoryInfo {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;

    .info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .info-head {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        button {
          font-size: 1rem;
          color: $main-color;
          border: 1px solid $main-color;
          background-color: white;
          padding: 0.4rem 1rem;
          border-radius: 0.5rem;
          font-family: 'nanum-5';
          font-weight: bold;
          cursor: pointer;

          &:hover {
            background-color: $main-color;
            color: white;
          }
        }
      }

      .title {
        font-size: 1.8rem;
        font-family: nanum-5;
        font-weight: bold;
        color: $text-color;
        margin-top: 1rem;
      }

      .description {
        font-size: 1rem;
        font-family: nanum-5;
        color: $sub-text-color;
        margin-top: 0.3rem;
      }
    }

    .subInfoContainer {
      display: flex;
      justify-content: space-between;
      gap: 1rem;

      .subInfo {
        flex: 1;
        background-color: white;
        border: 1px solid #eee;
        border-radius: 0.8rem;
        padding: 1rem;

        .sub-head {
          color: $sub-text-color;
          font-size: 0.85rem;
          margin-bottom: 0.3rem;
          font-family: nanum-5;
        }

        p:last-child {
          color: $text-color;
          font-size: 1.2rem;
          font-weight: bold;
          font-family: nanum-5;
        }
      }
    }

    .editCategory {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      margin-top: 1rem;

      .moveEditMarker,
      button {
        flex: 1;
        padding: 0.7rem 1rem;
        font-size: 1rem;
        border-radius: 0.7rem;
        font-weight: bold;
        font-family: nanum-5;
        border: none;
        cursor: pointer;
        background-color: $main-color;
        color: white;

        &:hover {
          opacity: 0.9;
        }
      }

      .getout {
        background-color: #bbb;
      }
    }
  }

  .userContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .userListTitle {
      font-family: nanum-5;
      font-size: 1.4rem;
      color: $text-color;
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }
  }
}
</style>


