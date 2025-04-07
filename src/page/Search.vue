<script setup lang="ts">
import { onMounted, ref } from 'vue'
import debounce from "lodash.debounce"
import { kakaoSearch, type SearchModel, type searchResponse } from '@/api/search.ts'
import SearchResult from '@/components/SearchResult.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchInput = ref<HTMLInputElement | null>(null); // input을 참조할 ref 선언
const searchResponse = ref<SearchModel[]>([])
onMounted(() => {
  if (searchInput.value) {
    searchInput.value.focus();
  }
});

const keyword = ref<string>('');
const debouncedSearch = debounce(() => {
  search()
}, 300) // 300ms 후 실행

const onInput = () => {
  debouncedSearch() // 매 input 시 debounce된 함수 호출
}
const search = async () => {
  const res = await kakaoSearch(keyword.value);
  const data = res.data as searchResponse
  searchResponse.value = data.documents
}

</script>

<template>
  <main>
    <div class="back">
      <div @click="router.go(-1)">
        <i class="pi pi-arrow-left"/>
        <span class="back-text">뒤로가기</span>
      </div>

      <input
        class="search"
        v-model="keyword"
        @input="onInput"
        placeholder="위치를 검색하세요"/>
      <i class="pi pi-search"/>
    </div>
    <p v-if="searchResponse.length === 0 && keyword !== '' ">없는곳같아</p>
    <ul v-else-if="searchResponse.length > 0">
      <SearchResult v-for="(result,index) in searchResponse" :key="index" :result="result" />
    </ul>
    <p v-else>검색해줘잉;;</p>


  </main>
</template>

<style scoped lang="scss">
main {
  width: 100%;
  height: 100%;

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
    .search {
      width: 100%;
      height: 100%;
      flex: 1;
      outline: none;
    }
  }



}
</style>
