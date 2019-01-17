import router from './router'
import store from './store'
import wechatAuth from './plugins/wechatAuth'
import qs from 'qs'

router.beforeEach((to, from, next) => {
    const loginStatus = Number(store.getters.loginStatus)
    document.title = to.meta.title; 
    if (loginStatus === 0) {
      const url = window.location.href;
      const parseUrl = qs.parse(url.split('?')[1]);
      let loginUrl;
      if (parseUrl.code && parseUrl.state) {
        delete parseUrl.code
        delete parseUrl.state
        loginUrl = `${url.split('?')[0]}?${qs.stringify(parseUrl)}`
      } else {
        loginUrl = url;
      }
      //设置微信回调地址
      wechatAuth.redirect_uri = loginUrl;
      store.dispatch('user/setLoginStatus', 1);
    //   store.commit('user/SET_LOGIN_STATUS', 1);
      window.location.href = wechatAuth.authUrl;
    } else if (loginStatus ===1) {
      // 用户已授权，获取code
      try {
        // 通过回调链接设置code status
        wechatAuth.returnFromWechat(to.fullPath)
      } catch (err) {
        // 失败，设置状态未登录，刷新页面
        store.dispatch('user/setLoginStatus', 0)
        // store.commit('user/SET_LOGIN_STATUS', 1);
        location.reload()
      }
      // 同意授权 to.fullPath 携带code参数，拒绝授权没有code参数
      const code = wechatAuth.code
      if (code) {
        // 拿到code 访问服务端的登录接口
        store
          .dispatch('user/loginWechatAuth', code)
          .then(res => {
            // 成功设置已登录状态
            console.log("用户登陆返回信息",res);
            store.dispatch('user/setLoginStatus', 2)
            next()
          })
          .catch(error => {
            console.log("error ===== ",error)
            // 失败，设置状态未登录，刷新页面
            store.dispatch('user/setLoginStatus', 2)
            // location.reload()
            next()
          })
      } else {
        store.dispatch('user/setLoginStatus', 0)
        // store.commit('user/SET_LOGIN_STATUS', 0);
        location.reload()
      }
    } else {
      next();
    }
  })