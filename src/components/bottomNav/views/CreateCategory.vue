<script setup lang="ts">

import { onMounted, reactive } from 'vue'
import { postCreateRoom } from '@/api/category/category.ts'
const categoryInput = reactive({
  title: "",
  description: ""
})

onMounted(()=> {
  console.log("CreateCategory is mounted")
})

const checkInput = () => {
  if(categoryInput.title.length === 0 || categoryInput.title.length === 30) {
    alert("길이는 최소 1~30 글자 사이")
    return false
  }
  if(categoryInput.description.length === 0 || categoryInput.description.length === 200) {
    alert("길이는 최소 1~200 글자 사이")
    return false
  }
  return true
}
const submit = async () => {
  if(!checkInput()) {return}
  const res = await postCreateRoom(categoryInput.title, categoryInput.description)
  console.log(res)
}
</script>

<template>
  <div class="createCategoryContainer">
    <h1>카테고리생성임</h1>
    <input type="text" placeholder="카테고리 명을 입력하세요" v-model="categoryInput.title"/>
    <input type="text" placeholder="카테고리 설명" v-model="categoryInput.description"/>
    <button @click="submit">save</button>
  </div>

</template>

<style scoped>
.createCategoryContainer {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
