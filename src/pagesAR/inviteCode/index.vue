<template>
  <view class="activation">
    <view class="header flex-center">
      <view class="input-size">
        <u-input
          v-model="inviteCode"
          class="activation-input"
          placeholder="请输入7位数字邀请码"
        />
      </view>
    </view>
    <view
      class="activation-btn"
      @click="codeActivate"
    >
      提交
    </view>
    <view class="instructions_for_use-view">
      <img
        class="instructions_for_use-img"
        src="../../static/ARImages/instructions_for_tip.png"
      >
    </view>
    <view class="text-view">
      <view class="text">
        1、请在输入框内填写好友发送给您的邀请码进行邀请绑定；
      </view>
      <view class="text">
        2、完成邀请绑定后点击购买，即可享受相关优惠权益；
      </view>
      <view class="text">
        3、购买后请合理安排游玩时间，避免过期影响您的游玩体验。
      </view>
    </view>
  </view>
</template>

<script>
import { addInviteCode } from '../../api/api'
export default {
  data() {
    return {
      inviteCode: '',
      scenicId: ''
    }
  },
  onReady() {},
  methods: {
    codeActivate() {
      addInviteCode({
        scenicId: this.scenicId,
        inviteCode: this.inviteCode
      })
        .then(() => {
          uni.showToast({
            title: '邀请成功',
            duration: 2000,
            icon: 'success',
            success: () => {
              uni.navigateBack()
            }
          })
          this.inviteCode = ''
        })
        .catch((e) => {
          console.error('邀请失败：', e)
        })
    }
  },
  onLoad(options) {
    this.scenicId = options.scenicId
  },
  onShow() {}
}
</script>

<style lang="scss">
.activation {
  .header {
    width: 622rpx;
    height: 84rpx;
    background: #ffffff;
    border-radius: 42rpx 42rpx 42rpx 42rpx;
    border: 2rpx solid #e8e8e8;
    margin-left: 64rpx;
    margin-top: 112rpx;
    .input-size {
      width: 550rpx !important;
      ::v-deep .uni-input-placeholder {
        text-align: center;
      }
      ::v-deep .uni-input-input {
        text-align: center;
      }
    }
  }
  .activation-btn {
    width: 622rpx;
    height: 96rpx;
    background: #0e4a86;
    border-radius: 48rpx 48rpx 48rpx 48rpx;
    font-size: 32rpx;
    font-family: PingFangSC-Medium-, PingFangSC-Medium;
    font-weight: normal;
    color: #ffffff;
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
    margin-right: 64rpx;
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
