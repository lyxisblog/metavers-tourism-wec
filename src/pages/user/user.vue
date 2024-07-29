<template>
  <view class="user">
    <!-- 个人信息视图 -->
    <view class="user-haer">
      <view class="user-title">
        角望数科
      </view>
      <view class="user-info">
        <view class="user-ava">
          <view class="headPic">
            <img class="user-ava-img" alt="头像" :src="isToken ? userInfo.headPic : moren">
          </view>
          <!-- <view
            v-if="isToken"
            class="user-ava-icon"
          >
            <img
              class="user-ava-img"
              :src="userInfo.sex === 0 ? women: women"
            >
          </view> -->
        </view>
        <view class="user-login">
          <view v-if="!isToken" class="user-login-btn" @click="goLogin">
            {{ butName }}
          </view>
          <view v-else class="user-name">
            {{ userInfo.nickName }}
          </view>
          <view class="user-login-text">
            {{ isToken ? userInfo.sign : '欢迎来到元宇宙世界' }}
          </view>
        </view>
      </view>
    </view>

    <!-- <view class="main">
      <view class="main-content">
        <view
          class="main-top"
        >
          <view
            class="cell flex-between"
            @click="menuClick('wallet')"
          >
            <view class="label">
              <img
                class="jiantou mr"
                src="@a/user/qianbao.png"
              >
              钱包
            </view>
            <view class="value">
              <img
                class="jiantou"
                src="@a/images/jiantou_right.svg"
              >
            </view>
          </view>

          <view
            class="cell flex-between"
            @click="menuClick('orderReact')"
          >
            <view class="label">
              <img
                class="jiantou mr"
                src="@a/user/jilu.png"
              >
              订单记录
            </view>
            <view class="value">
              <img
                class="jiantou"
                src="../../static/images/jiantou_right.svg"
              >
            </view>
          </view>
        </view>
        <view
          v-if="isToken"
          class="main-bottom"
        >
          <view
            class="cell flex-between"
          >
            <view class="label">
              <img
                class="jiantou mr"
                src="@a/user/yao.png"
              >
              邀请码
            </view>
            <view class="value flex-middle">
              <view style="margin-right:10px">
                {{ userInfo.inviteCode }}
              </view>
              <view
                class="cope"
                @click="copeInviteCode"
              >
                复制
              </view>
            </view>
          </view>
        </view>
        <view class="main-bottom">
          <view
            class="cell flex-between"
            @click="menuClick('feedback')"
          >
            <view class="label">
              <img
                class="jiantou mr"
                src="@a/user/fankui.png"
              >
              用户反馈
            </view>
            <view class="value">
              <img
                class="jiantou"
                src="../../static/images/jiantou_right.svg"
              >
            </view>
          </view>
          <view
            class="cell flex-between"
            @click="openChart"
          >
            <view class="label">
              <img
                class="jiantou mr"
                src="@a/user/kefu.png"
              >
              在线客服
            </view>
            <view class="value">
              <img
                class="jiantou"
                src="../../static/images/jiantou_right.svg"
              >
            </view>
          </view>
          <view
            class="cell flex-between"
            @click="playphone"
          >
            <view class="label">
              <img
                class="jiantou mr"
                src="@a/user/tel.png"
              >
              客服电话
            </view>
            <view class="value">
              <view style="color: #004B8B;">
                400-867-5999
              </view>
            </view>
          </view>
        </view>
        <view class="main-bottom">
          <view
            class="cell flex-between"
            @click="checkPrivacy('user')"
          >
            <view class="label">
              <img
                class="jiantou mr"
                src="@a/user/fuwu.png"
              >
              服务条款
            </view>
            <view class="value">
              <img
                class="jiantou"
                src="../../static/images/jiantou_right.svg"
              >
            </view>
          </view>
          <view
            class="cell flex-between"
            @click="checkPrivacy('privacy')"
          >
            <view class="label">
              <img
                class="jiantou mr"
                src="@a/user/yinsi.png"
              >
              隐私政策
            </view>
            <view class="value">
              <img
                class="jiantou"
                src="../../static/images/jiantou_right.svg"
              >
            </view>
          </view>
        </view>
        <view
          v-if="isToken"
          ref="uModal"
          class="open-app"
          @click="clicklogout"
        >
          <view class="btn">
            退出登录
          </view>
        </view>
      </view>
    </view> -->
    <u-modal v-model="show" :content="content" show-cancel-button @confirm="logout" />

    <view>
      <Tabbar current-page="pages/user/user" />
    </view>
  </view>
