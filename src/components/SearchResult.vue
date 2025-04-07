<script setup lang="ts">

import type { SearchModel } from '@/api/search.ts'

const props = defineProps<{
  result: SearchModel
}>()

const moveTo = () => {
  console.log('moveTo', props.result)
}
</script>

<template>
  <li class="search-result" @click="moveTo">
    <p class="distanc" v-if="result.distance !== '' ">{{result.distance}} km</p>
    <div class="search-info">
      <div class="store-info">
        <p>{{result.place_name}}</p>
        <p>{{result.category_group_name}}</p>
      </div>
      <p>{{result.road_address_name}}</p>
    </div>
    <p class="distanc" v-if="result.distance === ''">위치를 공유하고 거리를 확인하세요!</p>
  </li>
</template>

<style scoped lang="scss">
.search-result {
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #e4e4e4;

  .distanc {
    width: 30%;
  }

  .search-info {
    flex: 1;
    display: flex;
    flex-direction: column;

    .store-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }

}
</style>
