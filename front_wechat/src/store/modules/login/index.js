import {
    saveLoginStatus,
    loadLoginStatus
  } from '@/utils/cache'
import user from '@/request/api/user'
export default {
    namespaced: true,
    state: {
        token: true,
        loginStatus: loadLoginStatus(),
        userInfo: {}
    },
    mutations: {
        SET_LOGIN_STATUS: (state, loginStatus) => {
            state.loginStatus = loginStatus
        },
        SET_USERINFO: (state, user) => {
            state.userInfo = user
        }
    },
    actions: {
        setLoginStatus({commit}, query) {
            commit('SET_LOGIN_STATUS', saveLoginStatus(query))
        },
        loginWechatAuth({commit}, code) {
            const data = {
                code: code
            }
            return new Promise((resolve, reject) => {
                user.userLogin(data)
                    .then(res => {
                        //用户信息，token
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
        },
        setUserInfo({commit}, user) {
            commit('SET_USERINFO', user)
        }
    }
}