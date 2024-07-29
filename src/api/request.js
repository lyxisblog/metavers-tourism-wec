/*
 * @Author: 王璇 xuan.wang@vonechain.com
 * @Date: 2023-05-25 10:49:25
 * @LastEditors: 王璇 xuan.wang@vonechain.com
 * @LastEditTime: 2024-01-23 15:17:36
 * @FilePath: /metaverse-tourism-h5/src/api/request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//封装请求函数，方便操作
const baseUrl = process.env.VUE_APP_BASEURL //请求的基础路径

// const baseUrl = "https://metaverse-jwar-release.oss-cn-shanghai.aliyuncs.com" //请求的基础路径
import AES from '@u/AES'
import RSA from '@u/RSA'
import { RSAPrivateKey, RSAPublicKey } from '@u/const'
import store from '@/store'
const request = async (config) => {
  if (config.privateKey) {
    const key32 = AES.genKey()
    const newData = { ...config.data }
    config.data = {}
    config.data.encryptKey = RSA.encrypt(key32, RSAPublicKey)
    config.data.encryptData = AES.encrypt(newData, key32)
  }
  //修改请求方法
  config.method = config.method || 'GET'
  config.url = baseUrl + config.url
  config.header = {
    'content-type': 'application/json;charset=UTF-8',
    platform: '1',
    'Authori-zation': uni.getStorageSync('token') || '',
    clientType: 'wechatMini'
  }
  //调用小程序uni.request
  const [ error, res ] = await uni.request(config)
  return new Promise((resolve, reject) => {
    if (!error) {
      if (res.data.code === 500) {
        uni.showToast({
          title: res.data.message,
          duration: 2000,
          icon: 'none'
        })
        reject(res.data)
      } else if (res.data.code === 401 || res.data.code === 402) {
        store.dispatch('user/clearToken')
        store.dispatch('user/clearUserInfo')
        uni.showToast({
          title: '登录已过期或在其他端登录',
          duration: 2000,
          icon: 'none',
          success: () => {
            // console.log('config', config)
            // 不需要传入参数的白名单
            if(config.url.includes('/front/activity/attend/task')) {
              config.data.scenicId = ''
            }
            setTimeout(() => {
              uni.navigateTo({
                url: '/pagesA/login/index?param=' + JSON.stringify(config.data)
              })
            }, 1000)
          }
        })
      } else if (res.data.code === 200) {
        resolve(res.data.data)
      } else if (res.statusCode === 200 && res.data.encryptData) {
        const { encryptData, encryptKey } = res.data
        const key = RSA.decrypt(encryptKey, RSAPrivateKey)
        const decryptData = AES.decrypt(encryptData, key)
        resolve(decryptData.data)
      } else {
        uni.showToast({
          title: res.data.message,
          duration: 2000,
          icon: 'none'
        })
        reject()
      }
    } else {
      reject()
    }
  })
}
//导出

export default request
