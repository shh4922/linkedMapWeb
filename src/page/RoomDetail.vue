<script setup lang="ts">
import RoomMemberCell from '@/components/cell/RoomMemberCell.vue'
import { useFetchRoomDetail } from '@/api/category/category.query.ts'
import { computed, onMounted, ref, watch } from 'vue'
import { useMyInfo } from '@/store/myInfoStore.ts'
import { forrmatDate } from '@/utils/common.ts'
import AddInviteLink from '@/components/modal/AddInviteLink.vue'
import EditPermissionModal from '@/components/modal/EditPermissionModal.vue'
import type { RoomMember } from '@/api/category/category.model.ts'

const props = defineProps<{
  roomId: string
}>()

const { data: roomDetail } = useFetchRoomDetail(props.roomId)
const selectedRoomMember = ref<RoomMember|null>(null)
const isShowModal = ref(false)
const isShowPermissionModal = ref(false)

const deleteCategory = () => {
  alert('카테고리 삭제')
}
const myInfo = computed(() => {
  return useMyInfo().getMyInfo
})

const toggleModal = (isShow:boolean) => {
  isShowModal.value = isShow
}


const emitTogglePermissionModal = (isShow:boolean, roomMember:RoomMember|null=null) => {
  selectedRoomMember.value = roomMember
  isShowPermissionModal.value = isShow
}


</script>

<template>
  <main :class="isShowModal ? 'gray' : '' ">
    <section class="categoryInfo">
      <div class="info">
        <div class="info-head">
          <div class="groupTitle">
            <img class="roomImage" src="https://recipe1.ezmember.co.kr/cache/recipe/2017/11/21/8cb4b9f30e3570f4ff93dd3303eeff7f1.jpg"/>
            <div class="roomInfo">
              <h2 class="title">{{ roomDetail?.data.roomName }}</h2>
              <p class="description">{{ roomDetail?.data.roomDescription }}</p>
            </div>
          </div>

          <div class="info-desc" v-if="myInfo?.memberId === roomDetail?.data.currentRoomOwnerId">
            <button @click="deleteCategory">삭제하기</button>
            <button class="update">수정하기</button>
          </div>
        </div>

      </div>

      <div class="subInfoContainer">
        <div class="subInfo">
          <p class="sub-head">카테고리 생성일</p>
          <p>{{forrmatDate(roomDetail?.data.createdAt ?? "")}}</p>
        </div>

        <div class="subInfo">
          <p class="sub-head">가입한 유저수</p>
          <p>{{roomDetail?.data.memberList.length}}명</p>
        </div>

        <div class="subInfo">
          <p class="sub-head">등록된 마커수</p>
          <p>{{roomDetail?.data.markerCount}}개</p>
        </div>
      </div>
      <div class="editCategory">
        <router-link :to="{ name: 'editRoomMarker', params: {roomId: props.roomId} }" class="moveEditMarker"
          >마커 관리하러 가기</router-link
        >
      </div>
    </section>

    <section class="userContainer">
      <div class="userHeader">
        <p class="userListTitle">가입한 유저임</p>
        <p class="createLink"
           v-if="myInfo?.memberId === roomDetail?.data.currentRoomOwnerId"
           @click="toggleModal(true)">초대링크 만들기</p>
      </div>

      <ul>
        <RoomMemberCell v-for="(user,index) in roomDetail?.data.memberList"
                        :key="index"
                        :user-info="user"
                        :current-owner-id="roomDetail?.data.currentRoomOwnerId ?? 0"
                        @togglePermissionModal="emitTogglePermissionModal" />
      </ul>
    </section>

    <div v-if="isShowModal" class="overlay" @click="toggleModal(false)"></div>
    <AddInviteLink v-if="isShowModal"
                   :room-id="props.roomId"
                   class="modal"
                   @close="toggleModal(false)" />

    <EditPermissionModal v-if="isShowPermissionModal"
                         :roomId="props.roomId"
                         :room-member="selectedRoomMember"
                         @togglePermissionModal="emitTogglePermissionModal" />
  </main>
</template>

<style scoped lang="scss">
$main-color: #ff6f61; // 오렌지 계열 메인 색상
$text-color: #333;
$sub-text-color: #888;

main {
  background-color: #ffffff;
  padding: 0 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .categoryInfo {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;

    .info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .info-head {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .groupTitle {
          display: flex;
          align-items: center;
          gap: 2rem;

          .roomImage {
            width: 60px;
            height: 60px;
            object-fit: fill;
            border-radius: 50%;
          }

          .roomInfo {
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .title {
              font-size: 1.8rem;
              font-family: nanum-5;
              font-weight: bold;
              color: $text-color;
              margin-top: 1rem;
            }

            .description {
              font-size: 1rem;
              font-family: nanum-5;
              color: $sub-text-color;
              margin-top: 0.3rem;
            }
          }
        }
      }

      .info-desc {
        display: flex;
        gap: 1rem;

        button {
          font-size: 1rem;
          color: $main-color;
          border: 1px solid $main-color;
          background-color: white;
          padding: 0.4rem 1rem;
          border-radius: 0.5rem;
          font-family: 'nanum-5';
          font-weight: bold;
          cursor: pointer;

          &:hover {
            background-color: $main-color;
            color: white;
          }
        }

        .update {
          color: gray;
          border: 1px solid gray;
        }
        .update:hover {
          background-color: gray;
          color: white;
        }
      }
    }

    .subInfoContainer {
      display: flex;
      justify-content: space-between;
      gap: 1rem;

      .subInfo {
        flex: 1;
        background-color: white;
        border: 1px solid #eee;
        border-radius: 0.8rem;
        padding: 1rem;

        .sub-head {
          color: $sub-text-color;
          font-size: 0.85rem;
          margin-bottom: 0.3rem;
          font-family: nanum-5;
        }

        p:last-child {
          color: $text-color;
          font-size: 1.2rem;
          font-weight: bold;
          font-family: nanum-5;
        }
      }
    }

    .editCategory {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      margin-top: 1rem;

      .moveEditMarker,
      button {
        flex: 1;
        padding: 0.7rem 1rem;
        font-size: 1rem;
        border-radius: 0.7rem;
        font-weight: bold;
        font-family: nanum-5;
        border: none;
        cursor: pointer;
        background-color: $main-color;
        color: white;

        &:hover {
          opacity: 0.9;
        }
      }

      .getout {
        background-color: #bbb;
      }
    }
  }

  .userContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;

    .userHeader {
      display: flex;
      justify-content: space-between;
      .userListTitle {
        font-family: nanum-5;
        font-size: 1.4rem;
        color: $text-color;
      }
      .createLink {
        font-family: nanum-5;
        font-size: 1rem;
        color: $main-color;
      }
    }


    ul {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }
  }

  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.2);
    backdrop-filter: blur(2px);
    z-index: 900;
  }

  .modal {
    position: fixed;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    z-index: 901;
    /* 나머지 모달 스타일 */
  }
}

</style>
