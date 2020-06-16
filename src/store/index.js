import Vue from 'vue'
import Vuex from 'vuex'

import {reqAddress} from "../api"


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    latitude: 40.10038, // 纬度
    longitude: 116.36867, // 经度
    address:''
  },
  mutations: {
    RECEIVE_ADDRESS(state,{address}) {
      state.address = address
    },
  },
  actions: {
    async getAddress ({commit, state}) {
      const geohash = `${state.latitude},${state.longitude}`
      const result = await reqAddress(geohash)
      if (result.code === 0) {
        const address = result.data
        commit('RECEIVE_ADDRESS', {address})
      }
    },
  },
  modules: {
  }
})
