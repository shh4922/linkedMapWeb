<script setup lang="ts">
import type { SearchModel } from '@/api/search/search.ts'
import { onMounted, ref } from 'vue'
import Map from '@/components/map/Map.vue'
import { useFetchMyRoomList } from '@/api/room/room.query.ts'
import { saveMarker } from '@/api/marker/marker.ts'
import MarkerModel from '@/components/map/marker/MarkerModel.ts'
import { useMarkserListStore } from '@/store/useMarkserListStore.ts'
import ImageCropModal from '@/components/modal/ImageCropModal.vue'
import { useToastStore } from '@/store/useToastMessage.ts'
import { useCreateMarker } from '@/api/marker/marker.query.ts'
import type { CustomError } from '@/api/DefaultResponse.ts'

const map = ref<InstanceType<typeof Map> | null>(null)
const emit =defineEmits(['closeAddModal'])
const props = defineProps<{
  result: SearchModel
}>()

const toastStore = useToastStore()
const markerListStore = useMarkserListStore()
const {data:myRoomList} = useFetchMyRoomList()
const {mutate: addMarker } = useCreateMarker()

const isLoading = ref(false)
const isShowCropModal = ref<boolean>(false)
const selectRoomId = ref<number | null>(null)
const description = ref<string>("")


const previewCroppedUrl = ref<string|null>(null)
const originalImageUrl = ref<string | null>(null)
const croppedBlob = ref<Blob | null>(null)

onMounted(() => {
  const latlng = {
    lat: Number(props.result.y),
    lng: Number(props.result.x)
  }
  const markerModel = new MarkerModel("0", latlng.lng, latlng.lat,1)
  markerModel.setCustomOverlayMarker(props.result.place_name)

  map.value?.getInstance()?.onCreateMarker(markerModel)
  map.value?.getInstance()?.onSetPosition(latlng)
})

const closeAddModal = () => {
  emit('closeAddModal')
}


const submit = async() => {
  if(isLoading.value) return

  if(localStorage.getItem("accessToken") === null || localStorage.getItem("accessToken") === undefined) {
    toastStore.show("로그인이 필요합니다.",'error')
    return
  }


  if(selectRoomId.value === null) {
    toastStore.show("그룹을 선택해주세요",'error')
    return
  }

  const data = props.result
  const vars = {
    title: data.place_name,
    lat:  Number(data.y),
    lng: Number(data.x),
    description: description.value,
    storeType: data.category_name,
    address: data.address_name,
    roadAddress: data.road_address_name,
    roomId: selectRoomId.value,
    imageBlob: croppedBlob.value
  }
  addMarker(vars,{
    onSuccess() {
      toastStore.show("마커가 추가되었습니다.")
      /** 특정 방에 마커추가시, 기존에 저장되어있던 방을 지움. 새로 방을 fetch해서 마커리스트를 다시 조회하기위해 */
      markerListStore.deleteRoom(selectRoomId.value!.toString())
      closeAddModal()
    },
    onError(err) {
      const error = err as CustomError
      toastStore.show("마커 추가에 실패했습니다", "error")
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
  <article class="add-marker-modal">
    <section class="head">
      <p>마커 추가</p>
      <i class="pi pi-times" @click="closeAddModal"></i>
    </section>

    <Map class="map" ref="map" />

    <section class="searchInfo">
      <div class="row">
        <span class="sub">상호명</span>
        <span class="result">{{ result.place_name }}</span>
      </div>
      <div class="row">
        <span class="sub">분류</span>
        <span class="result">{{ result.category_name }}</span>
      </div>
      <div class="row">
        <span class="sub">주소</span>
        <span class="result">{{ result.address_name }}</span>
      </div>
      <div class="row">
        <span class="sub">설명</span>
        <input v-model="description" placeholder="간단히 입력해주세요" />
      </div>
      <div class="row">
        <span class="sub">그룹</span>
        <select v-model="selectRoomId">
          <option v-for="room in myRoomList?.data" :key="room.roomId" :value="room.roomId">
            {{ room.roomName }}
          </option>
        </select>
      </div>
    </section>

    <div class="uploader-wrapper">
      <div v-if="!originalImageUrl && !previewCroppedUrl" class="placeholder">
        <label class="upload-label">
          <i class="pi pi-image"></i>
          <input type="file" accept="image/*" @change="onFileChange" hidden />
        </label>
      </div>
      <div v-else class="preview-area">
        <div
          class="cropped-preview"
          :style="{ backgroundImage: `url(${previewCroppedUrl})` }"
        ></div>
        <label class="upload-label small">
          <i class="pi pi-refresh"></i>
          <input type="file" accept="image/*" @change="onFileChange" hidden />
        </label>
      </div>
    </div>

    <!-- 바로가기 + 저장 버튼 -->
    <div class="action-buttons">
      <a
        :href="result.place_url"
        target="_blank"
        rel="noopener noreferrer"
        class="kakao-btn"
      >
        카카오맵 열기
      </a>
      <button class="save" @click="submit">저장하기</button>
    </div>

<!--    TODO: ??????-->
    <div v-if="isShowCropModal" class="modal-overlay" />
    <ImageCropModal
      class="cropModal"
      v-if="isShowCropModal"
      :visible="!!(originalImageUrl && !previewCroppedUrl)"
      :src="originalImageUrl ?? ''"
      @emitCropImage="saveCropImage"
    />
  </article>
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
  z-index: 4;
  pointer-events: auto; // 모달 쪽은 이벤트 다시 활성화
}

.cropModal {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 90vw;
  max-width: 400px;
  padding: 1rem;
  height: 500px;
  max-height: 80vh;
  transform: translate(-50%, -50%);
  z-index: 5;
  overflow: visible;
}

.add-marker-modal {
  font-family: nanum-5;
  position: fixed;
  top: 10vh;
  left: 50%;
  transform: translateX(-50%);
  width: 90vw;
  max-width: 400px;
  max-height: 80vh;       /* 전체 높이 제한 */
  background: #fff;
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);

  /* 내부 스크롤 */
  > .searchInfo,
  > .uploader-wrapper {
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
    font-size: 1.2rem;
    color: #666;
  }
}

/* 맵 높이 단축 */
.map {
  width: 100%;
  height: 120px !important;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

/* 폼 섹션 */
.searchInfo {
  padding: 0.75rem 1rem;
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
    .result,
    input, select {
      flex: 2;
      font-size: 0.9rem;
      color: #333;
      border: 1px solid #ccc;
      border-radius: 0.4rem;
      padding: 0.4rem 0.6rem;
    }
    input, select {
      background: #fafafa;
      &:focus {
        border-color: coral;
        outline: none;
      }
    }
  }
}

/* 이미지 업로드 */
.uploader-wrapper {
  width: 80px;
  height: 80px;
  margin: 0.5rem auto;
  border: 2px dashed #ddd;
  border-radius: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

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
      font-size: 0.8rem;
      color: coral;
    }
  }
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
  padding: 0 1rem 1rem;
}

/* 카카오맵 바로가기 버튼 */
.kakao-btn {
  flex: 1;
  text-align: center;
  background-color: #f7e600;
  color: #191919;
  padding: 0.6rem 0;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-family: nanum-4;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f4d500;
  }
}

/* 기존 저장 버튼 */
.save {
  flex: 1;
  padding: 0.6rem 0;
  background: coral;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-family: nanum-4;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e67350;
  }
}
</style>
