<script setup lang="ts">
import type { RoomMember } from '@/api/room/room.model.ts'
import { ref } from 'vue'
import { updatePermission } from '@/api/permission/permission.ts'

const props = defineProps<{
  roomId: string
  roomMember: RoomMember|null
}>()

const emit = defineEmits(['togglePermissionModal'])
const closeModal = () => {
  emit('togglePermissionModal', false)
}
const permission = ref<string>(props.roomMember?.role ?? "")

const changePermission = async () => {
  if(props.roomMember === null) return
  if(permission.value === 'OWNER') {
    if(!confirm('방장 권한을 위임한경우, 방장은 매니저 권한을 갖게됩니다. 그래도 변경하시겠습니까?')) return
  }

  const res = await updatePermission(props.roomMember.memberId, Number(props.roomId), permission.value)
  if (res.data) {
    alert("권한 변경이 완료되었습니다.")
  }

}
</script>

<template>
  <article class="permission-modal">
    <header class="modal-header">
      <h4>권한 변경</h4>
      <button class="close-btn" @click="closeModal">×</button>
    </header>

    <div class="modal-body">
      <div class="info">
        <p><strong>이름</strong> {{ roomMember?.name || '-' }}</p>
        <p><strong>이메일</strong> {{ roomMember?.email || '-' }}</p>
      </div>

      <div class="form-group">
        <label for="permission-select">권한 선택</label>
        <select id="permission-select" v-model="permission">
          <option value="OWNER">방장</option>
          <option value="MANAGER">매니저</option>
          <option value="USER">일반 사용자</option>
          <option value="READ_ONLY">읽기 전용</option>
        </select>
      </div>

      <div class="legend">
        <p class="legend-title">권한 설명</p>
        <ul class="legend-list">
          <li class="legend-item">
            <strong>방장</strong>
            모든 기능 사용 (마커 생성·수정·삭제, 권한 관리)
          </li>
          <li class="legend-item">
            <strong>매니저</strong>
            마커 생성, 자신 및 하위 권한자의 마커 수정·삭제 가능
          </li>
          <li class="legend-item">
            <strong>일반</strong>
            마커 생성 및 자신이 생성한 마커 수정·삭제 가능
          </li>
          <li class="legend-item">
            <strong>읽기전용</strong>
            보기만 가능, 생성·수정·삭제 불가
          </li>
        </ul>
      </div>
    </div>

    <footer class="modal-footer">
      <button class="save-btn" @click="changePermission">저장</button>
      <button class="cancel-btn" @click="closeModal">취소</button>
    </footer>
  </article>
</template>

<style scoped lang="scss">
$main-color: coral;
$border-light: #eee;
$text-color: #333;
$sub-text: #666;

.permission-modal {
  width: 320px;
  max-width: 90%;
  background: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  font-family: nanum-5;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid $border-light;
  background: #fafafa;

  h4 {
    margin: 0;
    font-size: 1.25rem;
    color: $main-color;
  }
  .close-btn {
    background: none;
    border: none;
    font-size: 1.25rem;
    color: $sub-text;
    cursor: pointer;
    padding: 0;
    line-height: 1;
    transition: color 0.2s;
    &:hover {
      color: $main-color;
    }
  }
}

.modal-body {
  padding: 1rem;
  .info {
    p {
      margin: 0.25rem 0;
      font-size: 0.95rem;
      color: $text-color;
      strong {
        color: $main-color;
        margin-right: 0.5rem;
      }
    }
  }
  .form-group {
    margin-top: 1rem;
    label {
      display: block;
      font-size: 0.9rem;
      color: $sub-text;
      margin-bottom: 0.25rem;
    }
    select {
      width: 100%;
      padding: 0.5rem;
      font-size: 1rem;
      border: 1px solid $border-light;
      border-radius: 0.5rem;
      background: #fff;
      color: $text-color;
    }
  }

  /* 권한 설명(범례) */
  .legend {
    margin-top: 1rem;
    padding: 1rem;
    background: #fafafa;
    border-top: 1px solid $border-light;
    border-radius: 0 0 0.75rem 0.75rem;

    .legend-title {
      margin: 0 0 0.5rem;
      font-size: 1rem;
      color: $main-color;
      font-weight: bold;
    }
    .legend-list {
      list-style: none;
      margin: 0;
      padding: 0;
      .legend-item {
        display: flex;
        gap: 0.5rem;
        font-size: 0.85rem;
        color: $sub-text;
        strong {
          display: inline-block;
          width: 4.5rem;
          color: $main-color;
        }
      }
    }
  }
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #fafafa;
  border-top: 1px solid $border-light;

  .save-btn,
  .cancel-btn {
    padding: 0.6rem 1rem;
    font-size: 0.95rem;
    font-family: nanum-4;
    border-radius: 0.5rem;
    cursor: pointer;
    border: none;
    transition: opacity 0.2s;
  }

  .save-btn {
    background-color: $main-color;
    color: #fff;
    &:hover {
      opacity: 0.9;
    }
  }

  .cancel-btn {
    background: transparent;
    color: $main-color;
    border: 1px solid $main-color;
    &:hover {
      background: rgba($main-color, 0.1);
    }
  }
}
</style>
