import { postWithToken } from '@/api/http.ts'
import axios from 'axios'


/**
 * 규칙.
 * TODO: roomImage의 경우 folder -> rooms
 * roomImage의 경우 fileName -> {roomId}-currentTime
 * roomImage 에서 roomId가 없을 경우 fileName -> temp-currentTime (방을 생성과 동시에 이미지 를 넣을 경우)
 *
 * TODO: marker 의 경우 folder -> markers/roomId
 * marker 의 경우 fileName -> markerId-currentTime
 * marker 의 경우 markerId가 없는 경우 fileName -> temp-markers (마커를 생성과 동시에 이미지 를 넣을 경우)
 *
 * TODO: profile 의 경우 folder -> profiles
 * profile 의 경우 fileName -> memberId-currentTime
 * profile 의 경우 memberID 없는 경우 fileName -> temp-currentTime  (프로필 을 생성과 동시에 이미지 를 넣을 경우)
 *
 * @param folder
 * @param file
 */
export const fetchPreSigned = (folder:string, file:File) => {
  const body = {
    folder: folder,
    filename: `${file.name}`,
    contentType: file.type
  }

  return postWithToken('/presigned', body)
}

export const uploadFile = (url:string, file:File) => {
  console.log("uploading to:", url);
  console.log("Content-Type:", file.type);
  return axios.put(url, file, {
    headers: {
      'Content-Type' : file.type,
      'x-amz-acl': 'public-read'
    }
  })
}
