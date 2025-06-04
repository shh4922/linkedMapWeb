<script setup lang="ts">
import type { SearchModel } from '@/api/auth/search.ts'
import { onMounted, ref } from 'vue'
import Map from '@/components/map/Map.vue'
import { useFetchMyRoomList } from '@/api/room/room.query.ts'
import { saveMarker } from '@/api/marker/marker.ts'
import MarkerModel from '@/components/map/marker/MarkerModel.ts'
import { useMarkserListStore } from '@/store/useMarkserListStore.ts'
import ImageCropModal from '@/components/modal/ImageCropModal.vue'

const map = ref<InstanceType<typeof Map> | null>(null)
const emit =defineEmits(['closeAddModal'])
const props = defineProps<{
  result: SearchModel
}>()


const markerListStore = useMarkserListStore()
const {data:myRoomList} = useFetchMyRoomList()

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
  if(selectRoomId.value === null) {
    alert("그룹을 선택해주세요")
    return
  }

  const data = props.result
  const res = await saveMarker(data.place_name, Number(data.y), Number(data.x), description.value, data.category_name, data.address_name, data.road_address_name, selectRoomId.value, croppedBlob.value)

  console.log(res)

  /** 특정 방에 마커추가시, 기존에 저장되어있던 방을 지움. 새로 방을 fetch해서 마커리스트를 다시 조회하기위해 */
  markerListStore.deleteRoom(selectRoomId.value.toString())
  closeAddModal()
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
      <p>마커를 추가하세염</p>
      <i class="pi pi-times" @click="closeAddModal"></i>
    </section>

    <Map class="map" ref="map" style="width: 100%; height: 250px"/>

    <section class="searchInfo">
      <div class="storeName">
        <p class="sub">상호명</p>
        <p class="result">{{result.place_name}}</p>
      </div>

      <div class="storeName">
        <p class="sub">분류</p>
        <p class="result">{{result.category_name}}</p>
      </div>

      <div>
        <p class="sub">주소</p>
        <p class="result">{{result.address_name}}</p>
      </div>

      <div>
        <p class="sub">도로명 주소</p>
        <p class="result">{{result.road_address_name}}</p>
      </div>

      <div>
        <p class="sub">링크</p>
        <a class="result" :href="result.place_url" target="_blank" rel="noopener noreferrer">카카오맵 리뷰보기</a>
      </div>

      <div>
        <p class="sub">설명</p>
        <input class="result" v-model="description" placeholder="해당 장소에 대한 설명을 작성해보세요"/>
      </div>

      <div>
        <p class="sub">추가할 그룹명</p>
        <select class="result" v-model="selectRoomId">
          <option v-for="(room) in myRoomList?.data"
                  :key="room.id"
                  :value="room.roomId"
          >{{room.roomName}}</option>
        </select>
      </div>

      <!--   이미지 넣는곳   -->
      <div class="uploader-wrapper">
        <!-- 파일 없음 시 -->
      <div v-if="!originalImageUrl && !previewCroppedUrl" class="placeholder">
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
    <button @click="submit" class="save">저장하기</button>
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

article {
  font-family: nanum-5;

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
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  width: 100%;

  input.result {
    padding: 0.6rem 0.8rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: border-color 0.2s;

    &::placeholder {
      color: #aaa;
    }

    &:focus {
      outline: none;
      border-color: coral;
    }
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    font-size: 1.2rem;

    .sub {
      color: gray;
      width: 30%;
      //background-color: chartreuse;
    }
    .result {
      flex: 1;
    }
  }
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
