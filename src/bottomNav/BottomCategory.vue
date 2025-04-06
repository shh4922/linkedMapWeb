<script setup lang="ts">

import { onMounted, type Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
const isChecked : Ref<boolean> = ref(false)
const emit = defineEmits(['toggleCategoryAdd'])

// function moveToAddCategory() {
//   if(window.ReactNativeWebView) {
//     window.ReactNativeWebView.postMessage(JSON.stringify({ url: 'http://192.168.0.10:5173/categoryCreate' }));
//   } else {
//     console.log("err")
//   }
// }

const router = useRouter()

const moveToEditCategory = () => {
  router.push({name: 'editCategory'})
}
</script>

<template>
  <div class="category-container">
    <button @click="moveToEditCategory">카테고리 편집하기</button>
    <ul class="category-list">
      <li>
        <div class="category-item">
          <p>A</p>
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
          <p>A</p>
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

}

.edit {
  color: dodgerblue;
  background-color: transparent;
  font-size: 1.6rem;
  //background-color: red;
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
  //background-color: red;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
