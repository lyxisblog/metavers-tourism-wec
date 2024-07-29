<!--
 * @Author: 王璇 xuan.wang@vonechain.com
 * @Date: 2023-08-20 15:07:52
 * @LastEditors: 王璇 xuan.wang@vonechain.com
 * @LastEditTime: 2023-11-22 13:27:30
 * @FilePath: /metaverse-tourism-h5/src/pages/activation/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="activation">
    <view class="header flex-center">
      <view class="input-size">
        <u-input
          v-model="activityCode"
          class="activation-input"
          placeholder="请输入激活码"
        />
      </view>
    </view>
    <view
      class="activation-btn"
      @click="codeActivate"
    >
      立即激活
    </view>
    <view class="instructions_for_use-view">
      <img
        class="instructions_for_use-img"
        src="../../static/images/instructions_for_use.png"
      >
    </view>
    <view class="text-view">
      <view class="text">
        1、请确认您选择激活的AR景区与您购买的景区一致；
      </view>
      <view class="text">
        2、请在输入框内填写您获取到的激活码进行激活操作；
      </view>
      <view class="text">
        3、激活后可在有效期内免费使用对应景区的AR产品；
      </view>
      <view class="text">
        4、请您合理安排游玩时间，避免过期影响您的游玩体验。
      </view>
    </view>
  </view>
</template>

<script>
import { codeActivate } from '../../api/api'
export default {
  data () {
    return {
      activityCode:'',
      //埋点对象：页面打开时触发
      sensorsPageView:{
        page_name:'激活页面', //页面名称
        refer_page_name:'', //来源页面
        scenic_id:'', //页面景区id
        user_lng:'', //用户定位的经度
        user_lat:'', //用户定位的纬度
        is_inside_scenic:''//用户定位是否在景区内
      },
      //埋点对象：用户点击时触发
      sensorsClk:{
        page_name:'激活页面', //页面名称
        refer_page_name:'', //来源页面
        scenic_id:'', //页面景区id
        user_lng:'', //用户定位的经度
        user_lat:'', //用户定位的纬度
        is_inside_scenic:'', //用户定位是否在景区内
        element_name:'激活页面', //模块名称
        element_parameter:'', //模块参数
        item_id:'', //内容id
        item_type:''//内容类型
      }
    }
  },
  onReady() {
  },
  methods: {
    // 埋点方法
    trackFun(type, data){
      // 获取定位
      const latitudeStr = uni.getStorageSync('latitude')
      const longitudeStr = uni.getStorageSync('longitude')
      // 根据类型传值
      if(type && type === 'YLXH_PageView'){
        this.sensorsPageView.user_lng = longitudeStr
        this.sensorsPageView.user_lat = latitudeStr
        this.$sensors.track('YLXH_PageView', this.sensorsPageView)
      }else if(type && type === 'YLXH_Clk'){
        this.sensorsClk.user_lng = longitudeStr
        this.sensorsClk.user_lat = latitudeStr
        this.sensorsClk.element_parameter = data.element_parameter
        this.$sensors.track('YLXH_Clk', this.sensorsClk)
      }
    },
    // 激活方法
    codeActivate(){
      // 埋点
      // this.trackFun('YLXH_Clk', { element_parameter:'立即激活' })
      const params = {
        activityCode: this.activityCode,
        payChannel: 3,
        payTerminal: 3,
        scenicId: this.scenicId,
        payPosition: 0
      }
      codeActivate(params).then(res => {
        if (res) {
          uni.showToast({
            title: '激活成功',
            duration: 2000
          })
          uni.navigateBack()
        }
      })
    }
  },
  onLoad (parmas) {
    this.scenicId = parmas.scenicId
  }
}
</script>

<style lang="scss">
  .activation {
    .header {
      width: 622rpx;
      height: 84rpx;
      background: #FFFFFF;
      border-radius: 42rpx 42rpx 42rpx 42rpx;
      border: 2rpx solid #E8E8E8;
      margin-left: 64rpx;
      margin-top: 112rpx;
      .input-size {
        width: 550rpx !important;
        ::v-deep .uni-input-placeholder{
          text-align: center;
        }
        ::v-deep .uni-input-input{
          text-align: center;
        }
      }
    }
    .activation-btn {
      width: 622rpx;
      height: 96rpx;
      background: #0E4A86;
      border-radius: 48rpx 48rpx 48rpx 48rpx;
      font-size: 32rpx;
      font-family: PingFangSC-Medium-, PingFangSC-Medium;
      font-weight: normal;
      color: #FFFFFF;
      text-align: center;
      line-height: 96rpx;
      margin-left: 64rpx;
      margin-top: 48rpx;
    }
    .instructions_for_use-view {
      margin-top: 128rpx;
      margin-left: 162rpx;
      .instructions_for_use-img {
        width: 428rpx;
        height: 40rpx;
      }
    }
    .text-view {
      margin-top: 12rpx;
      margin-left: 64rpx;
      .text {
        margin-top: 8rpx;
        font-size: 24rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        color: #333333;
      }
    }
  }
</style>