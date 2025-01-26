<script setup lang="ts">
import Header from '@/components/Header.vue'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
const router = useRouter()

const searchInput = ref<HTMLInputElement | null>(null); // input을 참조할 ref 선언

onMounted(() => {
  if (searchInput.value) {
    searchInput.value.focus();
  }
});
</script>

<template>
  <main>
<!--    <Header />-->
    <h1>검색임ㅋㅋ</h1>
    <button @click="()=>{router.go(-1)}">버튼</button>
  </main>

</template>

<style scoped>
main {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}
</style>
