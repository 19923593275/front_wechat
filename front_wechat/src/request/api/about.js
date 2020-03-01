/**
 * 用户模块的api接口列表
 */
import axios from "@/request/http";
const about = {
  //获取音乐
  getAllMusic(params) {
    console.log("================about get-music============")
    return axios.post('/about/get-music', params);
  },
  addEnjoyMusic(params) {
    console.log("================about add-enjoy-music============")
    return axios.post('/about/add-enjoy-music', params);
  },
  cancelEnjoyMusic(params) {
    console.log("================about add-enjoy-music============")
    return axios.post('/about/cancel-enjoy-music', params);
  }
};

export default about;
