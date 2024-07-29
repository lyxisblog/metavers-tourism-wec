/*
 * @Author: 王璇 xuan.wang@vonechain.com
 * @Date: 2023-10-18 13:56:09
 * @LastEditors: 王璇 xuan.wang@vonechain.com
 * @LastEditTime: 2023-11-02 17:36:54
 * @FilePath: /metaverse-tourism-h5/src/store/modules/user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const userInfo = JSON.parse(uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '{}')
const state = {
  token: '',
  openId: '',
  userInfo: userInfo || {},
  isToken: !!uni.getStorageSync('token'),
  cityStr:''
}


const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_OPENID: (state, openId) => {
    state.openId = openId
  },
  SET_USERONFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_ISTOKEN: (state, isToken) => {
    state.isToken = isToken
  },
  SET_CITYSTR: (state, cityStr) => {
    state.cityStr = cityStr
  }

}

const actions = {
  setToken({ commit }, token) {
    commit('SET_TOKEN', token)
    commit('SET_ISTOKEN', true)
    uni.setStorageSync('token', token)
  },
  setCityStr({ commit }, cityStr) {
    commit('SET_CITYSTR', cityStr)
    uni.setStorageSync('city', cityStr)
  },
  clearToken({ commit }) {
    // commit('SET_TOKEN', token)
    console.log(31231)
    uni.removeStorageSync('token')
    commit('SET_ISTOKEN', false)
  },
  setOpenId({ commit }, openId) {
    uni.setStorageSync('openId', openId)
    commit('SET_OPENID', openId)
  },
  clearOpenId() {
    uni.removeStorageSync('openId')
  },
  setUserInfo({ commit }, userInfo) {
    commit('SET_USERONFO', userInfo)
    uni.setStorageSync('userInfo', JSON.stringify(userInfo)
    )
  },
  clearUserInfo(){
    uni.removeStorageSync('userInfo')

  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
