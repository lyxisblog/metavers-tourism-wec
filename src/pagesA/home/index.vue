<template>
  <view
    class="home"
    :style="'background-image: url('+ scenicInfo.footPicH5 +');'"
  >
    <!-- 头部 -->
    <view class="header">
      <img
        src="../../static/images/goback_baise.svg"
        class="header-back"
        @click="goBack"
      >
    </view>
    <!-- 点赞 -->
    <view class="like">
      <img
        v-if="like && token"
        src="../../static/images/liked.svg"
        class="like-icon"
        @click="scenicLikeSave"
      >
      <img
        v-if="!like && token"
        src="../../static/images/not_liked.svg"
        class="like-icon"
        @click="scenicLikeSave"
      >
    </view>
    <!-- 主要视图 -->
    <view
      class="main"
    >
      <view class="main-body">
        <!-- 文档介绍 -->
        <view class="body-doc">
          <view class="title">
            {{ scenicInfo.scenicName }}
          </view>
          <view class="address flex-middle">
            <img
              src="../../static/images/positioning.svg"
              class="positioning-icon"
            >
            <view class="text">
              {{ scenicInfo.address }}
            </view>
          </view>
          <view class="data flex-between">
            <view class="cell flex-middle">
              <img
                src="../../static/images/person-time.svg"
                class="icon"
              >
              <view class="text">
                {{ scenicInfo.trySizeCount }}
              </view>
            </view>
            <view class="cell flex-middle">
              <img
                src="../../static/images/shopping.svg"
                class="icon"
              >
              <view class="text">
                {{ scenicInfo.payCount }}
              </view>
            </view>
            <view class="cell flex-middle">
              <img
                src="../../static/images/like.svg"
                class="icon"
              >
              <view class="text">
                {{ scenicInfo.scenicLikeCount }}
              </view>
            </view>
          </view>
          <view class="brief">
            {{ contentDisplay }}
            <span
              v-if="!isExpanded && scenicInfo.scenicIntroduce.length > maxLength"
              class="brief-btn"
              @tap="toggleExpand"
            >展开</span>
            <span
              v-if="isExpanded"
              class="brief-btn"
              @tap="toggleExpand"
            >收起</span>
          </view>
        </view>
        <!-- 评分 -->
        <view class="body-score flex-v">
          <view class="value">
            {{ scenicInfo.scenicNum }}
          </view>
          <view class="label">
            AR评分
          </view>
        </view>
      </view>
    </view>
    <!-- 弹窗 -->
    <u-popup
      v-model="popupShow"
      mode="center"
      border-radius="14"
      closeable
    >
      <view class="popup-body">
        <view class="title">
          提示
        </view>
        <view class="text">
          免费体验已结束，购买后可解锁全部精彩。
        </view>
        <view
          class="pay-btn"
          @click="goPay"
        >
          立即支付
        </view>
        <view class="act-text">
          已有激活码？<span
            class="act-btn"
            @click="goAct"
          >点击激活</span>
        </view>
      </view>
    </u-popup>
    <u-toast ref="uToast" />
  </view>
</template>

<script>
import { scenicInfoNonAuth, getUserInfoWithToken, queryFreeTime, arDetail } from '../../api/api'
import { scenicLikeGetLike, scenicLikeSave } from '../../api/home'

