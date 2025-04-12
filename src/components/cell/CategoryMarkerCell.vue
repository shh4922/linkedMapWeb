<script setup lang="ts">
const toggleSettingModal = () => {
  alert("settingModal toggle")
}
</script>

<template>
  <li>
    <div class="item" style="width: 20%">
      <p class="name">이름</p>
      <p class="two">개쩌는 한식집</p>
    </div>

    <div class="item" style="width: 25%">
      <p class="name">설명</p>
      <p class="three">여기 개 맛도리 한식임..</p>
    </div>

    <div class="item" style="width: 25%">
      <p class="name">위치</p>
      <p class="three">중곡동 41-33</p>
    </div>

    <div class="item" style="width: 25%">
      <div class="subInfo">
        <p class="name">등록일: </p>
        <p class="one">25.04.02</p>
      </div>
      <div class="subInfo">
        <p class="name">만든사람 </p>
        <p class="one">신현호</p>
      </div>
    </div>
    <i class="pi pi-search" style="width: 5%;" @click="toggleSettingModal"/>
  </li>
</template>

<style scoped lang="scss">
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid lightgray;
  padding: 1rem 2rem;
  width: 100%;


  .item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

  }
  p {
    font-size: 1.2rem;
    font-family: nanum-5;
    word-break: break-word; // 길어진 단어 줄바꿈
    white-space: normal;    // 줄바꿈 허용
    text-align: left;       // 왼쪽 정렬이 더 자연스러울 수도 있음

  }
  .subInfo {
    gap: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

  }
  .name {
    color: gray;
    font-size: 1rem;
  }



}
</style>
