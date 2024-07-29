<template>
  <view>
    <web-view ref="webview" :src="webviewSrc" @load="loadCompleteHandler" @error="loadErrorHandler" />
    <cover-view v-if="detailData.activityScenicFlag === 1 || detailData.couponFlag" class="activityContainer">
      <cover-view v-if="detailData.couponFlag" class="coupon-icon" @click="goCouponList">
        <cover-image class="coupon-img" src="/static/images/coupon_icon.png" alt="" />
      </cover-view>
      <cover-view v-if="detailData.activityScenicFlag === 1" class="spring-icon" @click="goSpringFestival">
        <cover-image class="coupon-img" src="/static/ARImages/spring_icon.png" alt="" />
        <cover-image class="content" src="/static/ARImages/spring_content.png" :animation="animationFestival" />
      </cover-view>
    </cover-view>
    <cover-view v-if="freeTrying" class="freeTryToast">
      <cover-view style="
          font-size: 24rpx;
          color: #ffffff;
          line-height: 2;
          margin: 8rpx 20rpx;
          width: 284rpx;
          text-align: center;
        ">
        免费体验倒计时 {{ time }}
      </cover-view>
    </cover-view>
    <!-- <cover-view
      class="iconContainer"
      :style="fold ? 'height:90rpx' : 'height:auto'"
    >
      <cover-image
        style="width: 80rpx; height: 80rpx; margin-left: 10rpx"
        :src="
          fold ? '/static/ARImages/fold.png' : '/static/ARImages/foldAct.png'
        "
        :animation="animationRotate"
        @click="foldMenu"
      /> -->
    <!-- <cover-view
        class="icon"
        :animation="animationFold"
      >
        <cover-image
          src="/static/ARImages/share.png"
          class="img"
          style="padding-top: 30rpx"
          @click="inviteFresher"
        />
        <cover-image
          src="/static/ARImages/detail.png"
          class="img"
          style="padding-top: 30rpx"
          @click="goDetail"
        />
        <cover-image
          v-if="!detailData.free"
          :src="
            detailData.payState === 1 || detailData.activeState === 1
              ? unlock
              : lock
          "
          class="img"
          @click="goPay"
        />
        <cover-image
          v-if="isShowYao"
          :src="yao"
          class="img"
          @click="goInviteCode"
        />
        <cover-image
          src="/static/ARImages/kefu.png"
          class="img"
          @click="makePhoneCall"
        />
        <cover-image
          src="/static/ARImages/help.png"
          class="img"
          @click="goFresherGuide"
        />
        <cover-image
          src="/static/ARImages/appLink.png"
          class="img"
          @click="goAppDownload"
        />
      </cover-view>
    </cover-view> -->
    <!-- <share
      ref="refShare"
      :icon-url="iconUrl"
      :inviter-amount="detailData.inviterAmount"
      :os-name="osName"
      @close="showShare = false"
    /> -->
    <freeTryHint ref="freeTryHint" @goPay="goPay" />
    <loadingView ref="loadingView" />
    <fresherGuide v-if="autoShowFresherGuide || showFresherGuide" @skipGuide="skipGuide" />
    <springFestival ref="springFestival" @gotoDetail="goSpringFestival" />
  </view>
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
import {
  getSharePostPage,
  arDetail,
  dealDeviceArUseInfo,
  getShareScenic,
  dealOrderStatus,
  saveDefaultFoot,
  getFresherGuide,
  saveFresherGuide
} from '@i/guideMap.js'
// import share from '../share/index.vue'
import freeTryHint from '../freeTryHint/index.vue'
import loadingView from '../loadingView/index.vue'
import fresherGuide from '../fresherGuide/index.vue'
import springFestival from '../springFestival/index.vue'
const guideline = 'guideline'
export default {
  components: {
    // share: share,
    freeTryHint: freeTryHint,
    loadingView: loadingView,
    fresherGuide: fresherGuide,
    springFestival: springFestival
  },
  data() {
    return {
      lock: '/static/ARImages/lock.png',
      unlock: '/static/ARImages/unlock.png',
      yao: '/static/ARImages/yao.png',
      inviteCode: '',
      freeTrying: false,
      detailData: {},
      scenicId: '',
      mapId: '',
      intervalId: null,
      timeInterval: null,
      time: '',
      token: null,
      iconUrl: '',
      openId: '',
      scenicPic: '',
      needReload: true,
      shareData: null,
      webviewSrc: '',
      longitude: '',
      latitude: '',
      onLoadFirst: true, //标记onLoadFirst
      once: true, //在获取详情之后，只判断一次是否记游记和处理景点订单信息
      isShowYao: false,
      isShowGou: true,
      animationRotate: null,
      animationFold: null,
      animationFestival: null,
      fold: false,
      showFresherGuide: false,
      autoShowFresherGuide: false, //用户第一次到该景区就自动展示引导图，然后再加载webview
      unityShowFresherGuide: false, //unity 里面是否展示新手引导图
      showSpring: false,
      currentDegree: 0,
      osName: '',
      rightMenuRestart: null,
      showShare: false,
      platform_version: '',
      distinct_id: '',
      sensorsPageView: {
        page_name: '资源包加载页', //页面名称
        refer_page_name: '', //来源页面
        scenic_id: '', //页面景区id
        user_lng: '', //用户定位的经度
        user_lat: '', //用户定位的纬度
        is_inside_scenic: ''//用户定位是否在景区内
      },
      thatWebviewSrc: null,
      isLoginSetInterval: null,
      firstIndex: 0,
    }
  },
  onShareAppMessage() {
    this.needReload = false
    return {
      title: this.shareData.scenicName,
      path: `/pagesAR/guide/index?scenicId=${this.scenicId}`,
      imageUrl: this.shareData.coverUrl
    }
  },
  watch: {
    showFresherGuide: {
      handler(newVal, oldVal) {
        if (oldVal && !newVal) {
          this.rightMenuRestart()
        }
      }
    },
    showShare: {
      handler(newVal, oldVal) {
        if (oldVal && !newVal) {
          this.rightMenuRestart()
        }
      }
    }
  },
  methods: {
    // 跳转到优惠券中心
    goCouponList() {
      uni.navigateTo({
        url: `/pagesAR/coupon/couponList?scenicId=${this.scenicId}`
      })
    },
    vlidateIconsAndWeviewState() {
      //hasWriteInviteCode：是否需要填写邀请码 1是2否
      if (this.detailData.free) {
        this.isShowYao = false
        this.isShowGou = false
      } else {
        this.isShowYao = false
        this.isShowGou =
          this.detailData.payState === 1 || this.detailData.activeState === 1
      }
    },
    getWebviewSrc() {
      let title = this.detailData.scenicName
      title = title
        ? encodeURI(title.length > 20 ? title.substr(0, 20) : title)
        : ''
      const mapIp =
        String(this.detailData.feature) === '0'
          ? this.detailData.mapIds.join(',')
          : this.mapId
      //[token]点云token;[mapId]点云的mapId，[isInScenic]是否在景区，[t]h5页面的标题，[f]识别页面是否展示新手引导图
      //[st]不记得了，[uToken]用户token,[id]景区ID,[aflag]是否展示优惠券
      //[is_login]是否登录，[platform_name]平台名字，[platform_version]平台版本号，[distinct_id]不知道。但是本行注释的这几个都是用在打点上的
      this.webviewSrc = this.autoShowFresherGuide
        ? ''
        : `${process.env.VUE_APP_AR_URL}/${this.detailData.contentNo}?token=${this.detailData.scenicToken
        }&mapId=${mapIp}&isInScenic=${this.detailData.isLoadDefaut === 1 ? 'true' : 'false'
        }&t=${title}&f=${this.unityShowFresherGuide ? '1' : '0'}&st=${this.detailData.feature
        }&uToken=${this.token}&id=${this.scenicId}&aflag=${this.detailData.couponFlag
        }&is_login=true&platform_name=${encodeURI(
          '游历星河小程序'
        )}&platform_version=${this.platform_version}&distinct_id=${this.distinct_id
        }`
      this.sensorsPageView.user_lng = this.longitude ? parseFloat(this.longitude).toFixed(6) : '0'
      this.sensorsPageView.user_lat = this.latitude ? parseFloat(this.latitude).toFixed(6) : '0'
      this.sensorsPageView.scenic_id = this.scenicId
      this.sensorsPageView.is_inside_scenic = this.detailData.isLoadDefaut === 1
      this.$sensors.track('YLXH_PageView', this.sensorsPageView)
      console.log('web-view URL:', this.webviewSrc)
    },
    //h5页面加载完了
    loadCompleteHandler(e) {
      console.log('loadCompleteHandler', e)
    },
    loadErrorHandler() {
      uni.showToast({
        title: `地图加载失败:${this.scenicId}`,
        icon: 'error',
        duration: 3000
      })
      this.goBack()
    },
    goBack() {
      setTimeout(() => {
        // eslint-disable-next-line no-undef
        const pages = getCurrentPages()
        if (pages.length >= 2) {
          uni.navigateBack({
            delta: 1
          })
        } else {
          uni.reLaunch({
            url: '/pages/home/home' // 跳转到新页面
          })
        }
      }, 3000)
    },
    //展示新春活动提示
    showSpringIconContent() {
      setTimeout(() => {
        const animationFestival = wx.createAnimation({
          duration: 1500
        })
        animationFestival
          .translateX('80rpx')
          .opacity(1)
          .step({ duration: 1500 })
          .translateX(0)
          .opacity(0)
          .step({ delay: 2000, duration: 1000 })
        this.animationFestival = animationFestival.export()
      }, 20000)
    },
    foldMenu() {
      this.fold = !this.fold
      if (!this.fold) {
        this.rightMenuRestart()
      }
      const animationRotate = wx.createAnimation({
        duration: 500
      })
      let degree = 0
      if (this.currentDegree === 0 || this.currentDegree === 180) {
        degree = this.fold ? -180 : 0
      } else {
        degree = this.fold ? 180 : 0
      }
      this.currentDegree = degree
      animationRotate.rotate(this.currentDegree).step()
      this.animationRotate = animationRotate.export()

      const animationFold = wx.createAnimation({
        duration: 500
      })
      if (this.fold) {
        animationFold.translateX(10).step({
          duration: 500
        })
      } else {
        animationFold.translateX(0).step({
          duration: 500
        })
      }

      this.animationFold = animationFold.export()
    },
    goAppDownload() {
      uni.navigateTo({
        url: '/pagesAR/appDownload/index',
        success: () => {
          this.needReload = false
          this.rightMenuRestart()
        }
      })
    },
    goFresherGuide() {
      this.rightMenuRestart()
      this.showFresherGuide = true
    },
    skipGuide() {
      this.showFresherGuide = false
      if (this.autoShowFresherGuide) {
        this.autoShowFresherGuide = false
        this.unityShowFresherGuide = true
        this.getWebviewSrc()
        saveFresherGuide({
          scenicId: this.scenicId,
          type: guideline,
          value: false
        })
      } else {
        this.unityShowFresherGuide = false
      }
    },
    getShareScenicFun() {
      //此处的mapId是因为request 检测到401回跳登录页，然后带过去的参数是第一个请求的参数，而不是当前页面url的参数，所以会丢
      //这里就带上mapId来解决丢参数的问题
      const param = { scenicId: this.scenicId }
      if (this.mapId) {
        param.mapId = this.mapId
      }
      getShareScenic(param).then((res) => {
        this.shareData = res
      })
    },
    //填写邀请码
    goInviteCode() {
      uni.navigateTo({
        url: `/pagesAR/inviteCode/index?scenicId=${this.scenicId}`,
        success: () => {
          this.needReload = true
          this.rightMenuRestart()
        }
      })
    },
    //邀请有礼
    inviteFresher() {
      //获取海报的url
      getSharePostPage(this.scenicId).then((res) => {
        this.iconUrl =
          res.url + '?x-oss-process=image/rounded-corners,r_30/format,png'
        this.$refs.refShare.handleShowShare()
        this.showShare = true
      })
      this.needReload = false
    },
    getCurrentDate() {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth() + 1
      const day = now.getDate()
      return `${year}-${month}-${day}`
    },
    showSpringFestival() {
      if (!this.detailData.activityScenicFlag) {
        return
      }
      const currentDate = this.getCurrentDate()
      const lastOpenedDate = uni.getStorageSync('popupSpringLastOpenedDate')
      if (lastOpenedDate !== currentDate) {
        this.$refs.springFestival.handleShow()
        uni.setStorageSync('popupSpringLastOpenedDate', currentDate)
      } else {
        this.showSpringIconContent()
      }
    },
    goSpringFestival() {
      debounce(
        uni.navigateTo({
          url: `/pagesAction/spring/index?activityId=1&scenicId=${this.scenicId}`,
          success: () => {
            this.needReload = false
            this.rightMenuRestart()
            this.$refs.springFestival.handleClose()
          }
        }),
        300
      )
    },
    // 去详情
    goDetail() {
      uni.navigateTo({
        url: `/pagesA/home/index?scenicId=${this.scenicId}`,
        success: () => {
          this.needReload = false
          this.rightMenuRestart()
        }
      })
    },
    // 跳转到支付
    goPay() {
      let url = ''
      if (this.detailData.payState === 1 || this.detailData.activeState === 1) {
        if (this.detailData.payState === 1) {
          url = `/pagesA/active/index?payNo=${this.detailData.payCode}&state=1`
        } else {
          url = `/pagesA/active/index?payNo=${this.detailData.activeCode}&state=0`
        }
      } else {
        url = `/pagesPerson/pay/index?scenicId=${this.scenicId}`
      }
      uni.navigateTo({
        url,
        success: () => {
          this.needReload = true
          this.rightMenuRestart()
        }
      })
    },
    // 拨打客服电话
    makePhoneCall() {
      uni.makePhoneCall({
        phoneNumber: '400-867-5999'
      })
    },
    formatCountdown() {
      const remainingSeconds = this.detailData.freeTime
      const hours =
        Math.floor(remainingSeconds / 3600) > 99
          ? 99
          : Math.floor(remainingSeconds / 3600)
      const minutes = Math.floor((remainingSeconds % 3600) / 60)
      const seconds = remainingSeconds % 60

      const formattedHours = String(hours).padStart(2, '0')
      const formattedMinutes = String(minutes).padStart(2, '0')
      const formattedSeconds = String(seconds).padStart(2, '0')
      if (formattedHours === '00') {
        return `${formattedMinutes}:${formattedSeconds}`
      }
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
    },
    // 处理倒计时时间
    async dealDeviceArUseInfoFun(type) {
      if (
        this.detailData.freeTime > 0 &&
        this.detailData.activeState !== 1 &&
        this.detailData.payState !== 1 &&
        this.detailData.isLoadDefaut === 1 &&
        !this.detailData.free
      ) {
        const time = Date.now()
        await dealDeviceArUseInfo({
          deviceCode: this.openId,
          scenicId: this.scenicId,
          startTime: type === 'startTime' ? time : null,
          endTime: type === 'endTime' ? time : null,
          type: 3
        })
      }
    },
    //检查免费体验时长，如果用完了，就弹出购买框
    checkFreeTryFinish() {
      const show =
        this.detailData.payState !== 1 &&
        this.detailData.activeState !== 1 &&
        (this.detailData.freeTime === 0 || this.detailData.freeTime === null)
      show
        ? this.$refs.freeTryHint.handleShow()
        : this.$refs.freeTryHint.handleHidden()
    },

    //1.免费体验时长体验中的时候，要一直提示免费试用中，除非用户主动关闭
    //2.每次在当前页面的时候，才会开始计时，不在当前页面就暂停计时
    //如果用户已经购买或者已经激活该景区，则忽略上述操作
    checkfreeTrying() {
      if (this.detailData.payState === 1 || this.detailData.activeState === 1) {
        this.freeTrying = false
        if (this.intervalId) {
          clearTimeout(this.intervalId)
          clearInterval(this.timeInterval)
        }
        return
      }
      if (this.detailData.freeTime && this.detailData.freeTime > 0) {
        this.time = this.formatCountdown()
        if (this.intervalId) {
          clearTimeout(this.intervalId)
        }
        //freeTime 的单位是秒
        //这里判断一个小时是因为安卓手机上值太大，会有crash
        const that = this
        const interval =
          (this.detailData.freeTime > 3600 ? 3600 : this.detailData.freeTime) *
          1000
        this.intervalId = setTimeout(async () => {
          this.dealDeviceArUseInfoFun('endTime')
          that.detailData.freeTime = 0
          that.checkFreeTryFinish()
          that.checkfreeTrying()
        }, interval)
        this.resume()
      } else {
        clearTimeout(this.intervalId)
        clearInterval(this.timeInterval)
      }
      this.freeTrying = this.detailData.freeTime > 0
    },
    //暂停倒计时
    stop() {
      if (this.timeInterval) {
        this.dealDeviceArUseInfoFun('endTime')
        clearInterval(this.timeInterval)
        this.timeInterval = null
      }
    },
    //继续倒计时
    resume() {
      if (!this.timeInterval && this.detailData.freeTime > 0) {
        this.dealDeviceArUseInfoFun('startTime')
        this.timeInterval = setInterval(() => {
          this.detailData.freeTime--
          this.time = this.formatCountdown()
        }, 1000)
      }
    },
    async getLocation() {
      const that = this
      await uni.getLocation({
        type: 'gcj02',
        success: function (res) {
          that.onLoadFirst = false
          console.log('当前经纬度：', res.longitude, res.latitude)
          that.longitude = res.longitude
          that.latitude = res.latitude
          that.getArDetail()
        },
        fail: function (res) {
          if (res.errno === 103) {
            //未给定位权限
            wx.showModal({
              title: '提示',
              content: '您尚未授权地理位置权限，请前往设置授权后再次尝试',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.openSetting({
                    settingList: ['scope.userLocation'],
                    success: function () {
                      console.log('打开设置成功')
                      that.getLocation()
                    }
                  })
                }
              }
            })
          } else {
            uni.showToast({
              title: '请打开定位'
            })
          }
          console.log(res)
        }
      })
    },
    handleIPOToServer() {
      if (
        this.detailData.isLoadDefaut === 1 &&
        !this.detailData.orderEnd &&
        !this.detailData.orderStart
      ) {
        dealOrderStatus({
          payNo: this.detailData.payCode
        })
      }
      this.once = false
      saveDefaultFoot({
        scenicId: this.scenicId,
        userId: this.detailData.userId
      })
    },
    async getFresherGuideFun() {
      await getFresherGuide({ scenicId: this.scenicId, type: guideline })
        .then((res) => {
          if (!res) {
            this.autoShowFresherGuide = true
          }
        })
        .catch((e) => {
          console.log('getFresherGuide:', e)
        })
    },
    getArDetail() {
      const that = this
      arDetail({
        deviceCode: this.openId,
        scenicId: this.scenicId,
        terminalType: 1,
        longitude: this.longitude,
        latitude: this.latitude
      })
        .then((res) => {
          const {
            activeState,
            hasWriteInviteCode,
            freeTime,
            payState,
            payCode,
            activeCode,
            scenicName,
            scenicSpotList,
            scenicToken,
            inviterAmount,
            isLoadDefaut,
            userId,
            orderEnd,
            orderStart,
            contentNo,
            free,
            feature,
            activityScenicFlag
          } = res
          this.detailData = {
            couponFlag: false,
            activeState,
            hasWriteInviteCode,
            payState,
            payCode,
            activeCode,
            freeTime: Number(freeTime),
            scenicName,
            mapIds: scenicSpotList.map((e) => e.mapId),
            scenicToken,
            inviterAmount,
            isLoadDefaut,
            userId,
            orderEnd,
            orderStart,
            contentNo,
            free,
            feature,
            activityScenicFlag
          }
          console.log('景区详情:', res, this.detailData)
          that.vlidateIconsAndWeviewState()
          if (this.detailData.isLoadDefaut === 1 && !this.detailData.free) {
            this.checkfreeTrying()
            that.checkFreeTryFinish()
          }
          this.showSpringFestival()
          that.getWebviewSrc()
          if (that.once && !this.detailData.free) {
            that.handleIPOToServer()
          }
          that.$refs.loadingView.hideLoading()
        })
        .catch((err) => {
          this.$refs.loadingView.hideLoading()
          if (err && err.message === '景区已下架') {
            uni.showToast({
              title: `景区已下架:${this.scenicId}`,
              icon: 'error',
              duration: 3000
            })
            this.goBack()
          }
        })
    },
    setWebviewSrc(data) {
      this.isLoginSetInterval = setInterval(() => {
        if (uni.getStorageSync("mobile") && uni.getStorageSync("openid") && uni.getStorageSync("mobile") != null && uni.getStorageSync("openid") != null) {
          this.webviewSrc = `${data.baseUrl}/${data.src}${data.isDebug == true ? "?debug=true" : "?"}&t=${data.name ? encodeURI(data.name.length > 20 ? data.name.substr(0, 20) : data.name) : ''}&uId=${uni.getStorageSync("mobile")}&openid=${uni.getStorageSync("openid")}`;
          console.log("url：", this.webviewSrc);
          clearInterval(this.isLoginSetInterval);
        } else {
          if (this.firstIndex == 0) {
            uni.navigateTo({
              url: '/pagesA/login/index'
            });
            this.firstIndex = 1;
          }
        }
        console.log("setWebviewSrcsetWebviewSrc");
      }, 1000);

    }
  },
  onUnload() {
    this.dealDeviceArUseInfoFun('endTime')
    clearTimeout(this.intervalId)
    clearInterval(this.timeInterval)
  },
  async onLoad(options) {
    console.log('pagesAR onLoad:', JSON.parse(options.scenicId))
    if (JSON.parse(options.scenicId)) {
      this.setWebviewSrc(JSON.parse(options.scenicId));
    }
   
    this.rightMenuRestart = debounce(() => {
      // eslint-disable-next-line no-undef
      const pages = getCurrentPages()
      const currentPagePath = pages[pages.length - 1].route
      const regex2 = /pagesAR\/guide\/index/
      const showCurrentPage = regex2.test(currentPagePath)
      console.log(pages, currentPagePath, regex2);
      // if (
      //   !this.fold &&
      //   !this.showShare &&
      //   !this.showFresherGuide &&
      //   showCurrentPage
      // ) {
      //   this.foldMenu()
      // }
    }, 5000)
    uni.getSystemInfo({
      success: (res) => {
        this.osName = res.osName
      }
    })
    return
    const accountInfo = wx.getAccountInfoSync()
    this.platform_version = accountInfo.miniProgram.version || ''

    this.token = uni.getStorageSync('token')
    if (options.scene) {
      //扫码进来的
      const params = decodeURIComponent(options.scene)
      const regexScenicIdMapId = /scenicId=(\d+)&mapId=(\d+)/
      const regexScenicId = /scenicId=(\d+)/
      const regexMapId = /mapId=(\d+)/

      if (regexScenicIdMapId.test(params)) {
        const match = params.match(regexScenicIdMapId)
        this.scenicId = match[1]
        this.mapId = match[2]
      } else if (regexScenicId.test(params)) {
        const match = params.match(regexScenicId)
        this.scenicId = match[1]
      } else if (regexMapId.test(params)) {
        const match = params.match(regexMapId)
        this.mapId = match[1]
      } else {
        console.error('scene error')
      }
    }

    if (options.mapId) {
      this.mapId = options.mapId
    }
    if (options.scenicId) {
      this.scenicId = options.scenicId
    }
    console.log('景区的ID：', this.scenicId)
    console.log('景区的MAPID：', this.mapId)
    this.openId = uni.getStorageSync('openId')
    const userInfo = uni.getStorageSync('userInfo')
    this.distinct_id = String(JSON.parse(userInfo).uid)
    this.getShareScenicFun()
    if (this.token) {
      await this.getFresherGuideFun()
      await this.getLocation()
    }
  },
  onHide() {
    this.stop()
  },
  onShow() {
    // this.rightMenuRestart()
    // if (this.needReload && !this.onLoadFirst) {
    //   this.$refs.loadingView.showLoading()
    //   this.getArDetail()
    // } else {
    //   if (!this.detailData.free) {
    //     this.resume()
    //   }
    // }
  }
}
</script>