export default {
  data () {
    return {
      userInfo:{},
      id: 10063,
      scenicInfo:{
        scenicName:'',
        address:'',
        interactionCount:'',
        payCount:'',
        scenicLikeCount:'',
        scenicIntroduce:'',
        scenicNum:'9.8'
      },
      like:false,
      isExpanded: false,
      maxLength: 128,
      token:'',
      deviceCode:null, //设备码
      goToARState:false,
      popupShow:false, //弹窗
      freeTime:0 //免费时长
    }
  },
  computed: {
    // 字数超过处理
    contentDisplay() {
      if (this.isExpanded || this.scenicInfo.scenicIntroduce.length <= this.maxLength) {
        return this.scenicInfo.scenicIntroduce
      } else {
        return this.scenicInfo.scenicIntroduce.substring(0, this.maxLength) + '......'
      }
    }
  },
  methods: {
    // 返回上一页
    goBack () {
      wx.navigateBack({
        delta: 1
      })
    },
    // 处理url
    parseUrl(options){
      const that = this
      this.id = options.scenicId
      // 保存token
      uni.setStorage({
        key: 'scenicId',
        data: options.scenicId,
        success: function () {
          that.getUserInfo()
        }
      })
    },
    // 获取用户是否点赞
    scenicLikeGetLike(){
      const params = {
        scenicId:this.id
      }
      scenicLikeGetLike(params).then(res => {
        this.like =res
      })
    },
    // 点赞/取消点赞
    scenicLikeSave(){
      const params = {
        scenicId:this.id
      }
      scenicLikeSave(params).then(() => {
        this.scenicLikeGetLike()
      })
    },
    // 展开收起
    toggleExpand() {
      this.isExpanded = !this.isExpanded
    },
    // 判断是否登录
    getUserInfo(){
      this.token = uni.getStorageSync('token')
      if (this.token) {
        this.scenicLikeGetLike()
        this.getUserInfoWithToken()
      }else {
        this.scenicInfoNonAuth()
      }
    },
    // 获取用户信息
    getUserInfoWithToken(){
      getUserInfoWithToken().then(res => {
        this.userInfo = res
        this.scenicInfoNonAuth()
      })
    },
    // 景区详情无权限
    scenicInfoNonAuth(){
      const params = {
        id:this.id
      }
      scenicInfoNonAuth(params).then(res => {
        this.scenicInfo = res
        this.offShelfToast()
      })
    },

    // 景区下架弹窗提示
    offShelfToast(){
      if (!this.scenicInfo.status) {
        uni.showToast({
          title: '该景区已下架',
          duration: 2000,
          icon: 'error'
        })
        this.goToARState = false
      }else {
        this.goToARState = true
      }
    },
    // 获取免费时长
    queryFreeTimeFun() {
      queryFreeTime({
        scenicId: this.id,
        deviceCode: this.deviceCode
      }).then((res) => {
        this.freeTime = res.freeTime
        console.log(this.freeTime, '首页获取免费时长')
        // 有剩余时长则跳转
        if(this.freeTime){
          this.goToAR()
        }else{
          this.popupShow = true
        }
      })
    },
    // 是否跳转到AR页面
    goToARStateChange(){
      if(!this.goToARState) {
        uni.showToast({
          title: '该景区已下架',
          duration: 2000,
          icon: 'error'
        })
        return
      }
      this.deviceCode = uni.getStorageSync('browserId')
      if (!this.deviceCode) {
        this.goToAR()
      }else if(this.token){
        arDetail({ deviceCode: this.deviceCode, scenicId: this.id, terminalType: 2 }).then(res => {
          const { activeState, payState } = res
          // 购买或激活后可跳转
          if(activeState || payState){
            this.goToAR()
          }else{
            this.queryFreeTimeFun()
          }
        })
      }else{
        this.queryFreeTimeFun()
      }
    },
    // 去激活
    goAct(){
      if (this.token) {
        uni.navigateTo({
          url: '/pages/activation/index'
        })
      } else {
        this.goToLogin()
      }
    },
    // 去支付
    goPay(){
      if (this.token) {
        uni.navigateTo({
          url: '/ar/pay'
        })
      } else {
        this.goToLogin()
      }
    },
    // 去AR
    goToAR(){
      uni.navigateTo({
        url: '/ar/index'
      })
    },
    // 去登录
    goToLogin(){
      if (this.token) {
        uni.navigateTo({
          url: '/pages/user/index'
        })
      }else{
        uni.navigateTo({
          url: '/pages/login/index'
        })
      }
    }
  },
  onLoad (options) {
    this.parseUrl(options)
  },
  onShow () {

  }
}
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  width: 100vw;
  background-color: white;
  background-size: cover;
  .a-label {
    text-decoration:none;
  }
  // 头部
  .header {
    height: 120rpx;
    padding-top: 100rpx;
    margin-left: 40rpx;
    .header-back {
      width: 32rpx;
      height: 32rpx;
    }
  }
  // 点赞
  .like{
    position: relative;
    margin-top: 100rpx;
    height: 60rpx;
    .like-icon {
      position: absolute;
      right: 32rpx;
      width: 60rpx;
      height: 60rpx;
    }
  }
  // 主要视图
  .main {
    width: 100vw;
    padding-bottom: 10rpx;
    background: no-repeat;
    // background-size: 100% 100%;
    background-position: center center;
    background-size: cover;
    padding-top: 1px;
    .main-body {
      display: flex;
      margin: 192rpx 44rpx auto 34rpx;
      .body-doc {
        width: 512rpx;
        height: 780rpx;
        background: rgba(0, 0, 0, 0.26);
        border-radius: 0px 160rpx 0px 160rpx;
        font-family: PingFang SC-Heavy, PingFang SC;
        padding-left: 32rpx;
        .title {
          font-size: 40rpx;
          font-weight: 800;
          color: #FFFFFF;
          width: 422rpx;
          margin-top: 58rpx;
        }
        .address {
          margin-top: 14rpx;
          .positioning-icon {
            width: 32rpx;
            height: 32rpx;
          }
          .text{
            font-size: 24rpx;
            font-weight: 500;
            color: #FFFFFF;
            margin-left: 8rpx;
          }
        }
        .data {
          margin-top: 22rpx;
          width: 436rpx;
          .cell {
            .icon {
              width: 40rpx;
              height: 40rpx;
            }
            .text {
              font-size: 22rpx;
              font-family: Arial-BoldItalicMT-, Arial-BoldItalicMT;
              font-weight: normal;
              color: #FFFFFF;
            }
          }
        }
        .brief {
          width: 454rpx;
          max-height: 408rpx;
          font-size: 28rpx;
          font-weight: 400;
          color: #FFFFFF;
          margin-top: 20rpx;
          overflow-y: auto;
          .brief-btn {
            color: rgba($color: #FFFFFF, $alpha: 0.41);
          }
        }
      }
      .body-score {
        width: 120rpx;
        height: 120rpx;
        background: rgba(255, 255, 255, 0.51);
        border-radius: 34rpx 34rpx 34rpx 34rpx;
        margin-left: 21px;
        .value {
          font-size: 24px;
          font-family: DIN-Bold, DIN;
          font-weight: bold;
          color: #FF5B00;
          margin-top: 6px;
        }
        .label {
          font-size: 12px;
          font-family: PingFang SC-Medium, PingFang SC;
          font-weight: 500;
          color: #333333;
        }
      }
    }
    .btn-view {
      width: 100%;
    }
    // 进入按钮
    .enter-btn {
      width: 666rpx;
      height: 96rpx;
      margin-top: 130rpx;
      background: #004B8B;
      border-radius: 48rpx 48rpx 48rpx 48rpx;
      .btn-label {
        height: 44rpx;
        font-size: 32rpx;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
      }
      .btn-icon {
        width: 40rpx;
        height: 40rpx;
        margin-left: 16rpx;
        position: relative;
        top: 1px;
      }
    }
    .enter-btn-dis {
      background: #9c999965;
    }
  }
  // 提示弹窗
  .popup-body {
    text-align: center;
    padding: 50rpx 64rpx 62rpx;
    .title {
      font-size: 40rpx;
      font-family: PingFang SC-Heavy, PingFang SC;
      font-weight: 800;
      color: #333333;
    }
    .text {
      font-size: 32rpx;
      font-family: PingFang SC-Bold, PingFang SC;
      font-weight: bold;
      color: #333333;
      width: 472rpx;
      margin-top: 32rpx;
  }
    .pay-btn {
      width: 472rpx;
      height: 96rpx;
      background: #0E4A86;
      border-radius: 48rpx 48rpx 48rpx 48rpx;
      font-size: 32rpx;
      font-family: PingFang SC-Bold, PingFang SC;
      font-weight: bold;
      color: #FFFFFF;
      line-height: 96rpx;
      margin-top: 42rpx;
    }
    .act-text {
      font-size: 28rpx;
      font-family: PingFang SC-Bold, PingFang SC;
      font-weight: bold;
      color: #666666;
      margin-top: 58rpx;
      .act-btn {
        color: #016CC8;
      }
    }
  }
}
</style>