import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import api from './request/api'
import wechatAuth from './plugins/wechatAuth'

Vue.use(wechatAuth, {
  appid: process.env.VUE_APP_WECHAT_APPID
})
Vue.prototype.$api = api
Vue.config.productionTip = false


import { Button, Tabbar, TabbarItem, Icon, Swipe, SwipeItem, Lazyload, Toast} from 'vant'
Vue.use(Button).use(Tabbar).use(TabbarItem).use(Icon).use(Swipe).use(SwipeItem).use(Lazyload).use(Toast);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
