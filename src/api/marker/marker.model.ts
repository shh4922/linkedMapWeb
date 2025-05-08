export interface Marker {
  id: number;
  lat: number
  lng: number

  title: string;
  description: string;
  address: string;
  roadAddress: string;
  storeType: string;

  imageUrl: string;
  creatorEmail: string; // 만든 사람 이메일
  creatorName: string;  // 만든 사람 이름
  roomId: number;

  createdAt: string; // ISO 8601 형식: "yyyy-MM-dd'T'HH:mm:ss"
  updatedAt: string;
}
