<script setup lang="ts">
import type { Marker } from '@/api/marker/marker.model.ts'
import { computed, ref, watch } from 'vue'
import { deleteMarkerByMarkerId } from '@/api/marker/marker.ts'
import { forrmatDate } from '@/utils/common.ts'
import noImage from "@/assets/image/placeholder_no_image.png"
import EditMarkerModal from '@/components/modal/EditMarkerModal.vue'

const props = defineProps<{
  marker: Marker
  selectedMarker: number|null
}>()
const emit = defineEmits(['selectMarker', 'deleteMarker', 'toggleEditMarker'])


/** 선택 상태를 계산해서 클래스에 바인딩 */
const isSelected = computed(() => props.selectedMarker === props.marker.id)


const markerSelect = () => {
  emit('selectMarker', props.marker)
}

/** 마커 삭제 */
const deleteMarker = async () => {
  if(!confirm(`정말로 ${props.marker.title} 를 마커를 삭제하시겠습니까?`)) return
  const res = await deleteMarkerByMarkerId(props.marker.id.toString())

  if(res.data) {
    alert("마커 삭제가 완료되었습니다.")
    emit('deleteMarker', props.marker.id)
  }
}

/** 마커 편집 모달 토글*/
const toggle = () => {
  console.log("toggle")
  emit("toggleEditMarker", true, props.marker)
}

</script>

<template>
  <li class="marker-card" @click="markerSelect" :class="{ selected: isSelected }">

    <img :src="marker.imageUrl ?? noImage" alt="marker-image" class="markerImage"/>

    <div class="markerInfo">
      <div class="marker-header">
        <h3>{{ marker.title }}</h3>
        <div class="actions">

          <button @click="deleteMarker">🗑️</button>

          <button @click.stop="toggle">🔍</button>
        </div>
      </div>

      <p class="description">{{ marker.description }}</p>
      <div class="meta">
        <span>📍 {{ marker.address }}</span>
        <span>🗓️ {{ forrmatDate(marker.createdAt)}}</span>
        <span>👤 {{ marker.creatorName }}</span>
        <span>✉️ {{ marker.creatorEmail }}</span>
      </div>
    </div>


  </li>
</template>

<style scoped lang="scss">
.editMarkerModal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.marker-card {
  border-radius: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 1.6rem;
  display: flex;
  gap: 1.5rem;

  .markerImage {
    width: 50px;
    height: 50px;
    border-radius: 0.8rem;
    object-fit: cover;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  }

  .markerInfo {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}

.marker-card.selected {
  /* 테두리 강조 */
  border: 2px solid #ff914d;

  /* 배경을 연하게 물들임 (투명도 10%) */
  background-color: rgba(255, 145, 77, 0.1);

  /* 입체감 강화 */
  box-shadow: 0 4px 12px rgba(255, 145, 77, 0.3);

  /* 살짝 확대 */
  transform: scale(1.02);
}


.marker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.marker-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-family: nanum-5;
}

.actions button {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: 8px;
}

.description {
  font-size: 0.9rem;
  color: #666;
  font-family: nanum-5;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 0.8rem;
  color: #888;
}
</style>