<style scoped lang="scss">
.activityContainer {
  position: fixed;
  left: 10rpx;
  z-index: 99998;
  top: 180rpx;

  .coupon-icon {
    .coupon-img {
      width: 100rpx;
      height: 100rpx;
    }
  }

  .spring-icon {
    margin-top: 20rpx;
    position: relative;
    width: 300rpx;

    .coupon-img {
      width: 100rpx;
      height: 100rpx;
    }

    .content {
      position: absolute;
      top: 0;
      left: 0;
      width: 220rpx; //220rpx
      height: 50rpx;
      opacity: 0;
    }
  }
}

.freeTryToast {
  border-radius: 30rpx;
  height: 60rpx;
  position: fixed;
  top: 130rpx;
  background-color: rgba(0, 0, 0, 0.75);
  left: 50%;
  transform: translateX(-50%);
}

.iconContainer {
  position: fixed;
  z-index: 99998;
  top: 120rpx;
  right: 0;

  .icon {
    margin: 20rpx 20rpx 0 10rpx;
    width: 80rpx;
    border-radius: 40rpx;
    background-color: rgba(255, 255, 255, 0.95);

    .img {
      opacity: 1;
      width: 60rpx;
      height: 60rpx;
      padding: 0 10rpx 30rpx 10rpx;
      background-color: #0000;
    }
  }
}
</style>
