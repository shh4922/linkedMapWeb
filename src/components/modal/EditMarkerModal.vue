<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import Map from '@/components/map/Map.vue'
import MarkerModel from '@/components/map/marker/MarkerModel.ts'
import type { Marker } from '@/api/marker/marker.model.ts'
import { useUpdateMarker } from '@/api/marker/marker.query.ts'
import { useToastStore } from '@/store/useToastMessage.ts'


const map = ref<InstanceType<typeof Map> | null>(null)
const emit =defineEmits(['closeEditMarkerModal'])
const props = defineProps<{
  markerInfo: Marker
}>()
const toastStore = useToastStore()
const isShowCropModal = ref<boolean>(false)

const originalImageUrl = ref<string | null>(null)
const previewCroppedUrl = ref<string|null>(null)
const croppedBlob = ref<Blob | null>(null)

const {mutate:updateMarker2 } = useUpdateMarker()


const inputFiled = ref({
  title: props.markerInfo.title,
  storeType: props.markerInfo.storeType,
  address: props.markerInfo.address,
  roadAddress: props.markerInfo.roadAddress,
  description: props.markerInfo.description,
})

onMounted(() => {
  previewCroppedUrl.value = props.markerInfo.imageUrl ?? null
  const latlng = {
    lat: Number(props.markerInfo.lat),
    lng: Number(props.markerInfo.lng)
  }
  const markerModel = new MarkerModel("0", latlng.lng, latlng.lat,1)
  markerModel.setCustomOverlayMarker(props.markerInfo.title)

  map.value?.getInstance()?.onCreateMarker(markerModel)
  map.value?.getInstance()?.onSetPosition(latlng)
})


const closeModal = () => {
  emit('closeEditMarkerModal', false, null)
}


const update = () => {
  const vars = {
    roomId: props.markerInfo.roomId.toString(),
    markerId: props.markerInfo.id.toString(),
    title: inputFiled.value.title,
    description: inputFiled.value.description,
    storeType: inputFiled.value.storeType,
    imageBlob: croppedBlob.value
  }
  updateMarker2(vars, {
    onSuccess(data, variables, context) {
      toastStore.show("마커 정보가 업데이트 되었습니다.")
    },
    onError(error, variables, context) {
      toastStore.show("업데이트에 실패했습니다.. 다시 시도해주세요.", 'error')
    },
    onSettled(data, error, variables, context) {
      emit('closeEditMarkerModal', false, null)
    },

  })


}



/**
 * 파일 선택 시 data URL 생성
 */
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


/**
 * Crop 취소 또는 초기화
 */
const saveCropImage = (blob: Blob | null) => {
  if (blob) {
    croppedBlob.value = blob
    previewCroppedUrl.value = URL.createObjectURL(blob)
  }
  originalImageUrl.value = null
  isShowCropModal.value = false
}

</script>

<template>
  <article class="edit-marker-modal">
    <section class="head">
      <p>마커 편집</p>
      <i class="pi pi-times" @click="closeModal"></i>
    </section>

    <Map class="map" ref="map" />

    <section class="searchInfo">
      <div class="row">
        <span class="sub">상호명</span>
        <input v-model="inputFiled.title" />
      </div>
      <div class="row">
        <span class="sub">분류</span>
        <input v-model="inputFiled.storeType" />
      </div>
      <div class="row">
        <span class="sub">주소</span>
        <span class="result">{{ markerInfo.address }}</span>
      </div>
      <div class="row">
        <span class="sub">도로명 주소</span>
        <span class="result">{{ markerInfo.roadAddress }}</span>
      </div>
      <div class="row">
        <span class="sub">설명</span>
        <input v-model="inputFiled.description" />
      </div>
    </section>

    <div class="uploader-wrapper">
      <div v-if="!markerInfo.imageUrl && !previewCroppedUrl" class="placeholder">
        <label class="upload-label">
          <i class="pi pi-image"></i>
          <input type="file" accept="image/*" @change="onFileChange" hidden />
        </label>
      </div>
      <div v-else class="preview-area">
        <div class="cropped-preview"
             :style="{ backgroundImage: `url(${previewCroppedUrl})` }"></div>
        <label class="upload-label small">
          <i class="pi pi-refresh"></i>
          <input type="file" accept="image/*" @change="onFileChange" hidden />
        </label>
      </div>
    </div>

    <button class="save" @click="update">업데이트</button>
  </article>
</template>

<style scoped lang="scss">
.edit-marker-modal {
  position: fixed;
  top: 10vh;
  left: 50%;
  transform: translateX(-50%);
  width: 90vw;
  max-width: 350px;
  max-height: 80vh;
  background: #fff;
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: nanum-5;

  /* 내부 섹션만 스크롤 */
  .searchInfo, .uploader-wrapper {
    overflow-y: auto;
  }
}

.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #eee;

  p {
    margin: 0;
    font-size: 1.1rem;
    font-weight: bold;
  }
  .pi-times {
    font-size: 1.3rem;
    color: #666;
  }
}

.map {
  width: 100%;
  height: 120px !important;
  border-bottom: 1px solid #eee;
}

.searchInfo {
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .row {
    display: flex;
    align-items: center;
    font-size: 0.9rem;

    .sub {
      flex: 1;
      color: #666;
    }
    input, .result {
      flex: 2;
      font-size: 0.9rem;
      color: #333;
      padding: 0.3rem 0.5rem;
      border: 1px solid #ccc;
      border-radius: 0.4rem;
    }
    input {
      background: #fafafa;
      &:focus {
        outline: none;
        border-color: coral;
      }
    }
  }
}

.uploader-wrapper {
  width: 80px;
  height: 80px;
  margin: 0.5rem auto;
  border: 2px dashed #ddd;
  border-radius: 0.6rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;

  .placeholder .upload-label {
    font-size: 1.5rem;
    color: #ccc;
  }

  .preview-area {
    width: 100%;
    height: 100%;

    .cropped-preview {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      border-radius: 0.6rem;
    }
    .upload-label.small {
      position: absolute;
      bottom: 4px;
      right: 4px;
      font-size: 0.75rem;
      color: coral;
    }
  }
}

.save {
  margin: 0.5rem 1rem 1rem;
  padding: 0.5rem 0;
  background: coral;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
}
</style>
