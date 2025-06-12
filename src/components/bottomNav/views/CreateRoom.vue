<script setup lang="ts">

import { reactive, ref } from 'vue'
import { postCreateRoom } from '@/api/room/room.ts'
import { useRouter } from 'vue-router'
import ImageCropModal from '@/components/modal/ImageCropModal.vue'
import { useCreateRoom } from '@/api/room/room.query.ts'
import { useToastStore } from '@/store/useToastMessage.ts'


const inputFiled = reactive({
  title: '',
  description: '',
})
const {mutate: createRoom} = useCreateRoom()
const isShowCropModal = ref<boolean>(false)
const previewCroppedUrl = ref<string|null>(null)
const originalImageUrl = ref<string | null>(null)
const croppedBlob = ref<Blob | null>(null)


const router = useRouter()
const toastStore = useToastStore()

/** 그룹명, 그룹설명 조건 체크*/
const checkInput = () => {
  if(inputFiled.title.length === 0 || inputFiled.title.length === 30) {
    toastStore.show("그룹명은 최소 1~30 글자 사이여야 합니다",'error')
    return false
  }
  if(inputFiled.description.length === 0 || inputFiled.description.length === 200) {
    toastStore.show("그룹의 설명은 최소 1~200 글자 사이",'error')
    return false
  }
  return true
}

/** 이미지 업로드  */
function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      isShowCropModal.value = true
      originalImageUrl.value = reader.result as string
    }
    reader.readAsDataURL(file)
  }
}

const saveCropImage = (blob: Blob | null) => {
  if (blob) {
    croppedBlob.value = blob
    previewCroppedUrl.value = URL.createObjectURL(blob)
  }
  originalImageUrl.value = null
  isShowCropModal.value = false
}

/** post 요청 */
const submit = async () => {
  if(!checkInput()) { return }
  if(localStorage.getItem("accessToken") === null || localStorage.getItem("accessToken") === undefined) {
    toastStore.show("로그인이 필요합니다.",'error')
    return
  }

  const vars = {
    title: inputFiled.title,
    description: inputFiled.description,
    imageBlob: croppedBlob.value
  }

  createRoom(vars,{
    onSuccess: (data) => {
      if(data.data) {
        router.go(-1)
        toastStore.show("그룹 생성 완료")
      }
    },
    onError: (error) => {
      toastStore.show("예기치 못한 에러가 발생했습니다")
    }
  })

}

</script>

<template>
  <div class="createRoomContainer">
    <h1 class="title">그룹 생성</h1>


    <div class="image-upload-wrapper">
      <div v-if="!originalImageUrl && !previewCroppedUrl" class="image-placeholder">
        <label class="custom-upload-label">
          이미지를 넣을 수 있습니다!
          <input type="file" accept=".jpg,.png" @change="onFileChange" hidden />
        </label>
      </div>

      <div v-if="previewCroppedUrl" class="preview-area">
        <div
          class="cropped-preview"
          :style="{ backgroundImage: `url(${previewCroppedUrl})` }"
        ></div>
        <label class="changeImageLabel">
          <i class="pi pi-refresh"></i>
          <span>이미지 변경</span>
          <input type="file" accept="image/*" @change="onFileChange" hidden />
        </label>
      </div>
    </div>

    <input type="text" placeholder="그룹 명을 입력하세요" v-model="inputFiled.title" class="inputField" />
    <textarea placeholder="그룹 설명을 입력하세요" v-model="inputFiled.description" class="inputField descField" />

    <button class="save" @click="submit">저장</button>

    <div
      v-if="isShowCropModal"
      class="modal-overlay"/>
    <ImageCropModal
      class="cropModal"
      v-if="isShowCropModal"
      :visible="!!(originalImageUrl && !previewCroppedUrl)"
      :src="originalImageUrl ?? ''"
      @emitCropImage="saveCropImage"
    />
  </div>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4); // 회색 배경
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
  pointer-events: auto; // 모달 쪽은 이벤트 다시 활성화
}
.cropModal {
  position: absolute;
  /* 화면의 정확히 중간 지점 */
  top: 50%;
  left: 50%;
  /* 너비/높이는 원하는 대로 설정 */
  width: 450px;
  height: 60%;
  max-width: 90%;
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);

  /* transform을 이용해 자신의 가로/세로 크기의 절반만큼 빼주면 진짜 중앙 정렬 */
  transform: translate(-50%, -50%);
  z-index: 14;
}

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

    .preview-area {
      width: 100%;
      height: 100%;
      padding: 1rem;
    }
    .cropped-preview {
      width: 100%;              /* 컨테이너 가득 채우기 */
      height: 100%;            /* 업로드 영역 높이와 동일하게 */
      background-size: contain; /* 이미지 비율 유지하며 전체 표시 */
      background-repeat: no-repeat;
      background-position: center;
      border-radius: 0.8rem;    /* 업로드 래퍼와 동일한 모서리 */
      margin-bottom: 1rem;      /* 아래 요소와 간격 */
    }

    .changeImageLabel {
      position: absolute;
      bottom: 1rem;           /* preview 영역 하단에서 1rem 위 */
      left: 50%;              /* 수평 중앙 배치 */
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 0.3rem;
      padding: 0.4rem 0.8rem;
      background: rgba(255, 255, 255, 0.9);
      color: coral;
      font-size: 0.85rem;
      border-radius: 0.5rem;
      cursor: pointer;
      z-index: 1;             /* 이미지 위로 띄우기 */
      transition: background-color 0.2s;

      i.pi-refresh {
        font-size: 1rem;
      }

      &:hover {
        background: #fff;
      }

      input[type="file"] {
        display: none;
      }
    }

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
