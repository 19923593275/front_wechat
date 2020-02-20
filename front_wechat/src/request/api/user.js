/**
 * 用户模块的api接口列表
 */
import base from "./base";
import axios from "@/request/http";
import qs from "qs";

// export const userRegist = function(params) {
//   return axios.post(`${base.sq}/regist`, qs.stringify(params));
// };

// export const userLogin = function(params) {
//   return axios.post(`${base.sq}/login`, qs.stringify(params));
// };
const user = {
  //用户登陆
  userLogin(params) {
    console.log("================user login============")
    return axios.post('/user/login', params);
  },
  //发送验证码
  sendCode(params) {
    console.log("================sendCode============")
    return axios.post('/user/send-code', params)
  },
  //用户绑定手机号码
  bindPhone(params) {
    console.log("================bindPhone============")
    return axios.post('/user/bind-phone', params)
  }
};

export default user;
