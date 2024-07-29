<template>
  <cover-view
    v-if="shareState"
    class="share share-box"
  >
    <cover-view class="image-container">
      <cover-view style="width: 100%">
        <cover-image
          class="close-icon"
          src="../../static/images/close_white.png"
          @click="handleHiddenShare"
        />
      </cover-view>
      <cover-image
        id="iconUrlImg"
        class="picture"
        :src="iconUrl"
        mode="aspectFit"
        @load="pictureLoaded"
      />
    </cover-view>
    <cover-view class="share-item share-show">
      <cover-view class="content">
        <cover-view class="block">
          <button @click="showInviteInfo">
            <cover-image
              class="cover-image"
              src="../../static/ARImages/info.png"
              mode="aspectFill"
            />
            <cover-view class="cover-view">
              说明
            </cover-view>
          </button>
        </cover-view>
        <cover-view class="block">
          <button @click="shareToSession">
            <cover-image
              class="cover-image"
              src="../../static/ARImages/wechat.png"
              mode="aspectFill"
            />
            <cover-view class="cover-view">
              微信
            </cover-view>
          </button>
        </cover-view>
        <cover-view class="block">
          <button
            class="button"
            @click="downloadPost"
          >
            <cover-image
              class="cover-image"
              src="../../static/ARImages/download.png"
              mode="aspectFill"
            />
            <cover-view class="cover-view">
              下载
            </cover-view>
          </button>
        </cover-view>
      </cover-view>
    </cover-view>
    <cover-view
      class="inviteInfo"
      :style="(shareState && showInfo) ?'display:block' : 'display:none'"
      @click="clickKnown"
    >
      <cover-view class="inviteInfoContent">
        <cover-image
          src="../../static/ARImages/inviteInfoBg.png"
          mode="aspectFit"
          style="visibility: visible !important"
        />
        <cover-view class="infoText">
          第一步，分享好友通过游历星河微信小程序内扫一扫即可实现自动邀请
        </cover-view>
        <cover-view class="infoText">
          第二步，好友购买AR成功后即可获取 {{ inviterAmount }} 元奖励
        </cover-view>
        <cover-view class="infoText">
          第三步，邀请收益至我的——钱包查看
        </cover-view>
        <cover-view class="code-btn">
          <cover-view
            class="btn-submit"
            @click="clickKnown"
          >
            我知道了
          </cover-view>
        </cover-view>
      </cover-view>
    </cover-view>
  </cover-view>
</template>

