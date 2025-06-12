<script setup lang="ts">

import Cropper from 'vue-cropperjs'
import type CropperType from 'cropperjs'
import { ref } from 'vue'

const cropperRef = ref<InstanceType<typeof CropperType> | null>(null)


const props = defineProps<{
  src: string
  aspectRatio?: number
}>()

const emits = defineEmits(['emitCropImage'])

const cropImage = () =>{
  if (!props.src) return

  const cropperCanvas = cropperRef.value?.getCroppedCanvas()
  if (!cropperCanvas) return

  const canvas = cropperCanvas as unknown as HTMLCanvasElement
  canvas.toBlob((blob) => {
    if (!blob) return
    emits('emitCropImage',blob)
  }, 'image/jpeg', 0.9)
}

const cancle = () => {
  emits('emitCropImage', null)
}

</script>

<template>
  <div class="cropper-wrapper">
    <Cropper
      ref="cropperRef"
      :src="src"
      :aspect-ratio="aspectRatio"
      :view-mode="1"
      :auto-crop-area="1"
      :background="true"
      :responsive="true"
      class="cropper-instance"
    />

    <div class="cropper-footer">
      <button class="btn-secondary" @click="cancle">취소</button>
      <button class="btn-primary" @click="cropImage">크롭 완료</button>
    </div>
  </div>
</template>


<style scoped lang="scss">
//.cropper-wrapper {
//  width: 100%;
//  height: 100%;
//}
.cropper-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 600px;
  height: 60vh;
  max-height: 700px;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1001;
}

/* Cropper 내부 캔버스가 가능한 영역을 모두 차지하게 함 */
.cropper-instance {
  flex: 1;
  width: 100%;
  height: 100%;
}

/* 버튼 영역 */
.cropper-footer {
  position: absolute;
  bottom: 50px;
  right: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background-color: #fafafa;
  border-radius: 5px;
}

/* 일반 버튼 스타일 */
.cropper-footer button {
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

/* 취소 버튼 */
.btn-secondary {
  background-color: #f0f0f0;
  color: #555;

  &:hover {
    background-color: #e0e0e0;
  }
}

/* 크롭 완료 버튼 */
.btn-primary {
  background-color: #ff914d;
  color: #fff;

}
</style>
