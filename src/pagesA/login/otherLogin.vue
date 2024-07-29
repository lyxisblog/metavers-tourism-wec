<template>
  <view class="login-container">
    <view class="login">
      <view class="header flex-center">
        <view>
          <img
            style="width: 100px; height: 100px;"
            src="@a/user/login-logo.png"
            alt=""
          >
        </view>
        <view>
          <img
            style="width: 123px; height: 30px;"
            src="@a/user/login-text.png"
            alt=""
          >
        </view>
      </view>
      <!-- 表单 -->
      <u-form
        ref="userForm"
        :model="userInfo"
        class="uesr-info-from"
        :border-bottom="false"
      >
        <!-- 手机号 -->
        <u-form-item prop="phone">
          <view class="phone flex-middle">
            <u-input
              v-model="userInfo.phone"
              class="phone-input"
              type="number"
              maxlength="11"
              placeholder="请输入手机号"
            />
          </view>
        </u-form-item>
        <!-- 验证码 -->
        <u-form-item prop="captcha">
          <view class="code flex-between">
            <view class="code-input">
              <u-input
                v-model="userInfo.captcha"
                type="number"
                maxlength="6"
                placeholder="请输入验证码"
              />
            </view>
            <view
              class="code-btn"
              @click="sendCode"
            >
              {{ countdown > 0 ? `${countdown}秒后再试` : '获取验证码' }}
            </view>
          </view>
        </u-form-item>
        <!-- 同意协议 -->
        <u-form-item
          prop="read"
          :border-bottom="false"
        >
          <view class="read flex-middle">
            <view
              class="read-checkbox-view flex-middle"
              @click="checkboxChange"
            >
              <view
                v-if="!userInfo.read"
                class="read-checkbox"
              />
              <img
                v-else
                src="@a/images/read.svg"
                class="read-checkbox-img"
              >
            </view>
            <view class="read-text flex-middle">
              <view @click="checkboxChange">
                我已阅读
              </view>
              <view
                class="a-label blueFont"
                @click="checkPrivacy('user')"
              >
                《用户协议》
              </view>
              和
              <view
                class="a-label blueFont"
                @click="checkPrivacy('privacy')"
              >
                《隐私政策》
              </view>
            </view>
          </view>
        </u-form-item>
      </u-form>
      <view
        class="register-btn"
        @click="submitUser"
      >
        登录
      </view>
      <view>
        <u-toast ref="uToast" />
      </view>
    </view>
  </view>
</template>

<script>
import { loginPhoneForH5, sendCodeForH5, wechatBinding } from '@i/api'
import { agreType } from '@u/const'

export default {
  data () {
    return {
      load: false,
      userInfo:{
        phone:'',
        captcha:'',
        read:false
      },
      countdown:0,
      timer: null,
      agrementType: 'user',
      params: {},
      rules: {
        phone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: [ 'change', 'blur' ]
          },
          {
            // 自定义验证函数，见上说明
            validator: (rule, value) => {
              return this.$u.test.mobile(value)
            },
            message: '手机号码不正确',
            // 触发器可以同时用blur和change
            trigger: [ 'blur' ]
          }
        ],
        captcha:[
          {
            required: true,
            message: '请输入验证码',
            trigger: [ 'change', 'blur' ]
          }
        ],
        read:[
          {
            validator: (rule, value) => {
              return value
            },
            message: '请勾选',
            trigger: [ 'change', 'blur' ]
          }
        ]
      }
    }
  },
  onReady() {
    this.$refs.userForm.setRules(this.rules)
  },
  methods: {

    // 查看隐私协议
    checkPrivacy(type) {
      uni.navigateTo({
        url: '/pages/webview/index?url=' + agreType[type]
      })
    },
    // 微信登录
    login(loginData) {
      const that = this
      uni.login({
        provider: 'weixin',
        success(res) {
          if (res.code) {
            //发起网络请求
            wechatBinding({
              code: res.code,
              phone: that.userInfo.phone
            }).then((res) => {
              uni.setStorageSync('popupShow', '1')
              that.$store.dispatch('user/setToken', loginData.token )
              that.$store.dispatch('user/setUserInfo', res )
              that.$store.dispatch('user/setOpenId', res.wxOpenId )
              that.$sensors.login(res.uid)
              // eslint-disable-next-line no-undef
              const pages = getCurrentPages()
              if(pages.length >= 3) {
                let str = ''
                if(that.params) {
                  Object.keys(that.params).map((item, index) => {
                    if(index>0) {
                      str += '&'
                    } else {
                      str += '?'
                    }
                    str += `${item}=${that.params[item]}`
                  })
                }
                const currentPage = pages[pages.length - 3]
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
    submitUser(){
      this.$refs.userForm.validate(valid => {
        if (valid) {
          this.loginPhone()
        }
      })
    },
    // 登录注册
    loginPhone(){
      const params = {
        phone: this.userInfo.phone,
        captcha: this.userInfo.captcha,
        terminalType: 3
      }
      loginPhoneForH5(params).then(res => {
        // 登录后绑定小程序
        this.login(res)
      })
    },
    // 改变勾选状态
    checkboxChange(){
      this.userInfo.read = !this.userInfo.read
    },
    //发送验证码短信
    sendCode(){
      if( this.$u.test.mobile(this.userInfo.phone)) {
        const params = {
          mobile:this.userInfo.phone,
          templateType:'smsRegistType'
        }
        if(this.countdown === 0) {
          sendCodeForH5(params).then(() => {
            this.startTime()
          })
        } else {
          uni.showToast({
            title: '稍后再试',
            icon: 'warning',
            duration: 2000
          })
        }
      }

    },
    // 开始计时
    startTime(){
      this.countdown = 59
      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--
        } else {
          clearInterval(this.timer)
          this.timer = null
        }
      }, 1000)
    }
  },
  onLoad (params) {
    if(params.param){
      const data = JSON.parse(params.param)
      this.params = data
    }
    this.load = false
  }
}
</script>

<style lang="scss" scoped>
.login-container{
  width: 100vw;
  height: 100vh;
  background-color: white;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  .login {
    .a-label {
      text-decoration:none;
    }
    .header {
      flex-direction: column;
      font-size: 32px;
      font-weight: bold;
      color: #0E4A86;
    }
    // 表单
    .uesr-info-from {
      .phone {
        margin-top: 38px;
        .phone-label {
          font-size: 16px;
          font-weight: bold;
          color: #333333;
        }
        .phone-input {
          font-size: 14px;
        }
      }
      .code {
        width: 100%;
        .code-input {
          width: 50%;
        }
        .code-btn {
          font-size: 14px;
          font-weight: 400;
          color: #004B8B;
          cursor: pointer;
        }
      }
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
          margin-left: 6px;
        }
        .blueFont {
          font-size: 14px;
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
      font-weight: normal;
      color: #FFFFFF;
      text-align: center;
      line-height: 48px;
      margin-top: 30px;
    }
  }
}

</style>