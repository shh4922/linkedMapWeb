<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { forrmatDate } from '@/utils/common.ts'
import { checkInviteKey } from '@/api/invite/invite.ts'
import { onMounted, ref } from 'vue'
import { fetchJoinRoom } from '@/api/room/room.ts'
import type { RoomDetail } from '@/api/room/room.model.ts'
import { useToastStore } from '@/store/useToastMessage.ts'
import { useJoinRoom } from '@/api/invite/invite.query.ts'
import type { CustomError, DefaultError } from '@/api/DefaultResponse.ts'

const route = useRoute()
const router = useRouter()
const toastStore = useToastStore()

const {mutate:joinRoom} = useJoinRoom()
const roomDetail = ref<RoomDetail|null>(null)

const join = async () => {
  const vals = {
    roomId: route.params.roomId as string,
    key: route.params.key as string
  }
  joinRoom(vals,{
    onSuccess() {
        toastStore.show("가입에 완료되었습니다.")
    },
    onError(error: DefaultError) {
      console.log("error",error)
        toastStore.show(error.message)
    },
  })
}


const checkKey = async () => {
  try {
    const key = route.params.key as string
    await checkInviteKey(key);
    getJoinRoomInfo()
  } catch (err) {
    const error = err as CustomError
    toastStore.show(error.serverResponse.message, "error")
    router.push('/')
  }
}

const getJoinRoomInfo = async () => {
  const res = await fetchJoinRoom(route.params.roomId as string)
  if(res.data) {
    roomDetail.value = res.data
  }
}


onMounted(()=> {
  if(localStorage.getItem("accessToken") === null) {
    router.push({name: 'login'})
    toastStore.show("로그인이 필요한 서비스입니다.", 'error')
  }
  checkKey()
})



</script>

<template>
  <article class="invite">
    <h1 class="head">이 방이 맞나유?</h1>
    <div class="invite-info" v-if="roomDetail">
      <p class="room-name">{{ roomDetail.roomName }}</p>
      <p class="room-description">{{ roomDetail.roomDescription }}</p>
      <p class="meta">생성일: {{ forrmatDate(roomDetail.createdAt) }}</p>
      <p class="meta">방장: {{ roomDetail.currentRoomOwnerName }} ({{ roomDetail.currentRoomOwnerEmail }})</p>
      <p class="meta">멤버 수: {{ roomDetail.memberList.length }}명</p>
      <img
        v-if="roomDetail.imageUrl"
        :src="roomDetail.imageUrl"
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
