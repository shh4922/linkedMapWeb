<script setup lang="ts">
const isShowChangePermision = () => {
  alert("권한변경 하는 모달 띄우기")
}

const fireUser = () => {
  alert("유저 추방하기")
}
</script>

<template>
  <li>
    <div>
      <p>이름: 신현호</p>
      <p>이메일: gusgh4922@gmail.com</p>
      <p>권한: 방장</p>
    </div>
    <div class="option">
      <p @click="isShowChangePermision" class="permission">권한변경</p>
      <p @click="fireUser" class="fire">추방하기</p>
    </div>
  </li>
</template>

<style scoped lang="scss">
li {
  font-size: 1rem;
  font-family: nanum-5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 3px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;
  //padding: 0 1rem;

  .permission {
    color: white;
    background-color: coral;
    padding: 0.5rem 1rem;
    border-radius: 4px;
  }
  .fire {
    //color: red;
    color: white;
    background-color: red;
    padding: 0.5rem 1rem;
    border-radius: 4px;
  }
  .option {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
