<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Category, Room } from '@/api/room/room.model.ts'

const router = useRouter()
const moveToDetail = () => {
  router.push({name: 'roomDetail', params: {roomId: props.room.roomId}})
}

const props = defineProps<{
  room: Room
}>()
</script>

<template>
  <li @click="moveToDetail" class="container">
    <img class="roomImage" src="https://recipe1.ezmember.co.kr/cache/recipe/2017/11/21/8cb4b9f30e3570f4ff93dd3303eeff7f1.jpg"/>

    <div class="category-card">
      <div class="title">{{props.room.roomName }}</div>
      <div class="description">{{props.room.roomDescription}}</div>
      <div class="category-info">
        <p><span>방장</span>{{props.room.currentOwnerName}}</p>
        <p><span>참여인원</span>{{props.room.memberCount}}</p>
        <p><span>마커수</span>{{props.room.markerCount}}개</p>
      </div>
    </div>

  </li>
</template>

<style scoped lang="scss">
$main-orange: #ff774d;
$light-orange: #fff9f6;
$text-main: #1e1e1e;
$text-muted: #999;
$border-color: #ffe1d6;

.container {
  display: flex;
  align-items: center;
  padding: 1rem 1.2rem;
  border: 1px solid $border-color;
  border-radius: 12px;
  background: #fff;
  cursor: pointer;
  transition: background 0.2s ease;
  font-family: "nanum-5";
  gap: 2rem;

  &:hover {
    background: $light-orange;
  }

  .roomImage {
    width: 50px;
    height: 50px;
    object-fit: fill;
    border-radius: 50%;
  }
}

.category-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;


  .title {
    font-size: 1rem;
    font-weight: 600;
    color: $text-main;
  }

  .description {
    font-size: 0.9rem;
    color: $text-muted;
    line-height: 1.4;
  }

  .category-info {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 0.82rem;
    color: $text-main;

    p {
      margin: 0.2rem 0;
      span {
        font-weight: 500;
        margin-right: 0.4rem;
        color: $text-muted;
      }
    }
  }
}
</style>
