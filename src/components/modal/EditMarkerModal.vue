<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import Map from '@/components/map/Map.vue'
import MarkerModel from '@/components/map/marker/MarkerModel.ts'
import ImageCropModal from '@/components/modal/ImageCropModal.vue'
import type { Marker } from '@/api/marker/marker.model.ts'
import { updateMarker } from '@/api/marker/marker.ts'
import { useUpdateMarker } from '@/api/marker/marker.query.ts'


const map = ref<InstanceType<typeof Map> | null>(null)
const emit =defineEmits(['closeEditMarkerModal'])
const props = defineProps<{
  markerInfo: Marker
}>()

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
      alert("마커 정보가 업데이트 되었습니다.")
    },
    onError(error, variables, context) {
        console.log("updateMarker error", error)
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
  <article>
    <section class="head">
      <p>마커 편집</p>
      <i class="pi pi-times" @click="closeModal"></i>
    </section>

<!--    <Map class="map" ref="map" style="width: 100%; height: 150px"/>-->

    <section class="searchInfo">
      <div class="storeName">
        <p class="sub">상호명</p>
        <input v-model="inputFiled.title">
      </div>

      <div class="storeName">
        <p class="sub">분류</p>
        <input v-model="inputFiled.storeType">
      </div>

      <div>
        <p class="sub">주소</p>
        <p class="result">{{markerInfo.address}}</p>
      </div>

      <div>
        <p class="sub">도로명 주소</p>
        <p class="result">{{markerInfo.roadAddress}}</p>
      </div>

      <div>
        <p class="sub">설명</p>
        <input v-model="inputFiled.description">
      </div>


      <!--   이미지 넣는곳   -->
      <div class="uploader-wrapper">
        <!-- 파일 없음 시 -->
        <div v-if="!markerInfo.imageUrl && !previewCroppedUrl" class="placeholder">
          <label class="upload-label">
            <i class="pi pi-image"></i>
            <span>이미지를 선택하세요</span>
            <input type="file" accept="image/*" @change="onFileChange" hidden />
          </label>
        </div>

        <!-- 크롭된 결과 미리보기 -->
        <div v-if="previewCroppedUrl" class="preview-area">
          <div
            class="cropped-preview"
            :style="{ backgroundImage: `url(${previewCroppedUrl})` }"
          ></div>
          <label class="upload-label small">
            <i class="pi pi-refresh"></i>
            <span>이미지 변경</span>
            <input type="file" accept="image/*" @change="onFileChange" hidden />
          </label>
        </div>
      </div>
    </section>

    <button class="save" @click="update">업데이트</button>

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

.cropModal {
  width: 100%;
  height: 100%;
}

article {
  font-family: nanum-5;
  width: 400px;
  height: 60%;
  max-width: 80%;
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
}
.map {
  width: 100%;
  height: 250px;
  margin-bottom: 2rem;
}
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2rem;

  p {
    font-size: 1.3rem;
  }

}

.searchInfo {
  input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-family: nanum-5;
    color: #333;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:focus {
      outline: none;
      border-color: coral;
      box-shadow: 0 0 0 3px rgba(255, 145, 77, 0.2);
    }
  }

  /* storeName 섹션에서 label과 input이 동일 라인에 위치 */
  .storeName {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .sub {
      width: 30%;
      color: gray;
      font-weight: 600;
      font-size: 0.95rem;
    }
    input {
      flex: 1;
    }
  }

  /* 설명 필드도 같은 스타일 적용 */
  div:not(.storeName) {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .sub {
      width: 30%;
      color: gray;
      font-weight: 600;
      font-size: 0.95rem;
    }
    input {
      flex: 1;
    }
  }
}

/* 선택 박스(select) 디자인도 통일감 있게 업데이트 */
.searchInfo select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-family: nanum-5;
  color: #333;
  background: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: coral;
    box-shadow: 0 0 0 3px rgba(255, 145, 77, 0.2);
  }
}

/* 파일 입력이 아니라 인풋 전용 디자인 */
.searchInfo input[type="file"] {
  display: none;
}

/* 전반적인 input placeholder 색상 */
.searchInfo input::placeholder {
  color: #aaa;
}

/* 모달 하단 ‘업데이트’ 버튼을 제외한 모든 인풋에 공통 여백 추가 */
.searchInfo > div {
  margin-bottom: 1rem;
}

select {
  padding: 0.5rem;
  border-radius: 0.5rem;
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
}

.uploader-wrapper {
  width: 100px;
  height: 100px;
  margin: 0 auto 1.5rem;
  border: 2px dashed #e0e0e0;
  border-radius: 0.75rem;
  background-color: #fafafa;
  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  transition: border-color 0.2s, background-color 0.2s;

  &:hover {
    border-color: #ff914d;
    background-color: #fff;
  }

  /* 파일 없음 상태 */
  .placeholder {
    text-align: center;
    width: 100%;
    color: #b0b0b0;

    height: 100%;

    .upload-label {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      gap: 0.3rem;

      i.pi {
        font-size: 2rem;
        color: #e0e0e0;
        transition: color 0.2s;
      }

      span {
        font-size: 0.85rem;
        color: #888;
      }

      &:hover i.pi {
        color: #ff914d;
      }
    }
  }

  /* 미리보기 영역 */
  .preview-area {
    /* Flex로 중앙 정렬 */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;

    /* 미리보기 이미지 */
    .cropped-preview {
      width: 70%;   /* 테두리 대비 조금 여유 두기 (원하는 비율로 조정) */
      height: 70%;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      border-radius: 0.5rem;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    }

    /* 이미지 변경 레이블 */
    .upload-label.small {
      margin-top: 4px; /* 이미지와 레이블 사이 간격 */
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      cursor: pointer;
      font-size: 0.7rem;       /* 조금 더 작은 글자 */
      color: #aaaaaa;         /* 연한 회색 */
      transition: color 0.2s;

      i.pi-refresh {
        font-size: 1rem;
        color: #aaaaaa;
      }

      span {
        font-size: 0.7rem;
      }

      &:hover i.pi-refresh,
      &:hover span {
        color: #ff914d;       /* 호버 시 강조색 */
      }

      input[type="file"] {
        display: none;
      }
    }
  }

  /* 인풋 숨기기 */
  input[type="file"] {
    display: none;
  }
}

</style>
