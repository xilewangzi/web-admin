import Vue from 'vue'
import Vuex from 'vuex'
//本地化存储
import createPersistedState from 'vuex-persistedstate'
import logger from 'vuex/dist/logger' // logger是一个日志插件


import app from './modules/app'
import user from './modules/user'
import attendanceModu from './modules/attendanceModu'

import getters from './getters'

Vue.use(Vuex)
const state = {
  // token: '',
  //用户权限
  roleList:[],
}
const mutations = {
  setUserRole(state, data) { // state是自动放入的，默认指的就是当前的state
    // state.token = data.token;
    state.roleList = data
  },
}
const store = new Vuex.Store({
  modules: {
    app,
    user,
    attendanceModu
  },
  mutations,
  getters,
  state,
  plugins: [
    logger(),
    createPersistedState()
    // createPersistedState({
    //   key: 'wy',
    //   storage: {
    //     getItem: key => Cookies.get(key),
    //     // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
    //     setItem: (key, value) =>
    //       Cookies.set(key, value, {expires: 0.3}),
    //     removeItem: key => Cookies.remove(key)
    //   },
    //   // filter(mutation) {
    //   //   return mutation.type === 'setUserRole' || mutation.type === 'delUserData'
    //   // }
    // })
  ],
  // strict: true // 只能通过mutation(管理员)来更改状态，mutation不支异步
})

export default store
