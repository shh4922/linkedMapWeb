<script setup lang="ts">
import type { SearchModel } from '@/api/search.ts'
import { onMounted } from 'vue'
import Map from '@/components/map/Map.vue'


const emit =defineEmits(['closeAddModal'])
const closeAddModal = () => {
  emit('closeAddModal')
}
const props = defineProps<{
  result: SearchModel
}>()

onMounted(()=> {
  console.log(props.result)
})
</script>

<template>
  <article>
    <section class="head">
      <p>마커를 추가하세염</p>
      <i class="pi pi-times" @click="closeAddModal"></i>
    </section>

    <Map class="map" style="width: 100%; height: 250px"/>

    <section class="searchInfo">
      <div class="storeName">
        <p class="sub">상호명</p>
        <p class="result">{{result.place_name}}</p>
      </div>

      <div class="storeName">
        <p class="sub">분류</p>
        <p class="result">{{result.category_name}}</p>
      </div>

      <div>
        <p class="sub">주소</p>
        <p class="result">{{result.address_name}}</p>
      </div>

      <div>
        <p class="sub">도로명 주소</p>
        <p class="result">{{result.road_address_name}}</p>
      </div>

      <div>
        <p class="sub">링크</p>
        <a class="result" :href="result.place_url" target="_blank" rel="noopener noreferrer">카카오맵 리뷰보기</a>
      </div>

      <div>
        <p class="sub">추가할 카테고리</p>
        <select class="result">
          <option>카테고리1</option>
          <option>카테고리1</option>
          <option>카테고리1</option>
          <option>카테고리1</option>
          <option>카테고리1</option>
        </select>
      </div>
    </section>

    <button @click="closeAddModal" class="save">저장하기</button>
  </article>
</template>

<style scoped lang="scss">
article {
  font-family: nanum-5;
}
.map {
  width: 100%;
  height: 250px;
  margin-bottom: 2rem;
}
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2rem;

  p {
    font-size: 1.3rem;
  }

}

.searchInfo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    font-size: 1.2rem;

    .sub {
      color: gray;
      width: 30%;
      //background-color: chartreuse;
    }
    .result {
      flex: 1;
    }
  }
}

select {
  padding: 0.5rem;
  border-radius: 0.5rem;
}
.save {
  width: 100%;
  outline: none;
  border: none;
  background-color: coral;
  color: white;
  font-size: 1.2rem;
  font-family: nanum-4;
  padding: 1rem 0.5rem;
  border-radius: 0.4rem;
}

</style>
