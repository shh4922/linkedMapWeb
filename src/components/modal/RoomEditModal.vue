<script setup lang="ts">

import type { RoomDetail } from '@/api/room/room.model.ts'
import { reactive, ref } from 'vue'
import { updateRoom } from '@/api/room/room.ts'
import { useRouter } from 'vue-router'
import ImageCropModal from '@/components/modal/ImageCropModal.vue'

const router = useRouter()
const props = defineProps<{
  roomDetailInfo: RoomDetail
}>()
const emit = defineEmits(['toggleRoomEditModal'])


const imageFile = ref<Blob|null>(null)
const inputFiled = reactive({
  title: props.roomDetailInfo.roomName,
  description: props.roomDetailInfo.roomDescription,
  croppedImageUrl: props.roomDetailInfo.imageUrl, // 미리보기 URL 저장용
  originalImageUrl: props.roomDetailInfo.imageUrl // 원본 이미지 URL 저장용
})
const isShowCropModal = ref<boolean>(false)

/** 이미지 업로드  */
const uploadImage = (event: Event) => {
  const input = event.target as HTMLInputElement

  if (input.files && input.files[0]) {
    const file = input.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      inputFiled.originalImageUrl = reader.result as string
      isShowCropModal.value = true
    }
    reader.readAsDataURL(file)
  }
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
const update = async () => {
  if(!checkInput()) { return }

  const res = await updateRoom(props.roomDetailInfo.roomId, inputFiled.title, inputFiled.description, imageFile.value)
  if(res.data) { alert("업데이트가 완료되었습니다.")}
  router.go(-1)
}

const saveCropImage = (blob: Blob | null) => {
  if (blob) {
    imageFile.value = blob
    inputFiled.croppedImageUrl = URL.createObjectURL(blob)
  }
  inputFiled.originalImageUrl = ""
  isShowCropModal.value = false
}



</script>

<template>
  <div class="createRoomContainer">
    <div class="header">
      <h1 class="title">그룹 편집</h1>
      <i class="pi pi-times" @click="emit('toggleRoomEditModal',false)"></i>
    </div>


    <div class="image-upload-wrapper">
      <div v-if="!inputFiled.croppedImageUrl" class="image-placeholder">
        <label class="custom-upload-label">
          이미지를 넣을 수 있습니다!
          <input type="file" accept=".jpg,.png" @change="uploadImage" hidden />
        </label>
      </div>

      <div v-else class="image-preview" :style="{ backgroundImage: 'url(' + inputFiled.croppedImageUrl + ')' }">
        <label class="change-label">
          이미지 변경하기
          <input type="file" accept=".jpg,.png" @change="uploadImage" hidden />
        </label>
      </div>
    </div>

    <input type="text" placeholder="그룹 명을 입력하세요" v-model="inputFiled.title" class="inputField" />
    <textarea placeholder="그룹 설명을 입력하세요" v-model="inputFiled.description" class="inputField descField" />

    <button class="save" @click="update">저장</button>

    <div
      v-if="isShowCropModal"
      class="modal-overlay"/>
    <ImageCropModal
      class="cropModal"
      v-if="isShowCropModal"
      :src="inputFiled.originalImageUrl ?? ''"
      @emitCropImage="saveCropImage"
    />

  </div>
</template>

<style scoped lang="scss">
.createRoomContainer {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  font-family: nanum-4;
  width: 320px;
  max-width: 90%;
  background: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;

    .title {
      font-size: 1.5rem;
      font-family: nanum-5;
    }
    i {
      font-size: 1rem;
    }
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
