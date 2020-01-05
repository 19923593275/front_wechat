import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from '../store/modules/login'
import common from '../store/modules/common'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    common
  },
  getters
});
