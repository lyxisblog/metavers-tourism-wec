<!--
 * @Author: 王璇 xuan.wang@vonechain.com
 * @Date: 2023-10-20 09:54:05
 * @LastEditors: 王璇 xuan.wang@vonechain.com
 * @LastEditTime: 2023-11-17 17:14:07
 * @FilePath: /metaverse-tourism-h5/src/pagesPerson/feedback/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="page">
    <view class="feedbak">
      <u-input
        v-model="content"
        :type="type"
        :height="height"
        :max-length="100"
        :border="false"
        :clearable="false"
        placeholder="为了给您更好的使用体验，可在此输入产品使用遇到问题，或功能建议。"
      />
      <view class="limt">
        {{ limt }}/100
      </view>
    </view>
    <view class="feedbackbtn">
      <view
        class="btn"
        @click="submit"
      >
        提交
      </view>
    </view>
  </view>
</template>

<script>
import { saveFeedBack } from '@i/person'
const QQMapWX = require('../../utils/qqmap-wx-jssdk.js')
export default {
  data() {
    return {
      content: '',
      type: 'textarea',
      height: 300,
      longitude: '',
      latitude: '',
      cityName: ''
    }
  },
  computed: {
    limt() {
      this.content.trim()
      return this.content.length || 0
    }
  },
  onLoad(){
    this.getPosition()
  },
  methods: {
    submit() {
      if(this.content !== '' && this.limt <= 100) {
        saveFeedBack({
          content: this.content,
          cityName: this.cityName, // 经纬度
          latitude: this.latitude, // 纬度
          longitude: this.longitude, // 经度
          systemType: 2
        }).then(() => {
          uni.showToast({
            title: '反馈成功',
            duration: 2000,
            success: () => {
              setTimeout(() => {
                uni.navigateBack()
              }, 1000)
            }
          })
        }).catch((err) => {
          console.log(err)
        })
      } else {
        uni.showToast({
          title: '请输入100字符以内内容',
          icon: 'none',
          duration: 2000
        })
      }

    },
    // 获取定位
    getPosition(){
      const that = this
      const tMap = new QQMapWX({
        key: '56SBZ-4ULEG-3MIQ7-QVOXE-HUNXE-6PBMI' //开发者密钥
      })
      uni.getLocation({
        type: 'gcj02',
        success: function(res) {
          that.longitude = res.longitude
          that.latitude = res.latitude
          // 使用腾讯sdk的reverseGeocoder方法 解析经纬度
          tMap.reverseGeocoder({
            location: {
              latitude: that.latitude,
              longitude: that.longitude
            },
            success: function(res) {
              const regex = /[^省市]+(?=市)/g
              const result = res.result.address.match(regex)
              let city
              if (result && result.length > 0) {
                city = result[0]
                console.log(city)
              }
              that.cityName = city
              uni.setStorage({
                key: 'city',
                data: city,
                success() {
                  console.log('保存地址')
                }
              })
              uni.setStorageSync('latitude', that.latitude)
              uni.setStorageSync('longitude', that.longitude)
            },
            fail: function() {
              uni.showToast({
                title: '定位失败',
                duration: 2000,
                icon: 'none'
              })
            },
            complete: function() { //无论成功失败都会执行
              return
            }
          })
        },
        fail: function() {
          that.$refs.uToast.show({
            title: '请打开定位',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .feedbak{
    padding: 16px;
    background-color: #fff;
    .limt{
      font-size: 14px;
      font-weight: normal;
      color: #C1C1C1;
      text-align: right;
    }
  }
  .feedbackbtn{
    padding: 50px 16px;
  }
  .btn{
    font-size: 16px;
    font-weight: bold;
    color: #ffff;
    height: 48px;
    background: #004B8B;
    border-radius: 24px;
    text-align: center;
    line-height: 48px;

  }
</style>