</template>

<script>
import { getUserInfoWithToken, logout } from '../../api/api'
import { mapGetters } from 'vuex'
const moren = require('@a/user/moren.svg')
const women = require('@a/user/woman.svg')
import { agreType, shareImg } from '@u/const'
export default {

  data() {
    return {
      userInfo: {},
      show: false,
      content: '确认退出？',
      agrementType: 'privacy',
      butName: "点击登录",
      moren,
      women
    }
  },
  onReady() {
  },
  computed: {
    ...mapGetters([
      'isToken'
    ])
  },
  onShow() {
    console.log("onShowonShow")

    if (uni.getStorageSync("mobile") && uni.getStorageSync("openid") && uni.getStorageSync("mobile") != null && uni.getStorageSync("openid") != null) {
      this.isToken = true;
      this.userInfo.nickName = "欢迎体验！";
      this.butName = "欢迎体验！";
    } else {

    }

    this.$sensors.track('YLXH_PageView', {
      page_name: '我的'
      // page_title: 'user'
    })
  },
  methods: {
    // 菜单跳转
    menuClick(type) {
      if (this.isToken) {
        const urlList = {
          'wallet': '/pagesPerson/wallet/index',
          'feedback': '/pagesPerson/feedback/index',
          'orderReact': '/pagesPerson/orderReact/index'
        }
        uni.navigateTo({
          url: urlList[type]
        })
      } else {
        this.goLogin()
      }
    },
    // 去登录
    goLogin() {
      if (uni.getStorageSync("mobile") && uni.getStorageSync("openid") && uni.getStorageSync("mobile") != null && uni.getStorageSync("openid") != null) {
        this.isToken = true;
        this.userInfo.nickName = "欢迎体验！";
        this.butName = "欢迎体验！";
      } else {
        uni.navigateTo({
          url: '/pagesA/login/index'
        })
      }
    },
    // 拨打客服电话
    playphone() {
      uni.makePhoneCall({
        phoneNumber: '400-867-5999'
      })

    },
    // 查看隐私协议
    checkPrivacy(type) {
      uni.navigateTo({
        url: '/pages/webview/index?url=' + agreType[type]
      })
    },
    clicklogout() {
      this.show = true
    },
    // 退出登录
    logout() {
      logout().then(() => {
        this.$store.dispatch('user/clearToken')
        this.$store.dispatch('user/clearUserInfo')
        this.$store.dispatch('user/clearOpenId')
        uni.reLaunch({
          url: '/pages/home/home' // 跳转到新页面
        })
        this.$sensors.logout()
      })
    },
    // 打开客服
    openChart() {
      wx.openCustomerServiceChat({
        extInfo: { url: 'https://work.weixin.qq.com/kfid/kfc193c58381b0c2505' },
        corpId: 'ww19c4575a2ccd19f9',
        success(res) {
          console.log(res)
        },
        fail(err) {
          uni.showToast({
            title: err.errMsg,
            duration: 2000,
            icon: 'none'
          })
        }
      })
    },
    // 返回主页
    gobackHome() {
      uni.reLaunch({
        url: '/pages/home/home' // 跳转到新页面
      })
    },
    // 复制邀请码
    copeInviteCode() {
      const that = this
      uni.setClipboardData({
        data: that.userInfo.inviteCode,
        success() {
          uni.showToast({
            title: '复制成功',
            duration: 2000
          })
        }
      })
    },
    // 获取用户信息
    getUserInfoWithToken() {
      getUserInfoWithToken().then(res => {
        this.userInfo = res
      })
    }
  },
  onLoad() {
    if (this.isToken) {
      this.getUserInfoWithToken()
    }
  },
  onShareTimeline() {
    return {
      title: '游历星河  AR奇幻游',
      imageUrl: shareImg,
      path: '/pages/user/user'
    }
  },
  onShareAppMessage() {
    return {
      title: '游历星河  AR奇幻游',
      imageUrl: shareImg,
      path: '/pages/user/user'
    }
  }
}
</script>

