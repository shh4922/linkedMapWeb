<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMyInfo } from '@/store/myInfoStore.ts'
import { useFetchMyRoomList } from '@/api/category/category.query.ts'
import { fetchMyInfo } from '@/api/user/user.ts'

const router = useRouter()
const {data:roomList, isError, isLoading, error} = useFetchMyRoomList()
const myInfoStore = useMyInfo()

const goToLogin = () => {
  router.push({name:'login'})
}

const getMyInfo = async () => {
  const res = await fetchMyInfo()
  myInfoStore.setMyInfo(res.data)
}

const myInfo = computed(() => {
  return useMyInfo().getMyInfo
})

onMounted(() => {

  getMyInfo()
})


</script>



<template>
  <div class="mypage-container" @touchstart.stop @touchmove.stop>
    <template v-if="myInfo !== null">
      <h1>마이페이지</h1>

      <div class="user-info">
        <div class="info-item">
          <span class="label">이름</span>
          <span>{{ myInfo.username }}</span>
        </div>
        <div class="info-item">
          <span class="label">이메일</span>
          <span>{{ myInfo.email }}</span>
        </div>
        <div class="info-item">
          <span class="label">가입일</span>
          <span>{{ myInfo.createdAt }}</span>
        </div>
      </div>

      <div class="actions">
        <button class="btn logout-btn">로그아웃</button>
        <button class="btn withdraw-btn">회원탈퇴</button>
      </div>

      <div class="category-section">
        <h2>내 카테고리</h2>
        <!-- 여기만 스크롤 가능 -->
        <ul class="category-list">
          <li v-for="(room, index) in roomList?.data" :key="index">
            <div class="category-name">{{ room.roomName }}</div>
            <div class="category-description">{{ room.roomDescription }}</div>
            <div class="category-meta">초대일: {{ room.inviteDate }}</div>
          </li>
        </ul>
      </div>
    </template>

    <template v-if="myInfo === null">
      <div class="login-required">
        <h2>로그인이 필요합니다</h2>
        <p>마이페이지를 확인하려면 먼저 로그인해주세요.</p>
        <button class="btn login-btn" @click="goToLogin">로그인 하러가기</button>
      </div>
    </template>
  </div>
</template>


<style scoped lang="scss">
@import url('https://cdn.jsdelivr.net/gh/hiun/NanumSquareRound@1.0/NanumSquareRound.css');
@import url('https://cdn.jsdelivr.net/npm/pretendard@1.3.6/dist/web/static/pretendard.css');

.mypage-container {
  width: 100%;
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  font-family: 'Pretendard', sans-serif;
  color: #333;
}

h1 {
  font-size: 2rem;
  font-family: 'NanumSquareRound', sans-serif;
  font-weight: 800;
  color: #ff914d;
  margin-bottom: 1.5rem;
  text-align: center;
}

.user-info {
  padding: 1rem 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  border: 1px solid #f0f0f0;

  .info-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.8rem;
    font-size: 1rem;

    .label {
      font-weight: 600;
      color: #555;
      font-family: 'NanumSquareRound', sans-serif;
    }
  }
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;

  .btn {
    padding: 0.6rem 1.4rem;
    border-radius: 10px;
    font-size: 0.95rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .logout-btn {
    background-color: #ff914d;
    color: white;
    font-family: 'NanumSquareRound', sans-serif;

    &:hover {
      background-color: #e47d39;
    }
  }

  .withdraw-btn {
    background-color: white;
    color: #aaa;
    border: 1px solid #ccc;

    &:hover {
      color: #666;
      border-color: #999;
    }
  }
}

.category-section {
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 1.3rem;
    font-weight: 600;
    color: #ff914d;
    margin-bottom: 1rem;
    font-family: 'NanumSquareRound', sans-serif;
  }

  .category-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    li {
      padding: 1rem 1.25rem;
      border-radius: 10px;
      border: 1px solid #f0f0f0;

      .category-name {
        font-size: 1.05rem;
        font-weight: 600;
        color: #333;
        font-family: 'NanumSquareRound', sans-serif;
        margin-bottom: 0.3rem;
      }

      .category-description {
        font-size: 0.95rem;
        color: #666;
        margin-bottom: 0.3rem;
      }

      .category-meta {
        font-size: 0.85rem;
        color: #aaa;
      }
    }
  }
}

.login-required {
  text-align: center;
  padding: 2rem 1.5rem;
  border-radius: 12px;
  border: 1px solid #f0f0f0;

  h2 {
    font-size: 1.6rem;
    color: #ff914d;
    font-family: 'NanumSquareRound', sans-serif;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    color: #666;
    margin-bottom: 2rem;
  }

  .login-btn {
    background-color: #ff914d;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 0.7rem 1.5rem;
    font-size: 1rem;
    cursor: pointer;
    font-family: 'NanumSquareRound', sans-serif;

    &:hover {
      background-color: #e47d39;
    }
  }
}
</style>
