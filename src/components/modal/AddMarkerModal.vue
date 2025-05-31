<script setup lang="ts">
import type { SearchModel } from '@/api/auth/search.ts'
import { onMounted, onUnmounted, ref } from 'vue'
import Map from '@/components/map/Map.vue'
import { useFetchMyRoomList } from '@/api/room/room.query.ts'
import { saveMarker } from '@/api/marker/marker.ts'
import MarkerModel from '@/components/map/marker/MarkerModel.ts'
import { useMarkserListStore } from '@/store/useMarkserListStore.ts'

const map = ref<InstanceType<typeof Map> | null>(null)
const emit =defineEmits(['closeAddModal'])

const markerListStore = useMarkserListStore()
const {data:myRoomList} = useFetchMyRoomList()

const props = defineProps<{
  result: SearchModel
}>()

const selectRoomId = ref<number | null>(null)
const description = ref<string>("")
const imageFile = ref<File|null>(null)
const previewImageUrl = ref<string>("")

const closeAddModal = async () => {
  emit('closeAddModal')
}

const submit = async() => {
  if(selectRoomId.value === null) {
    alert("그룹을 선택해주세요")
    return
  }
  const data = props.result
  await saveMarker(data.place_name, Number(data.y), Number(data.x), description.value, data.category_name, data.address_name, data.road_address_name, selectRoomId.value,"")
  markerListStore.deleteRoom(selectRoomId.value.toString())
  emit('closeAddModal')
}

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

/** 이미지 업로드  */
const uploadImage = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  imageFile.value = file;
  previewImageUrl.value = URL.createObjectURL(file); // 미리보기 URL 설정
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
      <div class="image-upload-wrapper">
        <div v-if="!previewImageUrl" class="image-placeholder">
          <label class="custom-upload-label">
            이미지를 넣을 수 있습니다!
            <input type="file" accept=".jpg,.png" @change="uploadImage" hidden />
          </label>
        </div>

        <div v-else class="image-preview" :style="{ backgroundImage: 'url(' + previewImageUrl + ')' }">
          <label class="change-label">
            이미지 변경하기
            <input type="file" accept=".jpg,.png" @change="uploadImage" hidden />
          </label>
        </div>
      </div>

    </section>
    <button @click="submit" class="save">저장하기</button>
  </article>
</template>

<style scoped lang="scss">
article {
  font-family: nanum-5;
}

/* 마커 추가 헤더 */
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2rem;

  p {
    font-size: 1.3rem;
    font-weight: bold;
    color: #333;
  }

  .pi-times {
    font-size: 1.5rem;
    color: #666;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: coral;
    }
  }
}

/* 맵 영역 */
.map {
  width: 100%;
  height: 250px;
  margin-bottom: 2rem;
  border: 1px solid #eee;
  border-radius: 0.5rem;
  overflow: hidden;
}

/* 검색 정보 섹션 */
.searchInfo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  width: 100%;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1rem;

    .sub {
      color: #666;
      width: 30%;
      font-weight: 600;
    }
    .result {
      flex: 1;
      color: #333;
      font-size: 0.95rem;
      word-break: break-all;
    }
    a.result {
      color: coral;
      text-decoration: none;
      transition: opacity 0.2s;
      &:hover {
        opacity: 0.8;
      }
    }
    input.result {
      padding: 0.6rem 0.8rem;
      border: 1px solid #ccc;
      border-radius: 0.5rem;
      font-size: 1rem;
      transition: border-color 0.2s;
      width: 100%;

      &::placeholder {
        color: #aaa;
      }
      &:focus {
        outline: none;
        border-color: coral;
      }
    }
    select.result {
      width: 100%;
      padding: 0.6rem 0.8rem;
      border: 1px solid #ccc;
      border-radius: 0.5rem;
      font-size: 1rem;
      transition: border-color 0.2s;
      color: #333;
      background: #fff;

      &:focus {
        outline: none;
        border-color: coral;
      }
    }
  }
}

/* 이미지 업로드 영역 */
.image-upload-wrapper {
  position: relative;
  width: 100%;
  height: 180px;
  border: 2px dashed #ddd;
  border-radius: 0.75rem;
  background-color: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  /* 파일 input 숨기기 */
  input[type="file"] {
    display: none;
  }

  /* 이미지가 없을 때 표시되는 플레이스홀더 */
  .image-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #aaa;
    font-size: 0.95rem;
    text-align: center;
    gap: 0.5rem;

    .custom-upload-label {
      padding: 0.6rem 1rem;
      background-color: coral;
      color: #fff;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: opacity 0.2s, background-color 0.2s;
      font-size: 0.9rem;
      font-family: nanum-4;

      &:hover {
        background-color: darken(coral, 10%);
      }
    }
  }

  /* 이미지가 있을 때 보여지는 미리보기 */
  .image-preview {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    border-radius: 0.75rem;

    /* 어두운 오버레이 + 변경 버튼 */
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.15);
    }
    .change-label {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      padding: 0.5rem 0.8rem;
      background-color: rgba(255, 255, 255, 0.85);
      color: coral;
      border-radius: 0.5rem;
      cursor: pointer;
      font-size: 0.9rem;
      font-family: nanum-4;
      transition: background-color 0.2s, color 0.2s;

      &:hover {
        background-color: #fff;
        color: darken(coral, 10%);
      }

      input[type="file"] {
        display: none;
      }
    }
  }
}

/* 저장 버튼 */
.save {
  width: 100%;
  outline: none;
  border: none;
  background-color: coral;
  color: white;
  font-size: 1.1rem;
  font-family: nanum-4;
  padding: 1rem 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
}
</style>
