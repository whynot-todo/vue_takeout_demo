import Vue from 'vue'
import Vuex from 'vuex'

import { reqAddress, reqFoodCategorys, reqShops, reqShopRatings, reqShopInfo, reqShopFoods } from "../api"


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    latitude: 40.10038, // 纬度
    longitude: 116.36867, // 经度
    address: '',
    categorys: [], // 食品分类数组
    shops: [],
    shopInfo: {},
    cartFoods: [],
    shopRatings: []
  },
  mutations: {
    RECEIVE_ADDRESS(state, { address }) {
      state.address = address
    },
    RECEIVE_CATEGORYS(state, { categorys }) {
      state.categorys = categorys
    },
    RECEIVE_SHOPS(state, { shops }) {
      state.shops = shops
    },
    RECEIVE_SHOPFOODS(state, { foods }) {
      state.foods = foods
    },
    RECEIVE_SHOPINFO(state, { shopInfo }) {
      state.shopInfo = shopInfo
    },
    RECEIVE_SHOP_RATINGS(state, { shopRatings }) {
      state.shopRatings = shopRatings
  },
  },
  actions: {
    async getAddress({ commit, state }) {
      const geohash = `${state.latitude},${state.longitude}`
      const result = await reqAddress(geohash)
      if (result.code === 0) {
        const address = result.data
        commit('RECEIVE_ADDRESS', { address })
      }
    },
    async getCategorys({ commit }) {
      const result = await reqFoodCategorys()
      if (result.code === 0) {
        const categorys = result.data
        commit('RECEIVE_CATEGORYS', { categorys })
      }
    },
    // 异步获取商家列表
    async getShops({ commit, state }) {
      // 发送异步ajax请求
      const { longitude, latitude } = state
      const result = await reqShops(longitude, latitude)
      // 提交一个mutation
      if (result.code === 0) {
        const shops = result.data
        commit('RECEIVE_SHOPS', { shops })
      }
    },
    async getShopFoods({ commit }, callback) {
      const result = await reqShopFoods()
      if (result.code === 0) {
        const foods = result.data
        commit('RECEIVE_SHOPFOODS', { foods })
        callback & callback()
      }
    },
    async getShopInfo({ commit }) {
      const result = await reqShopInfo()
      if (result.code === 0) {
        const shopInfo = result.data
        console.log(shopInfo)
        commit('RECEIVE_SHOPINFO', { shopInfo })
      }
    },
    async getShopRatings({ commit }, callback) {
      const result = await reqShopRatings()
      console.log(result)
      if (result.code === 0) {
        const shopRatings = result.data
        commit('RECEIVE_SHOP_RATINGS', { shopRatings })
      }
      callback && callback()
    },
    updateCount({ commit }, { isAdd, food }) {
      if (isAdd) {
        commit(Add_CART_COUNT, { food })
      } else {
        commit(DECREMENT_CART_COUNT, { food })
      }
    },
  },
  modules: {
  }
})
