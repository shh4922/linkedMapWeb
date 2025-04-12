<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import debounce from "lodash.debounce"
import { kakaoSearch, type SearchModel, type searchResponse } from '@/api/search.ts'
import SearchResultCell from '@/components/cell/SearchResultCell.vue'
import { useRouter } from 'vue-router'
import { VueSpinner } from 'vue3-spinners'
import AddMarkerModal from '@/components/modal/AddMarkerModal.vue'



const router = useRouter()
const isLoading = ref(false)
const searchInput = ref<HTMLInputElement | null>(null); // input을 참조할 ref 선언
const searchResponse = ref<SearchModel[]>([])
const isShowAddModal = ref(false)
const selecteSearchResult = ref<SearchModel|null>(null)

onMounted(() => {
  if (searchInput.value) {
    searchInput.value.focus();
  }
});

watch(isShowAddModal, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

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

const toggleAddModal = (selectedSearchIndex:number) => {
  selecteSearchResult.value = searchResponse.value[selectedSearchIndex]
  isShowAddModal.value = !isShowAddModal.value
}

</script>

<template>
  <main :class="{ 'no-events': isShowAddModal }">
    <div
      v-if="isShowAddModal && selecteSearchResult !== null"
      class="modal-overlay"
      @click.self="isShowAddModal = false"
    >
      <AddMarkerModal
        class="addMarkerModal"
        :result="selecteSearchResult"
        @closeAddModal="isShowAddModal = false"
      />
    </div>
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
      <SearchResultCell v-for="(result,index) in searchResponse" :key="index" :result="result" :index="index" @showAddModal="toggleAddModal"/>
    </ul>
    <p v-else class="default">검색을 해보셔유</p>
  </main>
</template>

<style scoped lang="scss">
.addMarkerModal {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  z-index: 10;
  width: 80%;
  max-width: 500px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4); // 회색 배경
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
  pointer-events: auto; // 모달 쪽은 이벤트 다시 활성화

}
main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  pointer-events: auto; // 기본 상태에서는 이벤트 가능
  &.no-events {
    pointer-events: none; // 모달이 뜨면 이벤트 막기
  }


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
