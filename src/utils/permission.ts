export const getFormatPermission = (permission: string): string => {
  switch (permission) {
    case 'READ_ONLY':
      return '읽기전용';
    case 'USER':
      return '일반 사용자';
    case 'MANAGER':
      return "매니저";
    case 'OWNER':
      return '방장';
    default:
      return '알 수 없음';
  }
}
