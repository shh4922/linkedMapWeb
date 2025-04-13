<script setup lang="ts">
defineProps({
  name: String,
})
</script>

<template>
  <div class="overlayMarker">
    <strong>{{name}}</strong>
  </div>
</template>

<style scoped lang="scss">
.overlayMarker {
  position: relative;
  background-color: coral;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  color: white;
  font-family: nanum-5;
  font-size: 1rem;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  transform: translateY(-100%); // 위치 조정

  &::after {
    content: '';
    position: absolute;
    bottom: -10px; // 꼬리가 아래로
    left: 50%;
    transform: translateX(-50%);
    border-width: 10px 8px 0 8px;
    border-style: solid;
    border-color: coral transparent transparent transparent;
  }
}
</style>
