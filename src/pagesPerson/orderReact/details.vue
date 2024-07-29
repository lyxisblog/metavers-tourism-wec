<template>
  <view class="details">
    <!-- 头部 -->
    <view
      class="header"
      :style="'background-image: url('+ orderDetail.sattDir +');padding-top:'+ statusHeight +'px;'"
    >
      <img
        src="../../static/images/goback_baise.svg"
        class="goback"
        @click="goBack"
      >
      <view class="title">
        订单详情
      </view>
    </view>
    <!-- 景区名称 -->
    <view class="top">
      <view class="name">
        {{ orderDetail.scenicName }}
      </view>
      <view class="bottom flex-between">
        <view class="money">
          ￥{{ orderDetail.amount }}
        </view>
        <!-- 激活logo -->
        <view
          v-if="orderType == 1"
          class="activation"
        >
          <img
            v-if="orderDetail.complexStatus == 2"
            src="../../static/images/active.svg"
            class="logo"
          >
          <img
            v-if="orderDetail.complexStatus == 5"
            src="../../static/images/out_date.svg"
            class="logo"
          >
          <img
            v-if="orderDetail.complexStatus == 4"
            src="../../static/images/expired.svg"
            class="logo"
          >
        </view>
        <view
          v-if="orderType == 0"
          class="complex-status"
          :class="orderDetail.complexStatus == 1 ? 'green' : orderDetail.complexStatus == 2 ? 'red' : '' "
        >
          {{ orderDetail.complexStatusMsg }}
        </view>
      </view>
    </view>
    <!-- 金额 -->
    <view class="middle">
      <!-- 激活 -->
      <view
        v-if="orderType == 1"
        class="row flex-between"
      >
        <view class="lable">
          激活时间
        </view>
        <view class="value">
          {{ orderDetail.payTime }}
        </view>
      </view>
      <view
        v-if="orderType == 1"
        class="row flex-between"
      >
        <view class="lable">
          订单编号
        </view>
        <view class="value">
          {{ orderDetail.payNo }}
        </view>
      </view>
      <view
        v-if="orderType == 1"
        class="row flex-between"
      >
        <view class="lable">
          使用有效期
        </view>
        <view class="value">
          {{ orderDetail.payEffectiveAlways == 1 ? '永久' : orderDetail.useStatus == 1 ? orderDetail.payEffectiveEnd : '自景区AR识别 — '+orderDetail.validHours+'小时内有效' }}
        </view>
      </view>
      <!-- 购买 -->
      <view
        v-if="orderType == 0"
        class="row flex-between"
      >
        <view class="lable">
          订单金额
        </view>
        <view class="value">
          ￥{{ orderDetail.amount }}
        </view>
      </view>
      <view
        v-if="orderType == 0 && orderDetail.balanceAmount !== '0.00'"
        class="row flex-between"
      >
        <view class="lable">
          钱包余额
        </view>
        <view class="value">
          -￥{{ orderDetail.balanceAmount }}
        </view>
      </view>
      <view
        v-if="orderType == 0"
        class="row flex-between"
      >
        <view class="lable">
          支付金额
        </view>
        <view class="value red">
          ￥{{ orderDetail.payAmount }}
        </view>
      </view>
    </view>
    <!-- 时间等信息 -->
    <view
      v-if="orderType == 0"
      class="bottom-time"
    >
      <view class="row flex-between">
        <view class="lable">
          创建时间
        </view>
        <view class="value">
          {{ orderDetail.orderCreateTime }}
        </view>
      </view>
      <view class="row flex-between">
        <view class="lable">
          付款时间
        </view>
        <view class="value">
          {{ orderDetail.payTime }}
        </view>
      </view>
      <view class="row flex-between">
        <view class="lable">
          订单编号
        </view>
        <view class="value">
          {{ orderDetail.payNo }}
        </view>
      </view>
      <view class="row flex-between">
        <view class="lable">
          订单方式
        </view>
        <view class="value">
          {{ orderDetail.payChannelMsg }}
        </view>
      </view>
      <view class="row flex-between">
        <view class="lable">
          使用有效期
        </view>
        <view class="value">
          {{ orderDetail.payEffectiveAlways == 1 ? '永久' : orderDetail.useStatus == 1 ? orderDetail.payEffectiveEnd : '自景区AR识别 — '+orderDetail.validHours+'小时内有效' }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getFrontOrderDetail } from '../../api/api'
