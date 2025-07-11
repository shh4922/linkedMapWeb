export interface Room {
  id: number;
  roomId: number;
  roomName: string;
  roomDescription: string;
  currentOwnerEmail: string;
  currentOwnerName: string;
  createUserEmail: string;
  createUserName: string;

  inviteState: string; // 초대상태 (초대됨, 나감, 강퇴)
  roomState: string;   // 방 상태 (삭제됨, 활성화됨)
  role: string;        // 내 권한

  markerCount?: number;  // 마커 개수 (선택적)
  memberCount?: number;  // 초대된 유저 수 (선택적)

  roomCreateAt: string;  // ISO 8601 형식 문자열 e.g., "2025-05-06T15:30:00"
  inviteDate: string;    // ISO 8601 형식 문자열
}


export interface RoomDetail {
  roomId: number;
  roomName: string;
  roomDescription: string;
  currentRoomOwnerId: number;
  currentRoomOwnerName: string;
  currentRoomOwnerEmail: string;
  createUserEmail: string;
  createUserName: string;
  createdAt: string; // ISO 8601 형식
  imageUrl: string;
  memberList: RoomMember[];
  markerCount: number;
}

/**
 *  특정방에 속한 유저의 정보를 수정할때는 왠만하면 roomMemberId 가 필요
 *  그냥 방 자체, 또는 유저 자체를 변경할때는 memberId, roomId 등이 필요.
 * */
export interface RoomMember {
  roomMemberId: number;
  memberId: number;
  email: string;
  name: string;
  role: string;
  inviteDate: string; // ISO 8601 형식: "yyyy-MM-dd'T'HH:mm:ss"
}
