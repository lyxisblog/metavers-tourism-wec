<template>
  <view
    class="scanCode"
    :style="'background-image: url('+ scanSpecification +');'"
  >
    <view
      class="btn"
      style="background-image: url(https://metaverse-uni.oss-cn-shanghai.aliyuncs.com/file/wechat/scanCode_btn.png);"
      @click="getPosition"
    />
  </view>
</template>

<script>
import { isInScenicSpot } from '../../api/api'
export default {
  data(){
    return {
      scenicId:'',
      mapId:'',
      longitude:'',
      latitude:'',
      scanSpecification:''
    }
  },
  onLoad(option){
    this.scenicId = option.scenicId
    this.scanSpecification = option.scanSpecification
  },
  methods:{
    // 判断是否在景区
    isInScenicSpot(){
      const params = {
        scenicId: this.scenicId,
        longitude:this.longitude,
        latitude:this.latitude
      }
      isInScenicSpot(params).then(res => {
        if (res) {
          this.openCode()
        }else{
          uni.showToast({
            title: '您不在景区，请到景区内使用',
            duration: 2000,
            icon: 'none'
          })
        }
      })
    },
    // 打开二维码扫描
    openCode(){
      const that = this
      wx.scanCode({
        onlyFromCamera: true,
        success(res) {
          that.mapId = res.result
          that.goAR()
        }
      })
    },
    // 跳转到AR页面
    goAR(){
      uni.navigateTo({
        url: '/pagesAR/guide/index?scenicId=' + this.scenicId + '&mapId=' + this.mapId
      })
    },
    // 获取定位
    getPosition() {
      const that = this
      uni.getLocation({
        type: 'gcj02',
        success: function (res) {
          that.longitude = res.longitude
          that.latitude = res.latitude
          uni.setStorageSync('latitude', that.latitude)
          uni.setStorageSync('longitude', that.longitude)
          that.isInScenicSpot()
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
              title: '请打开定位',
              duration: 2000,
              icon: 'error'
            })
          }
          console.log(res)
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.scanCode {
  width: 100vw;
  height: 100vh;
  background-size: 100%;
  .btn {
    width: 426.81rpx;
    height: 91rpx;
    position: absolute;
    top: auto;
    bottom: 187rpx;
    left: 173rpx;
    background-size: 100%;
  }
}
</style>
