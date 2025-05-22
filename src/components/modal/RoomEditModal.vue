<script setup lang="ts">

import type { RoomDetail } from '@/api/room/room.model.ts'
import { reactive } from 'vue'
import { postCreateRoom } from '@/api/room/room.ts'
import { useRouter } from 'vue-router'

const props = defineProps<{
  roomDetailInfo: RoomDetail
}>()

const router = useRouter()

const inputFiled = reactive({
  title: props.roomDetailInfo.roomName,
  description: props.roomDetailInfo.roomDescription,
  imageFile: props.roomDetailInfo.imageUrl,
  imageUrl: props.roomDetailInfo.imageUrl, // 미리보기 URL 저장용
})

/** 이미지 업로드  */
const uploadImage = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  // inputFiled.imageFile = file;
  inputFiled.imageUrl = URL.createObjectURL(file); // 미리보기 URL 설정
}

const checkInput = () => {
  if(inputFiled.title.length === 0 || inputFiled.title.length === 30) {
    alert("그룹명은 최소 1~30 글자 사이여야 합니다")
    return false
  }
  if(inputFiled.description.length === 0 || inputFiled.description.length === 200) {
    alert("그룹의 설명은 최소 1~200 글자 사이")
    return false
  }
  return true
}

/** post 요청 */
const submit = async () => {
  if(!checkInput()) { return }
  const res = await postCreateRoom(inputFiled.title, inputFiled.description)
  if(res.status === 200) {
    alert("그룹 생성 완료")
    router.go(-1)
  }
}
</script>

<template>
  <div class="createRoomContainer">
    <h1 class="title">그룹 생성</h1>

    <div class="image-upload-wrapper">
      <div v-if="!inputFiled.imageUrl" class="image-placeholder">
        <label class="custom-upload-label">
          이미지를 넣을 수 있습니다!
          <input type="file" accept=".jpg,.png" @change="uploadImage" hidden />
        </label>
      </div>

      <div v-else class="image-preview" :style="{ backgroundImage: 'url(' + inputFiled.imageUrl + ')' }">
        <label class="change-label">
          이미지 변경하기
          <input type="file" accept=".jpg,.png" @change="uploadImage" hidden />
        </label>
      </div>
    </div>

    <input type="text" placeholder="그룹 명을 입력하세요" v-model="inputFiled.title" class="inputField" />
    <textarea placeholder="그룹 설명을 입력하세요" v-model="inputFiled.description" class="inputField descField" />

    <button class="save" @click="submit">저장</button>
  </div>
</template>

<style scoped>
.createRoomContainer {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  font-family: nanum-4;

  .title {
    font-size: 2rem;
    font-family: nanum-5;
    margin-bottom: 1rem;
  }

  .image-upload-wrapper {
    width: 100%;
    height: 250px;
    border: 2px dashed #ccc;
    border-radius: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fafafa;
    position: relative;
    overflow: hidden;

    .image-placeholder {
      font-size: 1.2rem;
      color: gray;

      .custom-upload-label {
        cursor: pointer;
        padding: 1rem 2rem;
        background-color: #f0f0f0;
        border-radius: 0.6rem;
        border: 1px solid #ddd;
        transition: background 0.2s;
        display: inline-block;

        &:hover {
          background-color: #e0e0e0;
        }
      }
    }

    .image-preview {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;

      .change-label {
        position: absolute;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        font-family: nanum-4;
        font-size: 1rem;
        color: white;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 0.6rem 1.2rem;
        border-radius: 0.4rem;
        cursor: pointer;
        transition: background 0.2s;

        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }
      }
    }
  }

  .inputField {
    width: 100%;
    padding: 0.8rem 1rem;
    font-size: 1.1rem;
    font-family: nanum-4;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    outline: none;

    &:focus {
      border-color: coral;
      box-shadow: 0 0 0 2px rgba(255, 127, 80, 0.2);
    }
  }

  .descField {
    min-height: 100px;
    resize: vertical;
  }

  .save {
    width: 100%;
    outline: none;
    border: none;
    background-color: coral;
    color: white;
    font-size: 1.2rem;
    font-family: nanum-4;
    padding: 1rem 0.5rem;
    border-radius: 0.4rem;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #e67350;
    }
  }
}
</style>
