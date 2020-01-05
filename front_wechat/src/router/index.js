import Vue from 'vue'
import store from '../store/index.js'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import wechatAuth from '../plugins/wechatAuth'
import qs from 'qs'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta:{
      title: '首页'
    },
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const loginStatus = Number(store.getters.loginStatus)
  console.log(loginStatus + "-----------", to.meta.title)
  document.title = to.meta.title;
  next();
  // if (loginStatus === 0) {
  //   const url = window.location.href;
  //   const parseUrl = qs.parse(url.split('?')[1]);
  //   let loginUrl;
  //   if (parseUrl.code && parseUrl.state) {
  //     delete parseUrl.code
  //     delete parseUrl.state
  //     loginUrl = `${url.split('?')[0]}?${qs.stringify(parseUrl)}`
  //   } else {
  //     loginUrl = url;
  //   }
  //   //设置微信回调地址
  //   wechatAuth.redirect_uri = loginUrl;
  //   store.dispatch('user/setLoginStatus', 1);
  //   window.location.href = wechatAuth.authUrl;
  // } else if (loginStatus ===1) {
  //   // 用户已授权，获取code
  //   try {
  //     // 通过回调链接设置code status
  //     wechatAuth.returnFromWechat(to.fullPath)
  //   } catch (err) {
  //     // 失败，设置状态未登录，刷新页面
  //     store.dispatch('user/setLoginStatus', 0)
  //     location.reload()
  //   }
  //   // 同意授权 to.fullPath 携带code参数，拒绝授权没有code参数
  //   const code = wechatAuth.code
  //   if (code) {
  //     // 拿到code 访问服务端的登录接口
  //     store
  //       .dispatch('user/loginWechatAuth', code)
  //       .then(res => {
  //         // 成功设置已登录状态
  //         store.dispatch('user/setLoginStatus', 2)
  //         next()
  //       })
  //       .catch(() => {
  //         // 失败，设置状态未登录，刷新页面
  //         store.dispatch('user/setLoginStatus', 0)
  //         location.reload()
  //       })
  //   } else {
  //     store.dispatch('user/setLoginStatus', 0)
  //     location.reload()
  //   }
  // } else {
  //   next();
  // }
})

export default router
