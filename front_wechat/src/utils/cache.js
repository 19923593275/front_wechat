import cookies from 'js-cookie'

const LoginStatusKey = 'Login-Status' // 登录态 0未授权未登录 1授权未登录 2 登陆成功

// 获取登录状态
export function loadLoginStatus() {
    return cookies.get(LoginStatusKey) || 0
  }
  // 保持登录状态
  export function saveLoginStatus(status) {
    cookies.set(LoginStatusKey, status, { expires: 7 })
    return status
  }
  // 删除登录状态
  export function removeLoginStatus() {
    cookies.remove(LoginStatusKey)
    return ''
  }