<template>
  <view class="couponDetails">
    <view class="main">
      <!-- 背景图 -->
      <view
        class="back"
        :style="'background-image: url(' + couponDetails.merAvatar + ');'"
      >
        <view class="head">
          <img
            class="head-img"
            :src="couponDetails.merAvatar"
            alt="头像"
          >
        </view>
        <view class="back-title">
          {{ couponDetails.couponName }}
        </view>
      </view>
      <!-- 二维码 -->
      <view class="QRcode">
        <img
          :src="couponDetails.qrCodeUrl"
          class="QRcode-img"
        >
      </view>
      <view class="QRcode-text">
        向商家出示此二维码
      </view>
      <view class="dashed" />
      <view class="text bord">
        有效期限：
      </view>
      <view class="text">
        {{ couponDetails.effectiveStart + '至' + couponDetails.effectiveEnd }}
      </view>
      <view class="text bord">
        使用范围：
      </view>
      <view class="text ">
        {{ couponDetails.useScopeDescribe }}
      </view>
      <view
        v-if="couponDetails.useInstruction"
        class="text bord"
      >
        使用说明：
      </view>
      <view
        v-if="couponDetails.useInstruction"
        class="text"
      >
        {{ couponDetails.useInstruction }}
      </view>
    </view>
  </view>
</template>

<script>
import { useCoupon } from '../../api/guideMap'
export default {
  data(){
    return{
      id:'',
      couponDetails:{}
    }
  },
  methods:{
    // 获取详情数据
    useCoupon(){
      const params = {
        id:this.id
      }
      useCoupon(params).then(res => {
        this.couponDetails = res
      })
    }
  },
  onLoad (options) {
    this.id = options.id
    this.useCoupon()
  }
}
</script>

<style lang="scss">
  .couponDetails {
    padding-top: 142rpx;
    .main {
      width: 686rpx;
      margin-left: 32rpx;
      background: linear-gradient(to bottom, #FFFFFF, #FDE4AE);
      padding-bottom: 20rpx;
      border-radius: 20rpx;
      .back {
        background-size: contain;
        .head{
          width: 196rpx;
          height: 196rpx;
          border: 6rpx solid #FFFFFF;
          border-radius: 98rpx;
          margin-left: 343rpx - 98rpx;
          position: relative;
          transform: translateY(-50%);
          overflow: hidden;
          .head-img {
            width: 196rpx;
            height: 196rpx;
          }
        }
        .back-title {
          font-size: 40rpx;
          font-family: PingFangSC, PingFang SC;
          font-weight: 600;
          color: #FFFFFF;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
          text-align: center;
          position: relative;
          bottom: 78rpx;
        }
      }
      .QRcode {
        width: 446rpx;
        height: 446rpx;
        margin-left: 120rpx;
        margin-top: 40rpx;
        .QRcode-img {
          width: 446rpx;
          height: 446rpx;
        }
      }
      .QRcode-text {
        font-size: 28rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        color: #333333;
        margin-top: 20rpx;
        text-align: center;
      }
      .dashed {
        border-bottom: 2rpx dashed #333333;
        width: 634rpx;
        height: 1rpx;
        margin-top: 30rpx;
        margin-left: 26rpx;
      }
      .text {
        font-size: 26rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        color: #333333;
        margin-top: 15rpx;
        margin-left: 26rpx;
        margin-right: 26rpx;
      }
      .bord {
        font-weight: bold;
      }
    }
  }
</style>