<style scoped lang="scss">
.line {
  width: 1px;
  height: 30px;
  background: linear-gradient(180deg, #E2E2E2 0%, #C9C9C9 49%, #E2E2E2 100%);
  border-radius: 10px 10px 10px 10px;
  opacity: 1;
}

.headPic {
  width: 72px;
  height: 72px;
  border-radius: 26px;
}

.user-code {
  padding: 0 17px;

  .code {
    font-size: 18px;
    font-weight: normal;
    color: #FFFFFF;
    line-height: 18px;
    letter-spacing: 3px;
    margin-left: 8px;
  }
}

.user {
  // padding-bottom: 50px;
  overflow: hidden;
  height: 100vh;

  .user-haer {
    // height: 253px;
    height: 100vh;
    width: 100vw;
    background: url('https://metaverse-jwar-release.oss-cn-shanghai.aliyuncs.com/WeChat/PluginRepositories/WeChatData/userbgc.jpg') no-repeat;
    background-position: center;
    background-size: cover;
    padding-top: 44px;

    .user-title {
      font-size: 17px;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
      height: 24px;
      margin-top: 10px;
      padding-left: 16px;
    }

    .user-info {
      padding: 20px 17px;
      display: flex;

      .user-ava {
        width: 72px;
        height: 72px;
        border: 2px solid #0E4A86;
        border-radius: 50%;
        position: relative;
        box-sizing: content-box;

        .user-ava-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }

        .user-ava-icon {
          width: 20px;
          height: 20px;
          position: absolute;
          top: 2rpx;
          right: -2rpx;
        }

      }

      .user-login {
        flex: 1;
        margin-left: 17px;
        margin-top: 9px;

        .user-login-btn {
          width: 80px;
          height: 28px;
          background: #FFFFFF;
          box-shadow: 0px 3px 7px 1px rgba(255, 255, 255, 0.54);
          border-radius: 24px 24px 24px 24px;
          opacity: 1;
          text-align: center;
          line-height: 28px;
        }

        .user-name {
          font-size: 18px;
          font-family: PingFangSC-Medium-, PingFangSC-Medium;
          font-weight: normal;
          color: #FFFFFF;
        }

        .user-login-text {
          margin-top: 6px;
          font-size: 14px;
          font-family: PingFangSC-Regular-, PingFangSC-Regular;
          font-weight: normal;
          color: #FFFFFF;
        }
      }
    }
  }

  // 信息视图
  .main {
    background-color: #F7F7F7;
    padding: 0 16px;

    .main-content {
      position: relative;
      top: -60px;
    }

    .main-top {
      background-color: #ffff;
      padding: 0 16px;
      border-radius: 10px;
    }

    .jiantou {
      width: 44rpx;
      height: 44rpx;
    }

    .jiantou-a {
      width: 30px;
      height: 30px;
    }

    .main-bottom {
      margin-top: 10px;
      background-color: #ffff;
      padding: 2px 16px;
      border-radius: 10px;

    }

    .cell {
      margin-right: 24rpx;
      height: 55px;

      .label {
        font-size: 28rpx;
        font-family: PingFangSC-Regular-, PingFangSC-Regular;
        font-weight: normal;
        color: #333333;
        display: flex;
        align-items: center;
      }

      .value {
        font-size: 28rpx;
        font-family: PingFangSC-Regular-, PingFangSC-Regular;
        font-weight: normal;
        color: #666666;

        .cope {
          width: 72rpx;
          height: 40rpx;
          background: rgba(0, 75, 139, 0.21);
          border-radius: 10rpx 10rpx 10rpx 10rpx;
          font-size: 12px;
          font-family: PingFangSC-Regular-, PingFangSC-Regular;
          font-weight: normal;
          color: #004B8B;
          line-height: 40rpx;
          text-align: center;
        }
      }
    }
  }

  .open-app {
    margin-top: 30px;

    .btn {
      width: 100%;
      background-color: #fff;
      text-align: center;
      font-weight: normal;
      color: #004B8B;
      height: 48px;
      border-radius: 10px;
      line-height: 48px;

    }
  }
}
</style>