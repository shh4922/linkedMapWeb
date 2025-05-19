<script setup lang="ts">

import type { SearchModel } from '@/api/auth/search.ts'
import { useCurrentPosition } from '@/store/useCurrentPosition.ts'
import { getDistanceKm } from '../../utils/common.ts'
import type { LatLng } from '@/components/map/LatLng.ts'
import { onMounted } from 'vue'

const props = defineProps<{
  result: SearchModel
  index: number
}>()
const storeLatLng: LatLng = {
  lat: Number(props.result.y),
  lng: Number(props.result.x)
}

const emit = defineEmits(['showAddModal'])


const showAddModal = () => {
  emit('showAddModal',props.index)
}

const useCurrentPositionStore = useCurrentPosition()

</script>

<template>
  <li class="search-result" @click="showAddModal">

    <div class="search-info">
      <div class="store-info">
        <p class="placeName">{{result.place_name}}</p>
        <p class="groupName">{{result.category_group_name}}</p>
      </div>
      <p>{{result.road_address_name}}</p>
    </div>
    <p class="distanc" v-if="useCurrentPositionStore.position !== null ">{{getDistanceKm(useCurrentPositionStore.position,storeLatLng).toFixed(2)}} km</p>
    <p v-if="useCurrentPositionStore.position === null" class="distanc" >위치를 공유하고 거리를 확인하세요!</p>
  </li>
</template>

<style scoped lang="scss">
.search-result {
  display: flex;
  width: 100%;
  margin-bottom: 0.75rem;
  padding: 1rem;
  border-bottom: 1px solid #ffe8cc;
  background-color: #fffdf9;
  border-radius: 0.75rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #fff3e0;
    cursor: pointer;
  }

  .distanc {
    width: 25%;
    font-family: 'nanum-3';
    font-size: 0.95rem;
    color: #ff922b;
    display: flex;
    align-items: center;
  }

  .search-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.3rem;

    .store-info {
      display: flex;
      align-items: baseline;
      gap: 0.6rem;

      .placeName {
        font-family: 'nanum-5';
        font-size: 1.1rem;
        color: #222;
      }

      .groupName {
        font-family: 'nanum-3';
        font-size: 0.9rem;
        color: #ffae6d;
      }
    }

    p {
      font-family: 'nanum-3';
      font-size: 0.9rem;
      color: #555;
    }
  }
}

</style>
