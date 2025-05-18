<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { useMyInfo } from '@/store/myInfoStore.ts'
import { useFetchRoomDetail } from '@/api/category/category.query.ts'
import { forrmatDate } from '../utils/common.ts'
import { joinRoom } from '@/api/invite/invite.ts'
import router from '@/router'

const route = useRoute()
const myInfo = useMyInfo()

const { data: roomDetail } = useFetchRoomDetail(route.params.roomId as string)

const join = async () => {
  const roomId = route.params.roomId as string
  const key = route.params.key as string
  const res = await joinRoom(roomId, key)
  console.log(res)
}


</script>

<template>
  <article class="invite">
    <h1 class="head">이 방이 맞나유?</h1>
    <div class="invite-info">
      <p class="room-name">{{ roomDetail?.data.roomName }}</p>
      <p class="room-description">{{ roomDetail?.data.roomDescription }}</p>
      <p class="meta">생성일: {{ forrmatDate(roomDetail?.data.createdAt ?? "") }}</p>
      <p class="meta">방장: {{ roomDetail?.data.currentRoomOwnerName }} ({{ roomDetail?.data.currentRoomOwnerEmail }})</p>
      <p class="meta">멤버 수: {{ roomDetail?.data.memberList.length }}명</p>
      <img
        v-if="roomDetail?.data.imageUrl"
        :src="roomDetail.data.imageUrl"
        alt="방 이미지"
        class="room-image"
      />
      <button class="join-button" @click="join">가입하기</button>
      <button class="join-button" @click="()=>{router.push('/')}">홈으로 가기</button>
    </div>
  </article>
</template>



<style scoped lang="scss">
article.invite {
  font-family: nanum-5;
  padding: 2rem;
  margin: 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .head {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .invite-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .room-name {
      font-size: 1.3rem;
      font-weight: bold;
    }

    .room-description {
      font-size: 1.1rem;
      color: #666;
    }

    .meta {
      font-size: 1rem;
      color: gray;
    }

    .room-image {
      width: 100%;
      height: auto;
      border-radius: 0.5rem;
      margin: 1rem 0;
    }

    .join-button {
      width: 100%;
      padding: 1rem 0.5rem;
      background-color: coral;
      color: white;
      font-size: 1.2rem;
      font-family: nanum-4;
      border: none;
      border-radius: 0.4rem;
      cursor: pointer;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 0.9;
      }
    }
  }
}
</style>
