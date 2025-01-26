<script setup lang="ts">

</script>

<template>
  <nav>
    <div class="nav-item">
      <p>1</p>
    </div>
    <div class="nav-item">
      <p>2</p>
    </div>
    <div class="nav-item">
      <p>3</p>
    </div>
    <div class="nav-item">
      <p>4</p>
    </div>
  </nav>
</template>

<style scoped>
/* 네비게이션 바 */
nav {
  display: flex;
  bottom: 0;
  width: 100%;
  height: 8%; /* 높이 설정 */
  background-color: #ffffff; /* 네비게이션 배경색 */
  border-top: 1px solid #ccc; /* 상단 구분선 */
  z-index: 1000; /* 다른 요소 위에 표시 */
}

/* 네비게이션 아이템 */
.nav-item {
  flex: 1; /* 동일한 크기로 나누기 */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 14px; /* 텍스트 크기 */
  color: #333; /* 텍스트 색상 */
}

/* 각 요소 구분선 */
.nav-item:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  height: 100%; /* 세로선의 길이 */
  width: 1px; /* 선 두께 */
  background-color: #ccc; /* 선 색상 */
}
</style>
