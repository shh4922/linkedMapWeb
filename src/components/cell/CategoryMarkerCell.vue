<script setup lang="ts">
const toggleSettingModal = () => {
  alert("settingModal toggle")
}
</script>

<template>
  <li class="marker-card">
    <div class="marker-header">
      <h3>개쩌는 맛집임</h3>
      <div class="actions">
<!--        @click="deleteMarker(marker.id)"-->
        <button >🗑️</button>
<!--        @click="viewMarker(marker)"-->
        <button >🔍</button>
      </div>
    </div>
    <p class="description">여기 개 맛도리인 한식집임</p>
    <div class="meta">
      <span>📍 진월동 791-1번지 44 한신아파트 201동 903호</span>
      <span>🗓️ 2024-12-13</span>
      <span>👤 신현호</span>
    </div>
  </li>
</template>

<style scoped lang="scss">
.marker-card {
  border-radius: 1.2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
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
