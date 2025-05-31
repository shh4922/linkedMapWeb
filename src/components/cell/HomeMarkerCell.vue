<script setup lang="ts">

import { forrmatDate } from '@/utils/common.ts'
import type { Marker } from '@/api/marker/marker.model.ts'
import { useMarkserListStore } from '@/store/useMarkserListStore.ts'
import { computed } from 'vue'


const props = defineProps<{
  marker: Marker
}>()

const markerListStore = useMarkserListStore()

const markerSelect = () => {
  markerListStore.selectMarker(props.marker)
}
const selectedMarker = computed(()=> {
  return props.marker === markerListStore.selectedMarker
})
</script>

<template>
  <li
    class="marker-card"
    @click="markerSelect"
    :class="{ selected: selectedMarker }"
  >
    <img
      src="https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20241004_92%2F17280304380000bFN4_JPEG%2F4517746122367149_762170218.jpg&type=a340"
      alt="마커 이미지"
    />
    <div class="card-content">
      <div class="card-header">
        <h3 class="title">{{ marker.title }}</h3>
        <button class="action-btn" aria-label="상세 보기">🔍</button>
      </div>

      <p class="description">{{ marker.description }}</p>

      <div class="card-footer">
        <span class="meta-item">📍 {{ marker.address }}</span>
        <span class="meta-item">🗓️ {{ forrmatDate(marker.createdAt) }}</span>
        <span class="meta-item">👤 {{ marker.creatorName }}</span>
      </div>
    </div>
  </li>
</template>

<style scoped lang="scss">
/* 메인 컬러 변수 */
$main-color: coral;
$text-color: #333;
$sub-text-color: #666;

.marker-card {
  background: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: border 0.2s, background 0.2s;
  max-height: 80px;
  overflow: hidden;
}

.marker-card.selected {
  border: 2px solid $main-color;
  background: rgba(255, 127, 80, 0.1); /* 연한 코랄 배경 */
}

/* 왼쪽 이미지 */
.marker-card img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 0.5rem;
  flex-shrink: 0;
}

/* 이미지 오른쪽 컨텐츠 래퍼 */
.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: hidden;
}

/* 카드 헤더 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    margin: 0;
    font-size: 0.95rem;
    font-weight: bold;
    color: $main-color;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .action-btn {
    background: none;
    border: none;
    font-size: 1rem;
    color: $main-color;
    cursor: pointer;
    padding: 0;
    line-height: 1;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.2);
    }
  }
}

/* 설명(최대 1줄) */
.description {
  margin: 0;
  font-size: 0.8rem;
  color: $sub-text-color;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 카드 푸터 */
.card-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.7rem;
  color: $sub-text-color;

  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
