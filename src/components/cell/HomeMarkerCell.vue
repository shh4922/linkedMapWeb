<script setup lang="ts">

import { forrmatDate } from '@/utils/common.ts'
import type { Marker } from '@/api/marker/marker.model.ts'
import { useMarkserListStore } from '@/store/useMarkserListStore.ts'
import { computed } from 'vue'
import noImage from "@/assets/image/placeholder_no_image.png"
import { getFormatPermission } from '../../utils/permission.ts'

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
      :src="marker.imageUrl ?? noImage"
      alt="마커 이미지"
    />
    <div class="card-content">
      <div class="card-header">
        <h3 class="title">{{ marker.title }}</h3>
      </div>

      <p class="description">{{ marker.description }}</p>

      <div class="card-footer">
        <span class="meta-item">📍 {{ marker.address }}</span>
        <span class="meta-item">🗓️ {{ forrmatDate(marker.createdAt) }}</span>
      </div>

      <!-- 부가 정보는 심플하게 -->
      <div class="card-footer info-footer">
        <span class="meta-item">📂 {{ marker.roomName }}</span>
        <span class="meta-item">👤 {{ marker.creatorName }}</span>
        <span class="meta-item">🔒 {{ getFormatPermission(marker.creatorRole) }}</span>
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
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  gap: 0.5rem;            /* 간격 줄임 */
  padding: 0.4rem;        /* 패딩 축소 */
  cursor: pointer;
  transition: border 0.2s, background 0.2s;
  max-height: 70px;       /* 세로 크기 제한 */
  overflow: hidden;
}

.marker-card.selected {
  border: 2px solid $main-color;
  background: rgba(255,127,80,0.1);
}

/* 왼쪽 이미지: 작게 */
.marker-card img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 0.5rem;
  flex-shrink: 0;
}

/* 콘텐츠 래퍼: 간격 축소 */
.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  overflow: hidden;
}

/* 제목 */
.title {
  margin: 0;
  font-size: 0.9rem;
  font-weight: bold;
  color: $main-color;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 설명은 한 줄만 */
.description {
  margin: 0;
  font-size: 0.75rem;
  color: $sub-text-color;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 메타 정보 공통 */
.card-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  font-size: 0.65rem;
  color: $sub-text-color;
  margin: 0;

  /* 약간의 상단 여백 */
  &:not(:first-of-type) {
    margin-top: 0.2rem;
  }
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 그룹명 / 만든사람 / 권한 강조 라벨 */
.meta-item strong {
  color: $text-color;
  font-weight: 600;
  margin-right: 0.2rem;
}

.info-footer {
  gap: 0.4rem;

  .meta-item {
    font-size: 0.65rem;
    color: $sub-text-color;
    display: flex;
    align-items: center;
    gap: 0.2rem;
  }
}
</style>