<script>
function debounce(func, delay) {
  let timerId
  return function (...args) {
    clearTimeout(timerId)
    timerId = setTimeout(function () {
      func.apply(this, ...args)
    }, delay)
  }
}
export default {
  props: {
    iconUrl: {
      type: String,
      default: ''
    },
    inviterAmount: {
      type: Number,
      default: 0
    },
    osName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      shareState: false,
      showInfo: false,
      inviteCode: '',
      count: 0
    }
  },
  watch: {
    shareState: {
      handler(newVal, oldVal) {
        if (!oldVal && newVal) {
          uni.showLoading({
            title: '海报下载中'
          })
        } else {
          uni.hideLoading()
        }
      }
    }
  },
  mounted() {
    this.shareToSession = debounce(() => {
      wx.downloadFile({
        url: this.iconUrl,
        success: (res) => {
          wx.showShareImageMenu({
            path: res.tempFilePath
          })
        },
        complete: () => {}
      })
    }, 200)
    this.downloadPost = debounce(() => { const that = this
      uni.showLoading({
        title: '图片下载中'
      })
      uni.getSetting({
        success: (res) => {
          if (res.authSetting['scope.writePhotosAlbum']) {
            that.imageToPhotosAlbumFun()
          } else {
            uni.authorize({
              scope: 'scope.writePhotosAlbum',
              success: () => {
                that.imageToPhotosAlbumFun()
              },
              fail: () => {
                uni.showModal({
                  title: '提示',
                  content: '请先在设置页面打开“保存相册”使用权限',
                  confirmText: '去设置',
                  cancelText: '取消',
                  success: (data) => {
                    if (data.confirm) {
                      uni.openSetting()
                    }
                    uni.hideLoading()
                  }
                })
              },
              complete: () => {
                uni.hideLoading()
              }
            })
          }
        }
      })
    }, 200)
  },
  methods: {
    pictureLoaded(e) {
      //为了准确控制海报下载loading的显示与隐藏
      //此处不知道为啥pictureLoaded 在ios真机上会被调用五次，所以有了次数判断的逻辑。模拟器和安卓上只会一次
      if (e.target.id === 'iconUrlImg') {
        this.count++
        if (this.osName === 'ios') {
          if (this.count > 4) {
            this.count = 0
            uni.hideLoading()
          }
        } else {
          this.count = 0
          uni.hideLoading()
        }
      }
    },
    showInviteInfo() {
      this.showInfo = true
    },
    imageToPhotosAlbumFun() {
      const that = this
      uni.downloadFile({
        url: that.iconUrl, //图片的地址
        success: function (res) {
          const tempFilePath = res.tempFilePath //通过res中的tempFilePath 得到需要下载的图片地址
          uni.saveImageToPhotosAlbum({
            filePath: tempFilePath,
            success: () => {
              uni.hideLoading()
              uni.showToast({
                title: '保存成功'
              })
            },
            fail: () => {
              uni.showToast({
                title: '保存失败',
                icon: 'error'
              })
            },
            complete: () => {
              uni.hideLoading()
            }
          })
        }
      })
    },
    // 显示分享
    handleShowShare() {
      this.shareState = true
    },
    // 隐藏分享
    handleHiddenShare() {
      uni.hideLoading()
      this.shareState = false
      this.$emit('close')
    },
    clickKnown() {
      this.showInfo = false
    }
  }
}
</script>

<style scoped lang="scss">
.image-container {
  width: 100%;
  height: 100%;
  .close-icon {
    width: 44rpx;
    height: 44rpx;
    margin-right: 10%;
    margin-top: 10%;
    float: right;
  }
  .picture {
    width: 80%;
    height: 70%;
    padding-left: 10%;
    padding-top: 2%;
  }
}

button::after {
  border: initial;
}
.share {
  width: 100%;
  height: 100%;
}

.share-box {
  width: 100%;
  height: auto;
  position: fixed;
  top: 0rpx;
  left: 0rpx;
  bottom: 0rpx;
  right: 0rpx;
  background-color: rgba(0, 0, 0, 0.34);
  transition: 0.3s;
  z-index: 99999;
}

button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border-style: none;
  height: 180rpx;
}

.share-show {
  transition: all 0.3s ease;
  transform: translateY(0%) !important;
}

.share-item {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 6%;
  width: 100%;
  transition: all 0.3s ease;
  transform: translateY(100%);
  z-index: 99999;

  .content {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: nowrap;

    .block {
      width: 33.33%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 180rpx;

      .cover-image {
        width: 80rpx;
        height: 80rpx;
      }

      .cover-view {
        margin-top: 16rpx;
        font-size: 28rpx;
        color: #ffffff;
      }
    }
  }
}

.inviteInfo {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0rpx;
  left: 0rpx;
  bottom: 0rpx;
  right: 0rpx;
  background-color: rgba(0, 0, 0, 0.34);
  transition: 0.3s;
  z-index: 100000;
  .inviteInfoContent {
    display: flex;
    flex-direction: column;
    margin: 50% 10% 0;
    background-color: #ffffff;
    border-radius: 28rpx;
    .infoText {
      line-height: 30px;
      margin: 0 10px;
      word-break: break-all;
      word-wrap: break-word;
      white-space: pre-line;
    }
  }
  .code-btn {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .btn-submit {
      width: 118px;
      height: 40px;
      background: #0e4a86;
      border-radius: 20px;
      color: #ffffff;
      font-size: 16px;
      text-align: center;
      line-height: 80rpx;
      margin: 40rpx 0;
    }
  }
}
</style>
