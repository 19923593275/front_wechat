/**
 * axio封装请求
 */

import axios from 'axios'
import qs from 'qs'
import { Toast } from 'vant'

/**
 * 提示函数
 */
const tip = msg => {
    Toast({
        message: msg,
        duration: 1500
    });
}

//创建axios实例
var instance = axios.create({ timeout: 3000});
//设置post请求头
instance.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
instance.defaults.baseURL = '/api'

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
    config => {
      // const token = store.state.user.token;
      // token && (config.headers.Authorization = token);
      // if (config.method === 'post') {
      //   config.data = JSON.stringify(config.data)
      // }  
      console.log("config===>", config);
      return config;
    },
    error => {
      console.log(error);
      Promise.reject(error)
    }
  );

  /**
 * 响应拦截器
 */
instance.interceptors.response.use(
    //请求成功
    res => {
      console.log("success");
      return res;
    },
    // res => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),
    //请求失败
    error => {
      console.log(error)
    //   if (response) {
    //     errHandle(response.status, response.data.message);
    //   } else {
    //     // 处理断网的情况
    //     // eg:请求超时或断网时，更新state的network状态
    //     // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
    //     // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
    //     store.dispatch("common/setNetWork", false);
    //   }
      return Promise.reject(error);
    }
  );
  
  export default instance;