<script setup lang="ts">
import { useRouter } from 'vue-router'

const router =useRouter()
</script>

<template>
  <div class="navigation-container">
    <div class="back" @click="router.go(-1)">
      <i class="pi pi-arrow-left"></i>
      <p>뒤로가기</p>
    </div>
    <router-view/>
  </div>
</template>

<style scoped lang="scss">
.navigation-container {
  width: 100%;
  height: 100%;
  position: relative;
  //background-color: red;

  .back {
    height: 8%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 0 1rem;
    margin-bottom: 1rem;
    color: gray;

    i {
      margin-right: 0.5rem;
    }
  }
}

</style>
