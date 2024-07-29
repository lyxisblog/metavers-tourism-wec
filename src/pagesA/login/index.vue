<template>
  <view class="login-container">
    <view class="login">
      <view class="header flex-center">
        <view>
          <img style="width: 225px; height: 100px;"
            src="https://metaverse-jwar-release.oss-cn-shanghai.aliyuncs.com/WeChat/PluginRepositories/WeChatData/logo_.png"
            alt="">
        </view>
        <!-- <view>
          <img
            style="width: 123px; height: 30px;"
            src="https://metaverse-jwar-release.oss-cn-shanghai.aliyuncs.com/WeChat/PluginRepositories/WeChatData/logo_.png"
            alt=""
          >
        </view> -->
      </view>
      <!-- 表单 -->
      <button v-if="!read" class="register-btn" @click="getRead">
        手机号快捷登录
      </button>
      <button v-else class="register-btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
        手机号快捷登录
      </button>
      <!-- <view class="register-btn" style="background-color: #EEEEEE;color: #454545;" @click="submitUser">
        其它手机号登录
      </view> -->
      <u-form ref="userForm" :model="userInfo" class="uesr-info-from" :border-bottom="false">
        <!-- 同意协议 -->
        <u-form-item prop="read" :border-bottom="false">
          <view class="read flex-middle">
            <view class="read-checkbox-view flex-middle" @click="checkboxChange">
              <view v-if="!read" class="read-checkbox" />
              <img v-else src="@a/images/read.svg" class="read-checkbox-img">
            </view>
            <view class="read-text flex-middle">
              <view @click="checkboxChange">
                我已阅读
              </view>
              <view class="a-label blueFont" @click="checkPrivacy('user')">
                《用户协议》
              </view>
              和
              <view class="a-label blueFont" @click="checkPrivacy('privacy')">
                《隐私政策》
              </view>
            </view>
          </view>
        </u-form-item>
      </u-form>
    </view>
  </view>
</template>

<script>
import { wechatBinding, wechatMiniLogin } from '@i/api'
import { agreType } from '@u/const'

export default {
  data() {
    return {
      load: false,
      read: false,
      PhoneCode: '',
      params: {}
    }
  },
  methods: {
    // 查看隐私协议
    checkPrivacy(type) {
      // uni.navigateTo({
      //   url: '/pages/webview/index?url=' + agreType[type]
      // })
    },
    // 勾选协议
    getRead() {
      if (!this.read) {
        uni.showToast({
          title: '请勾选隐私条款',
          icon: 'error',
          duration: 2000
        })
      }
    },
    // 获取手机号
    async getPhoneNumber(e) {
      if (e.detail.errMsg === 'getPhoneNumber:ok') {
        this.PhoneCode = e.detail.code
        if (this.read) {
          // http://manage.horngaze.com
          // uni.request({
          //   url: 'http://manage.horngaze.com',
          //   method: "POST",
          //   success: (res) => {
          //     if (res.statusCode === 200) {
          //       this.dataList = res.data[first].map(item => {
          //         return {
          //           ...item, baseUrl: res.data.baseUrl, imageUrl: res.data.imageUrl
          //         };
          //       });
          //       this.triggered = false;
          //     }

          //   }
          // })
          // const res = await wechatMiniLogin({
          //   code: this.PhoneCode,
          //   terminalType: 3
          // })
          // console.log(res, 'res加密')
          this.login(e.target)
        } else {
          uni.showToast({
            title: '请勾选隐私条款',
            icon: 'error',
            duration: 2000
          })
        }

      }


    },
    // 微信登录
    login(loginInfo) {
      const that = this;
      uni.login({
        provider: 'weixin',
        success(res) {
          if (res.code) {
            //发起网络请求


            uni.request({
              url: "https://manage.horngaze.com/api/weixin/getMobile",
              method: "POST",
              data: {
                code: res.code,
                encryptedData: loginInfo.encryptedData,
                iv: loginInfo.iv
              },
              success: (res) => {
                console.log("res",res);
                if (res.statusCode === 200) {
                  const { data: { mobile, openid, mid } } = res.data;
                  uni.setStorageSync('mobile', mobile);
                  uni.setStorageSync('openid', openid);
                  uni.navigateBack();
                }
               
              }
            })




            return;








            wechatBinding({
              code: res.code,
              phone: loginInfo.phone
            }).then((loginData) => {
              console.log(loginData, '登录数据')
              uni.setStorageSync('popupShow', '1')
              that.$store.dispatch('user/setToken', loginInfo.token)
              that.$store.dispatch('user/setUserInfo', loginData)
              that.$store.dispatch('user/setOpenId', loginData.wxOpenId)
              that.$sensors.login(loginData.uid)
              // eslint-disable-next-line no-undef
              const pages = getCurrentPages()
              if (pages.length >= 2) {
                let str = ''
                if (that.params) {
                  Object.keys(that.params).map((item, index) => {
                    if (index > 0) {
                      str += '&'
                    } else {
                      str += '?'
                    }
                    str += `${item}=${that.params[item]}`
                  })
                }
                const currentPage = pages[pages.length - 2]
                const url = `/${currentPage.route}${str}`
                uni.reLaunch({
                  url // 跳转到新页面
                })
              } else {
                uni.reLaunch({
                  url: '/pages/home/home' // 跳转到新页面
                })
              }
            })
          }
        }
      })
    },
    // 点击注册按钮
    submitUser() {
      const url = Object.keys(this.params).length > 0 ? '/pagesA/login/otherLogin?param=' + JSON.stringify(this.params) : '/pagesA/login/otherLogin'
      uni.navigateTo({
        url
      })
    },
    // 改变勾选状态
    checkboxChange() {
      this.read = !this.read
    }
  },
  onLoad(params) {
    console.log(params)
    if (params.param) {
      const data = JSON.parse(params.param)
      this.params = data
      console.log('data', data)
    }
    this.load = false
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  background-color: white;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  .login {
    .a-label {
      text-decoration: none;
    }

    .header {
      font-size: 32px;
      font-family: PingFang SC-Bold, PingFang SC;
      font-weight: bold;
      color: #0E4A86;
      flex-direction: column;
    }

    // 表单
    .uesr-info-from {
      .read {
        margin-left: 0px;
        margin-top: 10px;

        .read-checkbox-view {
          width: 50px;
          height: 40px;
          padding-left: 30px;

          .read-checkbox {
            border: 1px solid #E8E8E8;
            width: 16px;
            height: 16px;
            border-radius: 8px;
          }

          .read-checkbox-img {
            width: 16px;
            height: 16px;
            border-radius: 8px;
          }
        }

        .read-text {
          margin-left: 0px;
        }

        .blueFont {
          font-size: 14px;
          font-family: PingFang SC-Semibold, PingFang SC;
          font-weight: 600;
          color: #0E4A86;
        }
      }
    }

    .register-btn {
      width: 311px;
      height: 48px;
      background: #0E4A86;
      border-radius: 31px 31px 31px 31px;
      font-size: 16px;
      font-family: PingFangSC-Medium-, PingFangSC-Medium;
      font-weight: normal;
      color: #FFFFFF;
      text-align: center;
      line-height: 48px;
      margin-top: 30px;
    }
  }
}
</style>