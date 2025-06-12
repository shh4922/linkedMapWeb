<!-- src/components/ToastContainer.vue -->
<template>
  <teleport to="body">
    <transition-group name="toast" tag="div" class="toast-container">
      <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        :class="['toast', toast.type]"
      >
        {{ toast.message }}
      </div>
    </transition-group>
  </teleport>
</template>

<script setup lang="ts">

import { useToastStore } from '@/store/useToastMessage.ts'

const toastStore = useToastStore()
</script>

<style scoped lang="scss">
.toast-container {
  position: fixed;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: 1000;
}

.toast {
  padding: 0.75rem 1.25rem;
  border-radius: 1rem;
  color: #fff;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  animation: slideIn 0.3s ease-out;

  &.success {
    background-color: #4caf50;
  }
  &.error {
    background-color: #ff774d;
  }
}

/* Enter Animation */
@keyframes slideIn {
  0% {
    transform: translateY(100%) scale(0.9);
    opacity: 0;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

/* Leave Animation */
.toast-leave-active {
  animation: slideOut 0.3s ease-in forwards;
}

@keyframes slideOut {
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(100%) scale(0.9);
    opacity: 0;
  }
}
</style>
