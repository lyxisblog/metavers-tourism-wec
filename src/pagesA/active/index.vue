<template>
  <view class="active">
    <view class="header">
      <view
        class="flex-center"
      >
        <view class="title flex-middle">
          <img
            class="title-img"
            src="../../static/images/gou.svg"
          >
          <view>{{ state == 1 ? '已购买' : '已激活' }}</view>
        </view>
      </view>
      <view class="prompt">
        温馨提示：若购买后{{ orderInfo.autoExpireDays }}天内未使用则自动失效
      </view>
    </view>
    <view class="main">
      <view class="top flex-middle">
        <view class="left">
          <img
            class="scenicPic"
            :src="orderInfo.scenicPic"
          >
        </view>
        <view class="right">
          <view class="scenicName">
            {{ orderInfo.scenicName }}
          </view>
          <view class="city flex-middle">
            <img
              class="city-icon"
              src="../../static/images/positioning_1.svg"
            >
            <view class="city-text">
              {{ orderInfo.cityName }}
            </view>
          </view>
          <view class="createTime">
            {{ state == 1 ? '购买' : '激活' }}时间：{{ orderInfo.createTime }}
          </view>
        </view>
      </view>
      <view class="bottom flex-between">
        <view>使用有效期至</view>
        <view>{{ orderInfo.payEffectiveAlways == 1 ? '永久有效' : orderInfo.useStatus == 1 ? orderInfo.payEffectiveEnd : '自景区AR识别—'+ orderInfo.validHours +'小时内有效' }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { getOrderInfo } from '../../api/api'
export default {
  data () {
    return {
      payNo:'',
      state:0,
      orderInfo:{
        scenicPic:'',
        scenicName:'',
        cityName:'',
        createTime:'',
        payEffectiveEnd:''
      }
    }
  },
  onReady() {
  },
  methods: {
    // 获取参数
    getState(options){
      console.log('options111', options)
      // this.payNo = '421416989745233533064'
      // this.state = 1
      this.payNo = options.payNo ? options.payNo : ''
      this.state = options.state ? options.state : 0
      this.getOrderInfo()
    },
    // 获取订单详情
    getOrderInfo(){
      const params = {
        payNo:this.payNo
      }
      getOrderInfo(params).then(res => {
        this.orderInfo = res
      })
    }
  },
  onLoad (options) {
    this.getState(options)
  },
  onShow () {
  }
}
</script>

<style lang="scss">
  .active {
    .header {
      width: 750rpx;
      height: 772rpx;
      background: linear-gradient(180deg, #EAF4FF 0%, rgba(218,234,255,0) 100%);
      .title {
        font-size: 40rpx;
        font-family: PingFangSC-Semibold-, PingFangSC-Semibold;
        font-weight: normal;
        color: #333333;
        margin-top: 40rpx;
        .title-img {
          width: 44rpx;
          height: 44rpx;
          margin-right: 16rpx;
        }
      }
      .prompt {
        width: 686rpx;
        height: 64rpx;
        background: #FFFAEF;
        border-radius: 16rpx 16rpx 16rpx 16rpx;
        font-size: 24rpx;
        font-family: PingFangSC-Medium-, PingFangSC-Medium;
        font-weight: normal;
        color: #FEB922;
        line-height: 64rpx;
        text-align: center;
        margin-left: 32rpx;
        margin-top: 82rpx;
      }
    }
    .main {
      width: 690rpx;
      height: 414rpx;
      background: #FFFFFF;
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      margin-left: 32rpx;
      position: relative;
      bottom: 500rpx;
      padding: 32rpx 32rpx 42rpx 32rpx;
      .top {
        .left {
          .scenicPic {
            width: 200rpx;
            height: 224rpx;
            border-radius: 16rpx 16rpx 16rpx 16rpx;
          }
        }
        .right {
          height: 224rpx;
          margin-left: 32rpx;
          .scenicName {
            width: 394rpx;
            height: 88rpx;
            font-size: 32rpx;
            font-family: PingFangSC-Medium-, PingFangSC-Medium;
            font-weight: normal;
            color: #333333;
          }
          .city {
            font-size: 24rpx;
            font-family: PingFangSC-Regular-, PingFangSC-Regular;
            font-weight: normal;
            color: #999999;
            .city-icon{
              width: 32rpx;
              height: 32rpx;
            }
            .city-text {
              margin-left: 8rpx;
            }
          }
          .createTime {
            font-size: 24rpx;
            font-family: PingFangSC-Regular-, PingFangSC-Regular;
            font-weight: normal;
            color: #999999;
            margin-top: 50rpx;
          }
        }
      }
      .bottom {
        margin-top: 76rpx;
        font-size: 28rpx;
        font-family: PingFangSC-Medium-, PingFangSC-Medium;
        font-weight: normal;
        color: #333333;
      }
    }
  }
</style>