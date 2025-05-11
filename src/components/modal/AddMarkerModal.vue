<script setup lang="ts">
import type { SearchModel } from '@/api/auth/search.ts'
import { onMounted, ref, watch } from 'vue'
import Map from '@/components/map/Map.vue'
import { useFetchMyRoomList } from '@/api/category/category.query.ts'
import { saveMarker } from '@/api/marker/marker.ts'


const emit =defineEmits(['closeAddModal'])

const {data:myRoomList} = useFetchMyRoomList()

const props = defineProps<{
  result: SearchModel
}>()

const selectRoomId = ref<number | null>(null)
const closeAddModal = async () => {
  emit('closeAddModal')
}

const submit = async() => {
  if(selectRoomId.value === null) {
    alert("그룹을 선택해주세요")
    return
  }
  const data = props.result
  await saveMarker(data.place_name, Number(data.y), Number(data.x), "설명", data.category_name, data.address_name, data.road_address_name, selectRoomId.value,"")
  emit('closeAddModal')
}
watch(myRoomList, (newValue) => {
  console.log("myRoomList", newValue)
})
</script>

<template>
  <article>
    <section class="head">
      <p>마커를 추가하세염</p>
      <i class="pi pi-times" @click="closeAddModal"></i>
    </section>

    <Map class="map" style="width: 100%; height: 250px"/>

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
        <p class="sub">추가할 그룹명</p>
        <select class="result" v-model="selectRoomId">
          <option v-for="(room) in myRoomList?.data"
                  :key="room.id"
                  :value="room.roomId"
          >>{{room.roomName}}</option>
        </select>
      </div>
    </section>

    <button @click="submit" class="save">저장하기</button>
  </article>
</template>

<style scoped lang="scss">
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

</style>
