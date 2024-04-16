// 从缓存、url中读取token
export const getToken = () => {
  let token = ''
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token') || ''
  }
  const match = location.pathname.match(/(?:[?&])token=([^&]+)/)
  if(match) {
    token = match[1]
  }
  return token ?? ''
}