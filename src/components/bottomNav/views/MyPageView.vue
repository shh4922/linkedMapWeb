<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(true) // 로그인 여부. 실제로는 토큰 체크 등으로 판단

const goToLogin = () => {
  router.push({name:'login'})
}

const userInfo = {
  name: '홍길동',
  email: 'hong@example.com',
  createdAt: '2024-01-01',
  categories: [
    {
      name: '여행',
      description: '함께 여행 가고 싶은 사람들 모임',
      invitedAt: '2024-02-15'
    },
    {
      name: '맛집',
      description: '전국 맛집 탐방 모임',
      invitedAt: '2024-03-10'
    },
    {
      name: '스터디',
      description: '프론트엔드 스터디 모임',
      invitedAt: '2024-04-01'
    }
  ]
};
</script>



<template>
  <div class="mypage-container">
    <template v-if="isLoggedIn">
      <h1>마이페이지</h1>

      <div class="section user-info">
        <div class="info-item">
          <span class="label">이름</span>
          <span class="value">{{ userInfo.name }}</span>
        </div>
        <div class="info-item">
          <span class="label">이메일</span>
          <span class="value">{{ userInfo.email }}</span>
        </div>
        <div class="info-item">
          <span class="label">가입일</span>
          <span class="value">{{ userInfo.createdAt }}</span>
        </div>
      </div>

      <div class="section actions">
        <button class="logout-btn">로그아웃</button>
        <button class="withdraw-btn">회원탈퇴</button>
      </div>

      <div class="section category-section">
        <h2>내가 속한 카테고리</h2>
        <ul class="category-list">
          <li class="category-item" v-for="(category, idx) in userInfo.categories" :key="idx">
            <div class="category-name">{{ category.name }}</div>
            <div class="category-description">{{ category.description }}</div>
            <div class="category-invited">초대일: {{ category.invitedAt }}</div>
          </li>
        </ul>
      </div>
    </template>

    <template v-else>
      <div class="login-required">
        <h2>로그인이 필요합니다</h2>
        <p>마이페이지를 확인하려면 먼저 로그인해주세요.</p>
        <button class="login-btn" @click="goToLogin">로그인 하러가기</button>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.mypage-container {
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  background: #ffffff;
  font-family: "nanum-5";
}

h1 {
  text-align: center;
  color: #ff774d;
  margin-bottom: 2rem;
}

.section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid #ffe1d6;
  border-radius: 12px;
  background-color: #fff8f5;
}

.user-info {
  .info-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    font-size: 1rem;
    border-bottom: 1px solid #fdd9cc;

    &:last-child {
      border-bottom: none;
    }

    .label {
      color: #555;
      font-weight: bold;
    }

    .value {
      color: #333;
    }
  }
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;

  .logout-btn,
  .withdraw-btn {
    padding: 0.6rem 1.4rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s;
  }

  .logout-btn {
    background-color: #ff774d;
    color: white;

    &:hover {
      background-color: #ff6335;
    }
  }

  .withdraw-btn {
    background-color: #ddd;
    color: #333;

    &:hover {
      background-color: #bbb;
    }
  }
}

.category-section {
  h2 {
    color: #ff774d;
    margin-bottom: 1rem;
  }

  .category-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 0;
    list-style: none;

    .category-item {
      background-color: #ffe1d6;
      padding: 0.4rem 0.8rem;
      border-radius: 999px;
      font-size: 0.95rem;
      color: #333;
    }
  }
}

.login-required {
  text-align: center;
  padding: 3rem 2rem;
  border: 1px solid #ffe1d6;
  border-radius: 12px;
  background-color: #fff8f5;

  h2 {
    font-size: 1.5rem;
    color: #ff774d;
    margin-bottom: 1rem;
  }

  p {
    color: #666;
    margin-bottom: 2rem;
  }

  .login-btn {
    padding: 0.8rem 1.6rem;
    background-color: #ff774d;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background-color: #ff6335;
    }
  }
}
</style>
