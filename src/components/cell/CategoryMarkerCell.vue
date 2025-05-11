<script setup lang="ts">
// import type { RoomMember } from '@/api/category/category.model.ts'
import type { Marker } from '@/api/marker/marker.model.ts'

// const toggleSettingModal = () => {
//   alert('settingModal toggle')
// }

defineProps<{
  marker: Marker
}>()
</script>

<template>
  <li class="marker-card">
    <div class="marker-header">
      <h3>{{ marker.title }}</h3>
      <div class="actions">
        <!--        @click="deleteMarker(marker.id)"-->
        <button>🗑️</button>
        <!--        @click="viewMarker(marker)"-->
        <button>🔍</button>
      </div>
    </div>
    <p class="description">{{ marker.description }}</p>
    <div class="meta">
      <span>📍 {{ marker.address }}</span>
      <span>🗓️ {{ marker.createdAt }}</span>
      <span>👤 {{ marker.creatorName }}</span>
    </div>
  </li>
</template>

<style scoped lang="scss">
.marker-card {
  border-radius: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
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
