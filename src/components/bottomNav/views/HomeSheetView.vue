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

<style scoped>
.category-container {
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 1rem;
  padding: 1rem 1rem;
  font-family: nanum-5;

  .edit {
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    font-size: 1.3rem;
    color: coral;
  }
}

.toggle-input {
  appearance: none;
  width: 50px;
  height: 25px;
  border-radius: 15px;
  background-color: #ccc;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 5px;
}

.toggle-input:checked {
  background-color: #4caf50;
}

.toggle-input:checked::before {
  transform: translateX(25px);
}

.toggle-input::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 21px;
  height: 21px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.3s;
}


.category-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4rem;
}
</style>