export default {
  data(){
    return{
      id:'',
      orderType:0, // 0购买 1激活
      orderDetail:{},
      statusHeight:50
    }
  },
  methods:{
    // 返回上一页
    goBack () {
      wx.navigateBack({
        delta: 1
      })
    },
    // 获取详情
    getFrontOrderDetail(){
      const menuButtons = wx.getMenuButtonBoundingClientRect()
      const statusHeight = menuButtons.top //胶囊距离顶部
      // const navHeight = menuButtons.height //胶囊高度
      this.statusHeight = statusHeight + 5
      const parmas = {
        id:this.id
      }
      getFrontOrderDetail(parmas).then(res => {
        this.orderDetail = res
      })
    }
  },
  onLoad(option){
    this.id = option.id
    this.orderType = option.orderType
    this.getFrontOrderDetail()
  }

}
</script>

<style lang="scss" scoped>
  .details{
    background: #F7F7F7;
    // 头部
    .header {
      width: 750rpx;
      height: 750rpx;
      background: no-repeat;
      background-size: 100% 100%;
      display: flex;
      .goback{
        width: 36rpx;
        height: 36rpx;
        margin-left: 40rpx;
      }
      .title {
        font-size: 34rpx;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        margin-left: 250rpx;
      }
    }
    // 景区名称
    .top{
      width: 686rpx;
      height: 260rpx;
      background: #FFFFFF;
      border-radius: 20rpx 20rpx 20rpx 20rpx;
      margin-left: 32rpx;
      padding-top: 32rpx;
      position: relative;
      transform: translateY(-50%);
      .name{
        width: 624rpx;
        height: 96rpx;
        font-size: 34rpx;
        font-family: PingFang SC-Heavy, PingFang SC;
        font-weight: 800;
        color: #333333;
        margin-left: 32rpx;
      }
      .bottom {
        margin-top: 20rpx;
        margin-left: 32rpx;
        .money {
          height: 72rpx;
          font-size: 50rpx;
          font-family: PingFang SC-Bold, PingFang SC;
          font-weight: bold;
          color: #FF0000;
        }
      }
      .activation {
        position: absolute;
        width: 150rpx;
        height: 125rpx;
        right: 38rpx;
        bottom: 26rpx;
        .logo {
          width: 150rpx;
          height: 125rpx;
        }
      }
      .complex-status {
        width: 160rpx;
        height: 64rpx;
        border-radius: 32rpx 32rpx 32rpx 32rpx;
        text-align: center;
        line-height: 64rpx;
        font-size: 30rpx;
        font-family: PingFang SC-Heavy, PingFang SC;
        font-weight: 800;
        margin-right: 32rpx;
      }
      .green {
        color: #30AA14;
        background: rgba(48,170,20,0.11);
      }
      .red {
        background: rgba(255,0,0,0.11);
        color: #FF0000;
      }
    }
    // 金额
    .middle {
      width: 686rpx;
      background: #FFFFFF;
      border-radius: 20rpx 20rpx 20rpx 20rpx;
      padding: 20rpx 32rpx;
      margin-left: 32rpx;
      position: relative;
      bottom: 100rpx;
      .row {
        height: 60rpx;
        line-height: 60rpx;
        font-size: 28rpx;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: bold;
        color: #333333;
        .red{
          color: #FF0000;
        }
      }
    }
    .bottom-time {
      height: 340rpx  ;
      width: 686rpx;
      background: #FFFFFF;
      border-radius: 20rpx 20rpx 20rpx 20rpx;
      margin-left: 32rpx;
      position: relative;
      bottom: 68rpx;
      padding: 22rpx 32rpx;
      .row {
        height: 60rpx;
        line-height: 60rpx;
        font-size: 28rpx;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: bold;
        color: #333333;
      }
    }
  }
</style>