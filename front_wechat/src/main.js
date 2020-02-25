import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import api from './request/api'
import '@/permission'
import wechatAuth from './plugins/wechatAuth'
import 'amfe-flexible/index'
import '@/assets/css/iconfont.css'

Vue.use(wechatAuth, {
  appid: process.env.VUE_APP_WECHAT_APPID
})
Vue.prototype.$api = api
Vue.config.productionTip = false


import { Button, Tabbar, TabbarItem, Icon, Swipe, SwipeItem, Lazyload, Toast, Col, Row, Image, Form, Field, Cell, CellGroup,
Notify, Overlay} from 'vant';
Vue.use(Button).use(Tabbar).use(TabbarItem).use(Icon).use(Swipe).use(SwipeItem).use(Lazyload).use(Toast).use(Col).use(Row).use(Image)
.use(Form).use(Field).use(Cell).use(CellGroup).use(Notify).use(Overlay);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
