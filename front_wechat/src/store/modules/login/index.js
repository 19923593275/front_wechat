import {
    saveLoginStatus,
    loadLoginStatus
  } from '@/utils/cache'

export default {
    namespaced: true,
    state: {
        token: true,
        loginStatus: loadLoginStatus()
    },
    mutations: {
        SET_LOGIN_STATUS: (state, loginStatus) => {
            state.loginStatus = loginStatus
        }
    },
    actions: {
        setLoginStatus({commit}, query) {
            commit('SET_LOGIN_STATUS', saveLoginStatus(query))
        }
    }
}