<script setup lang="ts">

import { type Ref, ref } from 'vue'

const isChecked : Ref<boolean> = ref(false)

</script>

<template>
  <div class="category-container">
    <router-link :to="{name: 'editCategory'}" class="edit">카테고리 편집</router-link>
    <ul class="category-list">
      <li>
        <div class="category-item">
          <p>빵맛도리 카테고리임</p>
          <input
            type="checkbox"
            id="toggleSwitch"
            v-model="isChecked"
            class="toggle-input"
          />
        </div>
      </li>

      <li>
        <div class="category-item">
          <p>개쩌는 카테고리임</p>
          <input
            type="checkbox"
            id="toggleSwitch"
            v-model="isChecked"
            class="toggle-input"
          />
        </div>
      </li>

    </ul>
  </div>
</template>

<style scoped lang="scss">
.category-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 1.2rem;
  font-family: "nanum-5";
  gap: 1.5rem;

  .edit {
    padding: 0.4rem 0.8rem;
    background-color: #ff774d;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background-color: #ff6335;
    }
  }
}

.category-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.category-item {
  background: #fff8f5;
  border: 1px solid #ffe1d6;
  border-radius: 8px;
  padding: 0.8rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  color: #333;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
}

.toggle-input {
  appearance: none;
  width: 42px;
  height: 22px;
  border-radius: 11px;
  background-color: #ddd;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;
}

.toggle-input::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  background-color: #fff;
  border-radius: 50%;
  transition: transform 0.3s;
}

.toggle-input:checked {
  background-color: #ff774d;
}

.toggle-input:checked::before {
  transform: translateX(20px);
}

</style>
