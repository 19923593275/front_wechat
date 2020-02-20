import cookies from 'js-cookie'

const LoginStatusKey = 'Login-Status' // 登录态 0未授权未登录 1授权未登录 2 登陆成功
const UserInfoKey = 'User-Info' //用户信息

// 获取登录状态
export function loadLoginStatus() {
  return cookies.get(LoginStatusKey) || 0
}
// 保持登录状态
export function saveLoginStatus(status) {
  cookies.set(LoginStatusKey, status, { expires: 1/12 })//存放七天
  return status
}
// 删除登录状态
export function removeLoginStatus() {
  cookies.remove(LoginStatusKey)
  return ''
}
//保存用户信息
export function saveUserInfo(user) {
  cookies.set(UserInfoKey, user, { expires: 1/12 })
  return user
}
//获取用户信息
export function getUserInfo() {
  return JSON.parse(cookies.get(UserInfoKey)) || {}
}
//删除用户信息
export function removeUserInfo() {
  cookies.remove(UserInfoKey)
  return '';
}