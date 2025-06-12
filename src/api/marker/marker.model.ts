export interface Marker {
  id: number;
  lat: number
  lng: number

  title: string;
  description: string;
  address: string;
  storeType: string;
  roadAddress: string;
  imageUrl: string;

  creatorId: number; // 만든 사람 ID
  creatorEmail: string; // 만든 사람 이메일
  creatorName: string;  // 만든 사람 이름
  creatorRole: string;  // 만든 사람 역할 (ADMIN, MEMBER)
  roomId: number;
  roomName: string; // 방 이름

  createdAt: string; // ISO 8601 형식: "yyyy-MM-dd'T'HH:mm:ss"
  updatedAt: string;
}
