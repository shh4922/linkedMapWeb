import imageCompression from 'browser-image-compression'

export const compressImage = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 1,           // 최대 용량 1MB로 줄이기
    maxWidthOrHeight: 1024, // 최대 너비 또는 높이
    useWebWorker: true,     // 성능 향상
  }
  try {
    const compressedFile = await imageCompression(file, options)
    return compressedFile
  } catch (e) {
    console.error('이미지 압축 실패:', e)
    return file // 실패 시 원본 전송
  }
}
