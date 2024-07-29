/*
 * @Author: 王璇 xuan.wang@vonechain.com
 * @Date: 2023-05-25 10:49:25
 * @LastEditors: 王璇 xuan.wang@vonechain.com
 * @LastEditTime: 2024-03-15 13:13:31
 * @FilePath: /metaverse-tourism-h5/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
import uView from 'uview-ui'
import store from './store'
import Tabbar from '@c/common/tabbar'
import filters from '@u/filters'
import sensors from 'sa-sdk-miniprogram'
import { appSystemConfig } from '@i/api'

Object.keys(filters).map(v => {
  Vue.filter(v, filters[v])
})
Vue.component('Tabbar', Tabbar)
const accountInfo = uni.getAccountInfoSync()
async function getappSystemConfig() {
  await appSystemConfig().then(res => {
    sensors.registerApp({
      is_login: () => {
        return store.getters.isToken
      },
      platform_name: '游历星河小程序',
      platform_version: accountInfo.miniProgram.version
    })
    sensors.init({
      name: 'sensors',
      server_url: res.pointUrl,
      // 默认地址
      // server_url: 'https://gather.gmoregalaxy.com/sa?project=default',
      show_log: true
    })
  })
}
// getappSystemConfig()
// 这里举例使用的是全域用户关联 - IDM 3.0 初始化方式 ,也可以按实际需求换成上面 1.1 中的简易用户关联 - IDM 2.0 初始化方式

Vue.use(uView)
Vue.prototype.$sensors = sensors

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()