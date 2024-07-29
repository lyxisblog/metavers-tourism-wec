<!--
 * @Author: 王璇 xuan.wang@vonechain.com
 * @Date: 2023-05-25 10:49:25
 * @LastEditors: 王璇 xuan.wang@vonechain.com
 * @LastEditTime: 2023-10-18 09:55:09
 * @FilePath: /metaverse-tourism-h5/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`,
 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <view>
    <u-toast ref="uToast" />
  </view>
</template>
<script>
const QQMapWX = require('./utils/qqmap-wx-jssdk.js')
import { mapGetters } from 'vuex'
export default {
  onLaunch: function() {
    console.log('App Launch')
    this.getPositionApp()
  },
  onShow: function() {
    console.log('App Show')
    // uni.hideHomeButton()
  },
  onHide: function() {
    console.log('App Hide')
  },
  onUnload:function(){
    console.log('App onUnload')
    uni.removeStorageSync('city')
  },
  computed: {
    ...mapGetters([
      'cityStr'
    ])
  },
  methods:{
    // 获取定位
    getPositionApp() {
      const popupShow = uni.getStorageSync('popupShow') //隐私协议
      if (!popupShow) return
      const that = this
      const tMap = new QQMapWX({
        key: '56SBZ-4ULEG-3MIQ7-QVOXE-HUNXE-6PBMI' //开发者密钥
      })
      uni.getLocation({
        type: 'gcj02',
        success: function (res) {
          that.longitude = res.longitude
          that.latitude = res.latitude
          // const cityStr = uni.getStorageSync('city')
          // if (cityStr) {
          //   return
          // }
          // 使用腾讯sdk的reverseGeocoder方法 解析经纬度
          tMap.reverseGeocoder({
            location: {
              latitude: that.latitude,
              longitude: that.longitude
            },
            success: function (res) {
              console.log('解析地址成功', res)
              console.log('当前地址：', res.result.address)
              const regex = /[^省市]+(?=市)/g
              const result = res.result.address.match(regex)
              let city
              if (result && result.length > 0) {
                city = result[0]
                console.log(city)
              }
              that.city = city
              //保存缓存
              // uni.setStorage({
              //   key: 'city',
              //   data: city,
              //   success() {
              //     console.log('保存地址')
              //   }
              // })
              that.$store.dispatch('user/setCityStr', city )
              uni.setStorageSync('latitude', that.latitude)
              uni.setStorageSync('longitude', that.longitude)
            },
            fail: function (res) {
              uni.showToast({
                title: '定位失败',
                duration: 2000,
                icon: 'none'
              })
              console.log(res)
            },
            complete: function () {
              //无论成功失败都会执行
              console.log('获取定位信息')
              return
            }
          })
        },
        fail: function (res) {
          if (res.errno === 103) {
            //未给定位权限
            wx.showModal({
              title: '提示',
              content: '您尚未授权地理位置权限，请前往设置授权',
              showCancel: true,
              success: function (res) {
                if (res.confirm) {
                  wx.openSetting({
                    settingList: [ 'scope.userLocation' ],
                    success: function () {
                      console.log('打开设置成功')
                    }
                  })
                }
              }
            })
          } else {
            uni.showToast({
              title: '请打开定位定位',
              duration: 2000,
              icon: 'none',
              type: 'error'
            })
          }
          console.log(res)
        }
      })
    }
  }
}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
</style>
