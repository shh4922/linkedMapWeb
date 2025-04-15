export function setTokenInLocal(access:string, refresh:string) {
  localStorage.setItem('a',access)
  localStorage.setItem('r',refresh)
}

export function removeToken() {
  localStorage.removeItem('a')
  localStorage.removeItem('r')
}
