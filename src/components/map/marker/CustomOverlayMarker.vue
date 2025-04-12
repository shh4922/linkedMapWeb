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
  background-color: coral;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  //box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  strong {
    font-family: nanum-5;
    text-align: center;
    font-size: 1rem;
    color: white;
  }
}
</style>
