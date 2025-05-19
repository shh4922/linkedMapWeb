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
    <!-- 헤더: 제목 + 액션 버튼 -->
    <div class="card-header">
      <h3 class="title">{{ marker.title }}</h3>
      <button class="action-btn" aria-label="상세 보기">🔍</button>
    </div>

    <!-- 설명: 최대 2줄, 넘치면 말줄임 -->
    <p class="description">{{ marker.description }}</p>

    <!-- 푸터: 아이콘 + 최소 메타 정보 -->
    <div class="card-footer">
      <span class="meta-item">📍 {{ marker.address }}</span>
      <span class="meta-item">🗓️ {{ forrmatDate(marker.createdAt) }}</span>
      <span class="meta-item">👤 {{ marker.creatorName }}</span>
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
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: pointer;
  transition: border 0.2s, background 0.2s;
  max-height: 80px;

  &.selected {
    border: 2px solid $main-color;
    background: rgba(255, 127, 80, 0.1); /* 연한 코랄 배경 */
  }
}

/* 카드 헤더 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    margin: 0;
    font-size: 1rem;
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
    font-size: 1.125rem;
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

/* 설명(최대 2줄) */
.description {
  margin: 0;
  font-size: 0.875rem;
  color: $sub-text-color;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 카드 푸터 */
.card-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: $sub-text-color;

  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
}
</style>
