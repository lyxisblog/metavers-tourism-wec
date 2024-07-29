<template>
  <cover-view
    v-if="shareState"
    class="share-box"
  >
    <cover-image
      class="picture"
      src="../../static/ARImages/payBgImg.png"
      mode="aspectFit"
    />
    <cover-view class="textView">
      <cover-view class="title">
        提示
      </cover-view>
      <cover-view class="content">
        免费体验已结束，解锁成功立享更多精彩。
      </cover-view>
      <cover-view
        class="payBtn"
        @click="goPay"
      >
        立即支付
      </cover-view>
      <cover-view class="bottomText flex-middle">
        <cover-view>已有激活码？</cover-view>
        <cover-view
          class="act"
          @click="goPay"
        >
          点击激活
        </cover-view>
      </cover-view>
    </cover-view>
    <cover-view class="close-icon">
      <cover-image
        src="../../static/images/close_white.png"
        @click="handleBack"
      />
    </cover-view>
  </cover-view>
</template>

<script>
export default {
  data() {
    return {
      shareState: false
    }
  },
  methods: {
    goPay() {
      this.$emit('goPay')
    },

    handleShow() {
      this.shareState = true
    },
    handleHidden() {
      this.shareState = false
    },
    handleBack(){
      // eslint-disable-next-line no-undef
      const pages = getCurrentPages()
      if(pages.length >= 2) {
        uni.navigateBack({
          delta: 1
        })
      }else{
        uni.reLaunch({
          url: '/pages/home/home' // 跳转到新页面
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.share-box {
  width: 100%;
  height: auto;
  position: fixed;
  top: 0rpx;
  left: 0rpx;
  bottom: 0rpx;
  right: 0rpx;
  background-color: rgba(0, 0, 0, 0.7);
  transition: 0.3s;
  z-index: 99999;

  .close-icon {
    position: fixed;
    z-index: 10000;
    left: 48%;
    bottom: 20%;
  }

  .picture {
    width: 80%;
    height: 45%;
    top: 21%;
    left: 10%;
    border-radius: 32rpx;
    position: fixed;
  }

  .textView {
    position: fixed;
    z-index: 10000;
    top: 21%;
    left: 15%;
    width: 70%;
    display: flex;
    flex-direction: column;

    .title {
      font-weight: 800;
      color: #333333;
      font-size: 40rpx;
      width: 100%;
      text-align: center;
      margin: 10% 0;
    }

    .content {
      font-size: 32rpx;
      white-space: pre-wrap;
      flex-grow: 1;
      text-align: center;
      line-height: 60rpx;
      margin: 0 40rpx;
    }

    .payBtn {
      height: 96rpx;
      background: #0e4a86;
      border-radius: 48rpx 48rpx 48rpx 48rpx;
      opacity: 1;
      color: white;
      font-size: 40rpx;
      height: 96rpx;
      line-height: 96rpx;
      text-align: center;
      margin-top: 10%;
    }

    .bottomText {
      color: #666666;
      display: flex;
      justify-content: center;
      margin-top: 5%;
    }

    .act {
      font-size: 28rpx;
      font-weight: bold;
      color: #016cc8;
      margin: 10% 0;
    }
  }
}

</style>
