<script setup lang="ts">
import { ref, type Ref } from 'vue'

const isChecked : Ref<boolean> = ref(false)
const emit = defineEmits(['toggleCategoryAdd'])

// function moveToAddCategory() {
//   if(window.ReactNativeWebView) {
//     window.ReactNativeWebView.postMessage(JSON.stringify({ url: 'http://192.168.0.10:5173/categoryCreate' }));
//   } else {
//     console.log("err")
//   }
// }

const isShowCategoryCreate : Ref<boolean> = ref(false)

const toggleAddCategoryModal = () => {

  isShowCategoryCreate.value = !isShowCategoryCreate.value
  emit("toggleCategoryAdd",isShowCategoryCreate.value)
}
defineExpose({
  toggleAddCategoryModal
})
</script>

<template>
<div class="categorySheet">
  <button @click="toggleAddCategoryModal">카태고리 편집하기</button>
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
.categorySheet {

}
</style>
