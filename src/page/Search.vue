<script setup lang="ts">
import { onMounted, ref } from 'vue'
import debounce from "lodash.debounce"

const searchInput = ref<HTMLInputElement | null>(null); // input을 참조할 ref 선언

onMounted(() => {
  if (searchInput.value) {
    searchInput.value.focus();
  }
});

const keyword = ref<string>('');
const debouncedSearch = debounce(() => {
  console.log(keyword.value) // 여기서 검색 API 호출 가능
}, 300) // 300ms 후 실행

const onInput = () => {
  debouncedSearch() // 매 input 시 debounce된 함수 호출
}
</script>

<template>
  <main>
    <input
      class="search"
      v-model="keyword"
      @input="onInput"
      placeholder="위치를 검색하세요"/>
    <ul>
      <li v-for="(index) in 10">
        <p>{{index}}</p>
      </li>
    </ul>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  height: 100%;
  background-color: #4caf50;

  .search {
    width: 100%;
    height: 4%;
  }
}
</style>
