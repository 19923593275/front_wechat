export default {
    namespaced: true,
    state: {
        token: true,
        loginStatus: 0
    },
    mutations: {
        SET_LOGIN_STATUS: (state, loginStatus) => {
            state.loginStatus = loginStatus
        }
    },
    actions: {
        setLoginStatus({commit}, query) {
            alert("setLogin : " + query);
            commit('SET_LOGIN_STATUS', query)
        }
    }
}