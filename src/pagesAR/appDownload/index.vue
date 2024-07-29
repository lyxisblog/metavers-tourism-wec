<template>
  <view style="height: 100%;background-color: #ffffff;">
    <image
      src="https://metaverse-uni.oss-cn-shanghai.aliyuncs.com/download/bg-2.png"
      style="width: 100%;height: 100vh;"
      alt=""
    >
      <view class="btn-box">
        <view style="margin:20rpx">
          点击下方按钮复制链接后，请到手机浏览器打开
        </view>
        <view
          class="btn"
          :style="isIos ? 'display:block':'display:none'"
          @click="handleclick"
        >
          <image
            src="https://metaverse-uni.oss-cn-shanghai.aliyuncs.com/download/ios.png"
            class="icon"
          >
            <span class="icon-text">iPhone下载</span>
          </image>
        </view>
        <view
          class="btn"
          :style="isIos ? 'display:none':'display:block'"
          @click="handleclick"
        >
          <image
            src="https://metaverse-uni.oss-cn-shanghai.aliyuncs.com/download/ando.png"
            class="icon"
          >
            <span class="icon-text">Android下载</span>
          </image>
        </view>
      </view>
    </image>
  </view>
</template>

<script>
import { getDownloadAppUrl } from '@i/guideMap.js'
export default {
  data() {
    return { downloadAppUrl: '', isIos: false }
  },
  onLoad() {
    uni.getSystemInfo({
      success: (info) => {
        this.isIos = info.osName === 'ios'
        getDownloadAppUrl().then((res) => {
          if (this.isIos) {
            this.downloadAppUrl = res.iosUrl
          } else {
            this.downloadAppUrl = res.androidUrl
          }

          console.log('getDownloadAppUrl:', this.downloadAppUrl, this.isIos)
        })
      }
    })
  },
  methods: {
    handleclick() {
      uni.setClipboardData({
        data: this.downloadAppUrl,
        success() {
          uni.showToast({
            title: '复制成功',
            duration: 2000
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.btn-box {
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 12%;
  width: 100%;
}
.btn {
  width: 309px;
  height: 50px;
  background: #4382ff;
  border-radius: 25px 25px 25px 25px;
  opacity: 1;
  font-size: 16px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 50px;
  text-align: center;
}
.icon {
  width: 32px;
  height: 32px;
  vertical-align: middle;
  display: inline-block;
  margin-bottom: 6px;
}
.icon-text {
  display: inline-block;
}
</style>
