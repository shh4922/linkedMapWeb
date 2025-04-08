<script setup lang="ts">
import { onMounted, ref } from 'vue'
import debounce from "lodash.debounce"
import { kakaoSearch, type SearchModel, type searchResponse } from '@/api/search.ts'
import SearchResult from '@/components/SearchResult.vue'
import { useRouter } from 'vue-router'
import { VueSpinner } from 'vue3-spinners'



const router = useRouter()
const isLoading = ref(false)
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
  isLoading.value = true
  debouncedSearch() // 매 input 시 debounce된 함수 호출
}
const search = async () => {
  const res = await kakaoSearch(keyword.value);
  isLoading.value = false
  const data = res.data as searchResponse
  searchResponse.value = data.documents
}

</script>

<template>
  <main>
    <div class="back">
      <div class="back-icon" @click="router.go(-1)">
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


    <VueSpinner v-if="isLoading" size="20" color="green" class="loading" />
    <p class="none-result" v-else-if="searchResponse.length === 0 && keyword !== '' ">없음;</p>
    <ul class="result-list" v-else-if="searchResponse.length > 0">
      <SearchResult v-for="(result,index) in searchResponse" :key="index" :result="result" />
    </ul>
    <p v-else class="default">검색을 해보셔유</p>

  </main>
</template>

<style scoped lang="scss">
main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .back {
    width: 100%;
    height: 8%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 1px;
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 0 1rem;
    margin-bottom: 1rem;
    color: gray;

    .back-icon {
      display: flex;
      align-items: center;
    }
    i {
      margin-right: 0.5rem;
      font-weight: bold;
      font-size: 1.5rem;
    }
    span {
      font-family: nanum-5;
    }
    .search {
      width: 100%;
      height: 100%;
      flex: 1;
      outline: none;
    }
  }

  .result-list {
    width: 100%;
  }
  .loading {
    margin-top: 2rem;
  }
  p {
    margin-top: 2rem;
    font-family: "nanum-5";
    font-size: 1.4rem;
  }



}
</style>
