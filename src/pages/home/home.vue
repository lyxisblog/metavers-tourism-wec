<template>
  <view class="home" :style="'padding-top:' + statusHeight + 'px;'">
    <!-- 头部 -->
    <view class="top flex-between">
      <view class="top-left">
        <view class="top-title">
          角望展厅
        </view>
        <!-- <view class="top-text">
          景区使用最佳
        </view>
        <img class="top-icon" src="../../static/images/hand_heart_gesture.svg"> -->
      </view>
    </view>
    <!-- 搜索 定位于当前选择城市不同时的弹窗-->
    <!-- <view class="search flex-middle">
      <view v-if="posCityShow && selected == 1" class="position-pop flex-middle">
        <view class="position-pop-text flex-middle">
          您当前定位位置为
          <view class="posCity-text">
            {{ posCity }}
          </view>,是否切换？
        </view>
        <view class="position-pop-btn" @click="switchPosCity()">
          切换
        </view>
        <view class="position-pop-close" @click="closePosCity()">
          X
        </view>
      </view>
      <view class="city flex-middle" @click="getPosition(0, false, 1)">
        <view class="city-text">
          {{ city ? city : "全国" }}
        </view>
        <img class="city-icon" src="../../static/images/caret-down-filled.svg">
      </view>
      <view class="search-input-view flex-middle" @click.stop="goHomeSearch">
        <img class="search-icon" src="../../static/images/search.svg">
        <view class="line" />
        <img class="scan" src="../../static/images/scan.svg" @click.stop="openScanCode">
      </view>
      <view class="top-right" @click="checkIntroduction">
        攻略
      </view>
    </view> -->
    <!-- 消息 -->
    <view v-if="message" class="message flex-middle">
      <img class="message-icon" src="../../static/images/message_icon.svg">
      <view class="text">
        {{ message }}
      </view>
      <img class="close-icon" src="../../static/images/close_icon.svg" @click="message = ''">
    </view>
    <view v-else class="message-no" />
    <!-- tabs -->
    <view class="tabs flex-middle">
      <view class="btn" :class="selected == 1 ? 'selected' : ''" @click="tabsChange(1)">
        {{ tabs.listsNames[0] }}
      </view>
      <view class="btn" :class="selected == 2 ? 'selected' : ''" @click="tabsChange(2)">
        {{ tabs.listsNames[1] }}
      </view>
    </view>

    <!-- 数据 -->
    <scroll-view scroll-y="true" class="datas" :class="message ? '' : 'datas-top'" refresher-enabled="true"
      :refresher-triggered="triggered" @refresherrefresh="fresh" @scrolltolower="pageTurning">
      <!-- 活动banner -->
      <!-- <view class="wrap">
        <u-swiper
          v-if="activityList.length > 0 && selected === 1"
          :list="activityList"
          height="200"
          indicator-pos=""
          @click="clickImg"
        />
      </view> -->
      <view v-for="item in dataList" :key="item.scenicId" class="data" v-if="item.isShow"
        @click="goDetails({ data: item })">
        <view class="data-top"
          :style="'background-image: url(' + item.imageUrl + item.imgSrc + ');background-size: cover;'">
          <view v-if="selected == 2" class="state" :class="item.state == 0
            ? 'state0'
            : item.state == 1
              ? 'state1'
              : item.state == 2
                ? 'state2'
                : ''
            ">
            {{
              item.state == 0
              ? "待使用"
              : item.state == 1
                ? "已使用"
                : item.state == 2
                  ? "已过期"
                  : ""
            }}
          </view>
          <view v-if="item.isShow === 1 && selected == 1" class="is-show flex-v">
            <img class="is-show-img" src="../../static/images/locationGif.gif">
          </view>
          <!-- 评分 -->
          <view class="score" v-if="item.isScore">
            <view class="score-text">
              评分<span class="score-num">{{ item.score ? item.score : '99.0' }}</span>
            </view>
          </view>
          <!-- 景点名称 -->
          <view class="title">
            {{ item.name }}
          </view>
          <img class="top-logo" src="../../static/images/AR_logo.svg">
        </view>
        <view class="data-bottom flex-between">
          <view class="imgs flex-middle">
            <view v-for="(img, index) in item.footUserPicList" :key="index" class="img-view">
              <img class="img" :src="img.userPic">
            </view>
          </view>
          <view class="useCount" v-if="item.isCount">
            {{ item.useCount ? item.useCount : "0" }}
          </view>
        </view>
      </view>
      <u-loadmore class="loadmore" :status="status" @loadmore="pageTurning()" />
    </scroll-view>
    <u-toast ref="uToast" />
    <!-- 隐私协议弹窗 -->
    <u-popup v-model="popupShow" mode="center" border-radius="14" :mask-close-able="false" class="popup" width="624">
      <view class="title">
        隐私保护指引
      </view>
      <view class="main-text">
        <p>
          欢迎您使用游历星河！<br>
          我们非常重视保护您的个人信息，请您仔细阅读并理解我们的《游历星河用户隐私政策》，为了更好地保护您的权益，在此为您介绍在服务的过程中我们将如何规范安全的收集、存储、保护、使用及对外提供您的个人信息，请您重点关注如下内容：<br>
          1、我们可能会收集、使用必要信息，如您的账号注册信息等；<br>
          2、我们可能会根据您的使用场景并经您同意后向您获取系统权限，如存储权限等；
        </p>
      </view>
      <view class="agreement">
        登录注册需您阅读并同意我们的
        <span :href="agreementUrl" class="agreement-text" @click="checkAgreementUrl">《游历星河用户协议》、</span>
        <span :href="policyUrl" class="agreement-text" @click="checkPolicyUrl">《游历星河用户隐私政策》</span>
      </view>
      <button class="agree-btn" open-type="agreePrivacyAuthorization" @agreeprivacyauthorization="agree">
        同意并继续
      </button>
      <view class="agree-btn unagree-btn" @click="unAgree">
        不同意
      </view>
    </u-popup>
    <!-- 分享弹窗 -->
    <view v-if="popupShow2" class="pop-up-scan-mask flex-v">
      <view class="pop-up-scan flex-v" :style="'background-image: url(' + home_pop_banner1 + ');'">
        <img class="pop-up-scan-img" :src="home_pop_word1">
        <view class="name">
          {{ scenicInfo.scenicName }}
        </view>
        <view class="text-preferential">
          立享优惠
        </view>
        <view class="money">
          ￥{{ scenicInfo.arAmountAndroid }}
        </view>
        <view class="money2">
          ￥{{ scenicInfo.lineAmountAndroid }}
        </view>
        <view class="btn" @click="addInviteCode()">
          好的，去看看
        </view>
        <img class="close" src="../../static/images/close_home_pop.svg" @click="closePopupShow2">
      </view>
    </view>
    <view>
      <Tabbar current-page="pages/home/home" />
    </view>
  </view>
</template>

<script>
import { getScenicPage, noticeNeaOne, purchasedFoot, getList } from '../../api/home'
import { scenicInfoNonAuth, addInviteCode } from '../../api/api'
import { verifyCoupon } from '../../api/guideMap'
const QQMapWX = require('../../utils/qqmap-wx-jssdk.js')
import { shareImg } from '@u/const'
import { mapGetters } from 'vuex'
import { getActivityList } from '@i/action'

export default {
  data() {
    return {
      activityList: [],
      deviceId: '', //设备码
      triggered: false, // 下拉刷新
      statusHeight: 50,
      city: '', //城市
      posCity: '', //定位所在城市
      posCityShow: false,
      selected: 1, //展示类型
      status: 'loadmore', //加载状态
      dataList: [],
      scenicIdList: [],
      token: '',
      message: '',
      popupShow: false,
      popupShow2: false,
      scenicInfo: {}, //扫码得到的景区详情
      scanScenicId: '', //二维码中的景区id
      scanCode: '', //二维码邀请码
      // 定位
      longitude: '',
      latitude: '',
      // 城市不同时的定位：用于切换城市
      posLongitude: '',
      posLatitude: '',
      introduction:
        'https://meta-gateway.shengydt.com/api/front/login/getHtml/introductionWeUrl',
      agreementUrl:
        'https://meta-gateway.shengydt.com/api/front/login/getHtml/wcyhxy',
      policyUrl:
        ' https://meta-gateway.shengydt.com/api/front/login/getHtml/wcyszc',
      home_pop_banner1:
        'https://metaverse-uni.oss-cn-shanghai.aliyuncs.com/file/wechat/home_pop_banner1.png',
      home_pop_word1:
        'https://metaverse-uni.oss-cn-shanghai.aliyuncs.com/file/wechat/home_pop_word1.png',
      // 分页
      limit: 10,
      page: 1,
      total: 0,
      totalPage: 0,
      prev: '', //用于节流的时间
      //埋点对象：页面打开时触发
      sensorsPageView: {
        page_name: '游历星河首页', //页面名称
        refer_page_name: '', //来源页面
        scenic_id: '', //页面景区id
        user_lng: '', //用户定位的经度
        user_lat: '', //用户定位的纬度
        is_inside_scenic: ''//用户定位是否在景区内
      },
      //埋点对象：用户点击时触发
      sensorsClk: {
        page_name: '游历星河首页', //页面名称
        refer_page_name: '', //来源页面
        scenic_id: '', //页面景区id
        user_lng: '', //用户定位的经度
        user_lat: '', //用户定位的纬度
        is_inside_scenic: '', //用户定位是否在景区内
        element_name: '景点列表', //模块名称
        element_parameter: '', //模块参数
        item_id: '', //内容id
        item_type: ''//内容类型
      },
      firstEntry: 0,
      tabs: {
        listsNames: [
          "景区",
          "AR秀"
        ]
      }
    }
  },
  onLoad(option) {
    this.getStorageData(option)
    this.getActivityListFun()
  },
  onShow() {
    const cityStr = uni.getStorageSync('city') //定位城市
    if (cityStr) this.city = cityStr
    // this.firstEntry ++
    // 埋点
    // console.log('埋点', this.firstEntry)
    // if( this.firstEntry > 1) {
    //   this.trackFun('YLXH_PageView')
    // }
  },
  onShareTimeline() {
    return {
      title: '游历星河  AR奇幻游',
      imageUrl: shareImg,
      path: '/pages/home/home'
    }
  },
  onShareAppMessage() {
    return {
      title: '游历星河  AR奇幻游',
      imageUrl: shareImg,
      path: '/pages/home/home'
    }
  },
  computed: {
    ...mapGetters([
      'cityStr'
    ])
  },
  watch: {
    cityStr: function () {
      this.city = this.cityStr
      this.getScenicPage()
    }
  },
  methods: {
    // 切换到定位所在城市
    switchPosCity() {
      this.city = this.posCity
      //保存缓存
      uni.setStorage({
        key: 'city',
        data: this.city,
        success() {
          console.log('保存地址')
        }
      })
      // 定位同样需要切换
      this.longitude = this.posLongitude
      this.latitude = this.posLatitude
      uni.setStorageSync('latitude', this.latitude)
      uni.setStorageSync('longitude', this.longitude)
      this.posCityShow = false
      if (this.selected === 1) this.getScenicPage()
      if (this.selected === 2) this.purchasedFoot()
      // 埋点
      this.trackFun('YLXH_Clk', { element_parameter: '切换' })
    },
    // 关闭城市定位弹窗
    closePosCity() {
      // 埋点
      this.trackFun('YLXH_Clk', { element_parameter: 'X' })
      this.posCityShow = false
    },
    // 活动列表
    getActivityListFun() {
      // getActivityList().then(res => {
      //   if (res) {
      //     this.activityList = res.map(item => {
      //       return {
      //         image: item.imageUrl,
      //         title: item.activityName,
      //         activityId: item.activityId
      //       }
      //     })
      //   }
      // })
    },
    // 活动跳转
    clickImg(item) {
      uni.navigateTo({
        url: '/pagesAction/spring/index?activityId=' + this.activityList[item].activityId
      })
    },
    // 核销优惠券
    verifyCoupon(id) {
      const params = {
        id: id
      }
      verifyCoupon(params).then(() => {
        uni.showToast({
          title: '核销优惠券成功',
          duration: 2000,
          type: 'success'
        })
      })
    },
    // 绑定邀请码
    addInviteCode() {
      // 埋点
      this.trackFun('YLXH_Clk', { element_parameter: '好的，去看看' })
      const params = {
        inviteCode: this.scanCode,
        scenicId: this.scanScenicId
      }
      addInviteCode(params).then(() => {
        uni.showToast({
          title: '邀请成功',
          duration: 2000,
          type: 'success'
        })
        this.goDetails(this.scanScenicId)
      })
    },
    // 景区详情无权限
    scenicInfoNonAuth() {
      const params = {
        id: this.scanScenicId
      }
      scenicInfoNonAuth(params).then((res) => {
        this.scenicInfo = res
        this.popupShow2 = true
      })
    },
    // 关闭分享弹窗
    closePopupShow2() {
      // 埋点
      this.trackFun('YLXH_Clk', { element_parameter: 'X' })
      this.popupShow2 = false
    },
    // 同意协议
    agree() {
      // 埋点
      this.trackFun('YLXH_Clk', { element_parameter: '同意并继续' })
      this.popupShow = false
      uni.setStorageSync('popupShow', '1')
      this.getPosition(1, true, 0)
    },
    // 不同意协议，退出小程序
    unAgree() {
      // 埋点
      this.trackFun('YLXH_Clk', { element_parameter: '不同意' })
      wx.exitMiniProgram({
        success: function () {
          console.log('退出小程序成功')
        }
      })
    },
    // 查看用户协议
    checkAgreementUrl() {
      // 埋点
      this.trackFun('YLXH_Clk', { element_parameter: '《游历星河用户协议》' })
      uni.navigateTo({
        url: '/pages/webview/index?url=' + this.agreementUrl
      })
    },
    // 查看隐私政策
    checkPolicyUrl() {
      // 埋点
      this.trackFun('YLXH_Clk', { element_parameter: '《游历星河用户隐私政策》' })
      uni.navigateTo({
        url: '/pages/webview/index?url=' + this.policyUrl
      })
    },
    // 打开扫码二维码
    openScanCode() {
      // 埋点
      this.trackFun('YLXH_Clk', { element_parameter: '扫一扫icon' })
      if (!this.token) {
        uni.navigateTo({
          url: '/pagesA/login/index'
        })
        return
      }
      const that = this
      // 允许从相机和相册扫码
      wx.scanCode({
        onlyFromCamera: true,
        success(res) {
          console.log(res)
          // 主页路径
          const regexHome = /pages\/home\/home/
          // 匹配字符串中的 scenicId 和 code // 分享链接
          const regexShare = /scenicId=(\d+)&code=(\d+)/
          // 匹配ar页面路径
          const regexAr = /pagesAR\/guide\/index/
          // 匹配scenicId
          const regexScenicId = /scenicId=(\d+)/
          // 匹配scenicId与mapId // 酒店类型景点
          const regexScenicIdMapId = /scenicId=(\d+)&mapId=(\d+)/
          // 匹配核销
          const regexCoupon = /id=(\d+)&type=coupon/
          if (regexAr.test(res.path) && regexScenicIdMapId.test(decodeURIComponent(res.path))) { // 判断是否为 ar路径 且有 scenicId与mapId
            try {
              const match = decodeURIComponent(res.path).match(regexScenicIdMapId)
              uni.navigateTo({
                url: '/pagesAR/guide/index?scenicId=' + match[1] + '&mapId=' + match[2]
              })
              return
            } catch (error) {
              uni.showToast({
                title: '无效二维码',
                duration: 2000,
                icon: 'none'
              })
            }
          } else if (regexAr.test(res.path) && regexScenicId.test(decodeURIComponent(res.path))) { // 判断是否为 ar路径 且有 scenicId
            try {
              const match = decodeURIComponent(res.path).match(regexScenicId)
              uni.navigateTo({
                url: '/pagesAR/guide/index?scenicId=' + match[1]
              })
              return
            } catch (error) {
              uni.showToast({
                title: '无效二维码',
                duration: 2000,
                icon: 'none'
              })
            }
          } else if (regexHome.test(res.path) && regexShare.test(decodeURIComponent(res.path))) { // 判断是否为主页路径 且为 分享链接
            try {
              const match = decodeURIComponent(res.path).match(regexShare)
              if (match[1] && match[2]) {
                that.scanScenicId = match[1]
                that.scanCode = match[2]
                uni.setStorageSync('scanScenicId', that.scanScenicId)
                uni.setStorageSync('scanCode', that.scanCode)
                that.scenicInfoNonAuth()
              } else {
                console.log('未获取到需要字段')
                uni.showToast({
                  title: '无效二维码',
                  duration: 2000,
                  icon: 'none'
                })
              }
            } catch (error) {
              console.log('异常')
              uni.showToast({
                title: '无效二维码',
                duration: 2000,
                icon: 'none'
              })
            }
          } else if (regexCoupon.test(decodeURIComponent(res.result))) { // 判断是否为 核销优惠券
            const match = decodeURIComponent(res.result).match(regexCoupon)
            if (match[1]) {
              that.verifyCoupon(match[1])
            } else {
              console.log('未获取到需要字段')
              uni.showToast({
                title: '无效二维码',
                duration: 2000,
                icon: 'none'
              })
            }
          }
        }
      })
    },
    // 跳转到景区导航页面
    goDetails(scenicId, type) {
      // 直接点击
      // if (type) {
      //   // 埋点
      //   this.trackFun('YLXH_Clk', { element_parameter: '景区列表窗口' })
      // }
      console.log("scenicId", scenicId);
      const params = {
        id: scenicId
      }
      // if (uni.getStorageSync("mobile") && uni.getStorageSync("openid") && uni.getStorageSync("mobile") != null && uni.getStorageSync("openid") != null) {
      uni.navigateTo({
        url: '/pagesAR/guide/index?scenicId=' + JSON.stringify(scenicId.data)
      })
      // } else {
      //   uni.navigateTo({
      //     url: '/pagesA/login/index'
      //   })
      // }

      // scenicInfoNonAuth(params).then((res) => {
      //   if (res.wechatMiniStatus) {
      //     if (res.feature === '2') {
      //       uni.navigateTo({
      //         url: '/pagesA/scanCode/index?scenicId=' + scenicId + '&scanSpecification=' + res.scanSpecification
      //       })
      //     } else {
      //       uni.navigateTo({
      //         url: '/pagesAR/guide/index?scenicId=' + scenicId
      //       })
      //     }
      //   } else {
      //     uni.showToast({
      //       title: 'AR功能建设中，敬请期待。',
      //       duration: 2000,
      //       icon: 'none'
      //     })
      //   }
      // })
    },
    // 查看攻略
    checkIntroduction() {
      // 埋点
      this.trackFun('YLXH_Clk', { element_parameter: '攻略' })
      uni.navigateTo({
        url: '/pages/webview/index?url=' + this.introduction
      })
    },
    // 跳转到定位页面
    goPosition() {
      uni.navigateTo({
        url: '/pagesA/positioning/positioning'
      })
    },
    // 跳转到搜索页面
    goHomeSearch() {
      // 埋点
      this.trackFun('YLXH_Clk', { element_parameter: '搜索框' })
      uni.navigateTo({
        url: '/pagesA/homeSearch/homeSearch'
      })
    },
    // 获取消息
    noticeNeaOne() {
      // 获取景区id集合
      const list = []
      for (const item of this.dataList) {
        list.push(item.scenicId)
      }
      this.scenicIdList = list
      const parmas = {
        cityName: this.city,
        scenicIdList: this.scenicIdList,
        systemType: 1
      }
      noticeNeaOne(parmas).then((res) => {
        this.message = res
      })
    },
    // 获取定位
    getPosition(first, fresh, type) {
      // 直接点击
      if (type) {
        // 埋点
        this.trackFun('YLXH_Clk', { element_parameter: '城市' })
      }
      const that = this
      const tMap = new QQMapWX({
        key: '56SBZ-4ULEG-3MIQ7-QVOXE-HUNXE-6PBMI' //开发者密钥
      })
      uni.getLocation({
        type: 'gcj02',
        isHighAccuracy: true,
        success: function (res) {
          const cityStr = uni.getStorageSync('city')
          if (cityStr && !first) {
            that.goPosition()
            return
          } else if (cityStr) {
            return
          }
          that.longitude = res.longitude
          that.latitude = res.latitude
          uni.setStorageSync('latitude', that.latitude)
          uni.setStorageSync('longitude', that.longitude)
          // 使用腾讯sdk的reverseGeocoder方法 解析经纬度
          tMap.reverseGeocoder({
            location: {
              latitude: that.latitude,
              longitude: that.longitude
            },
            success: function (res) {
              console.log('解析地址成功', res)
              console.log('当前地址：', res.result.address)
              const regex = /[^省市]+(?=市)/g
              const result = res.result.address.match(regex)
              let city
              if (result && result.length > 0) {
                city = result[0]
                console.log(city)
              }
              that.city = city
              //保存缓存
              uni.setStorage({
                key: 'city',
                data: city,
                success() {
                  console.log('保存地址')
                }
              })
              if (fresh) {
                that.fresh()
              }
              if (first) {
                return
              } else {
                that.goPosition()
              }
            },
            fail: function (res) {
              uni.showToast({
                title: '定位失败',
                duration: 2000,
                icon: 'none'
              })
              console.log(res)
            },
            complete: function () {
              //无论成功失败都会执行
              console.log('获取定位信息')
              return
            }
          })
        },
        fail: function (res) {
          if (res.errno === 103) {
            //未给定位权限
            wx.showModal({
              title: '提示',
              content: '您尚未授权地理位置权限，请前往设置授权',
              showCancel: true,
              success: function (res) {
                if (res.confirm) {
                  wx.openSetting({
                    settingList: ['scope.userLocation'],
                    success: function () {
                      console.log('打开设置成功')
                    }
                  })
                }
              }
            })
          } else {
            that.$refs.uToast.show({
              title: '请打开定位',
              type: 'error'
            })
          }
          console.log(res)
        }
      })
    },
    // 改变tab标签
    tabsChange(index) {
      // 埋点
      // this.trackFun('YLXH_Clk', { element_parameter:'tab' })
      if (this.selected === index) return
      this.selected = index
      this.dataList = []
      this.limit = 3
      this.page = 1
      this.total = 0
      this.totalPage = 0
      this.status = 'nomore'
      if (this.selected === 1) this.getScenicPage("scenicAreaList")
      if (this.selected === 2) this.getScenicPage("arList")
      // if (this.selected === 2 && this.token) {

      //   // this.purchasedFoot()
      //   this.getScenicPage("arList")
      // }
    },
    // 打开定位切换弹窗
    openPosCityShow() {
      this.posCityShow = true
      setTimeout(() => {
        this.posCityShow = false
      }, 5000)
    },
    // 用于定位切换的节流函数
    throttle(delay) {
      if (this.prev === '') {
        this.prev = Date.now()
        this.openPosCityShow()
      }
      const now = Date.now()
      if (now - this.prev > delay) {
        this.openPosCityShow()
        this.prev = Date.now()
      }
    },
    // 下拉刷新
    fresh() {
      this.triggered = true
      this.limit = 10
      this.getScenicPage(this.selected === 1 ? "scenicAreaList" : "arList");
      console.log("下拉刷新");
      // this.getPositionFresh()
    },
    // 获取定位或刷新：此方法只用于下拉
    getPositionFresh() {
      const that = this
      const tMap = new QQMapWX({
        key: '56SBZ-4ULEG-3MIQ7-QVOXE-HUNXE-6PBMI' //开发者密钥
      })
      uni.getLocation({
        type: 'gcj02',
        isHighAccuracy: true,
        success: function (res) {
          const res1 = res
          // 使用腾讯sdk的reverseGeocoder方法 解析经纬度
          tMap.reverseGeocoder({
            location: {
              latitude: res1.latitude,
              longitude: res1.longitude
            },
            success: function (res) {
              console.log('解析地址成功', res)
              console.log('当前地址：', res.result.address)
              const regex = /[^省市]+(?=市)/g
              const result = res.result.address.match(regex)
              let city
              if (result && result.length > 0) {
                city = result[0]
                console.log(city)
              }
              const cityStr = uni.getStorageSync('city')
              if (cityStr) {
                // 判断当前选择的城市是否与定位的城市相同
                if (cityStr === city) {
                  that.longitude = res1.longitude
                  that.latitude = res1.latitude
                  uni.setStorageSync('latitude', that.latitude)
                  uni.setStorageSync('longitude', that.longitude)
                } else {
                  that.posCity = city
                  that.posLongitude = res1.longitude
                  that.posLatitude = res1.latitude
                  that.throttle(50000)
                }
                if (that.selected === 1) that.getScenicPage()
                if (that.selected === 2) that.purchasedFoot()
              }
            },
            fail: function (res) {
              uni.showToast({
                title: '定位失败',
                duration: 2000,
                icon: 'none'
              })
              console.log(res)
            },
            complete: function () {
              //无论成功失败都会执行
              console.log('获取定位信息')
              return
            }
          })
        },
        fail: function (res) {
          if (res.errno === 103) {
            //未给定位权限
            wx.showModal({
              title: '提示',
              content: '您尚未授权地理位置权限，请前往设置授权',
              showCancel: true,
              success: function (res) {
                if (res.confirm) {
                  wx.openSetting({
                    settingList: ['scope.userLocation'],
                    success: function () {
                      console.log('打开设置成功')
                    }
                  })
                }
              }
            })
          } else {
            that.$refs.uToast.show({
              title: '请打开定位',
              type: 'error'
            })
          }
          if (that.selected === 1) that.getScenicPage()
          if (that.selected === 2) that.purchasedFoot()
        }
      })
    },
    // 翻页
    pageTurning() {
      // if (this.page >= this.totalPage) return
      // this.status = 'loading'
      // this.limit = this.limit + 10
      // if (this.selected === 1) this.getScenicPage()
      // if (this.selected === 2) this.purchasedFoot()
    },
    // 第一次打开获取缓存
    getStorageData(option) {
      const that = this
      uni.getSystemInfo({
        success: function (res) {
          that.deviceId = res.deviceId
        },
        fail: function (res) {
          console.log(res)
        }
      })
      const res = wx.getMenuButtonBoundingClientRect()
      const statusHeight = res.top //胶囊距离顶部
      // const navHeight = res.height //胶囊高度
      this.statusHeight = statusHeight - 1
      const scene = decodeURIComponent(option.scene)
      if (scene) {
        // 匹配字符串中的 scenicId 和 code
        const regex = /scenicId=(\d+)&code=(\d+)/
        const match = scene.match(regex)
        if (match) {
          this.scanScenicId = match[1]
          this.scanCode = match[2]
          uni.setStorageSync('scanScenicId', this.scanScenicId)
          uni.setStorageSync('scanCode', this.scanCode)
          this.scenicInfoNonAuth()
        } else {
          console.log('未能找到匹配项')
        }
      }
      const cityStr = uni.getStorageSync('city') //定位城市
      // 经纬度
      const latitudeStr = uni.getStorageSync('latitude')
      const longitudeStr = uni.getStorageSync('longitude')
      this.token = uni.getStorageSync('token')
      // const popupShow = uni.getStorageSync('popupShow') //隐私协议
      // if (popupShow) {
      //   this.popupShow = false
      // } else {
      //   this.popupShow = true
      // }
      if (cityStr) this.city = cityStr
      if (latitudeStr) this.latitude = latitudeStr
      if (longitudeStr) this.longitude = longitudeStr
      this.getScenicPage(this.selected === 1 ? "scenicAreaList" : "arList");
    },
    // 埋点方法
    trackFun(type, data) {
      // 获取定位
      const latitudeStr = uni.getStorageSync('latitude')
      const longitudeStr = uni.getStorageSync('longitude')
      // 判断是否在景区
      let is_inside_scenic = false
      if (this.dataList && this.dataList.length > 0) {
        if (this.dataList[0].isShow === 1) {
          is_inside_scenic = true
        } else {
          is_inside_scenic = false
        }
      } else {
        is_inside_scenic = false
      }
      // 根据类型传值
      if (type && type === 'YLXH_PageView') {
        this.sensorsPageView.user_lng = longitudeStr ? parseFloat(longitudeStr).toFixed(6) : '0'
        this.sensorsPageView.user_lat = latitudeStr ? parseFloat(latitudeStr).toFixed(6) : '0'
        this.sensorsPageView.is_inside_scenic = is_inside_scenic
        this.$sensors.track('YLXH_PageView', this.sensorsPageView)
      } else if (type && type === 'YLXH_Clk') {
        return
        // this.sensorsClk.user_lng = longitudeStr
        // this.sensorsClk.user_lat = latitudeStr
        // this.sensorsClk.is_inside_scenic = is_inside_scenic
        // this.sensorsClk.element_parameter = data.element_parameter
        // this.$sensors.track('YLXH_Clk', this.sensorsClk)
      }
    },
    // 获取已购数据
    purchasedFoot() {
      const parmas = {
        limit: this.limit,
        page: this.page
      }
      purchasedFoot(parmas).then((res) => {
        if (!res.list) {
          uni.showToast({
            title: '暂无数据',
            duration: 2000,
            icon: 'none'
          })
        }
        // this.dataList.push(...res.list)
        this.dataList = res.list
        this.limit = res.limit
        this.page = res.page
        this.total = res.total
        this.totalPage = res.totalPage
        if (this.page >= this.totalPage) {
          this.status = 'nomore'
        } else {
          this.status = 'loadmore'
        }
        this.triggered = false
      })
    },
    // 获取数据
    getScenicPage(first) {
      const parmas = {
        deviceCode: this.deviceId,
        limit: this.limit,
        page: this.page,
        type: this.selected,
        queryLocate: this.city,
        longitude: this.longitude,
        latitude: this.latitude
      }

      // getList({}).then((res) => {
      //   console.log("getScenicPage", res);
      //   this.dataList=res.scenicAreaList;
      // })
      uni.request({
        url: `https://metaverse-jwar-release.oss-cn-shanghai.aliyuncs.com/WeChat/PluginRepositories/WeChatData/listOfScenicSpots.json?v=${Math.floor(Math.random() * 100) + 1}`,
        method: 'GET',
        success: (res) => {
          if (res.statusCode === 200) {
            this.dataList = res.data[first].map(item => {
              return {
                ...item, baseUrl: res.data.baseUrl, imageUrl: res.data.imageUrl
              };
            });
            this.triggered = false;
            uni.setStorageSync("tabs", res.data.tabs);
            this.tabs.listsNames[0] = res.data.tabs.listsNames[0];
            this.tabs.listsNames[1] = res.data.tabs.listsNames[1];

          }
        }
      })


      return

      getScenicPage(parmas).then((res) => {
        if (!res.list) {
          uni.showToast({
            title: '暂无数据',
            duration: 2000,
            icon: 'none'
          })
        }
        this.dataList = res.list
        this.limit = res.limit
        this.page = res.page
        this.total = res.total
        this.totalPage = res.totalPage
        if (this.page >= this.totalPage) {
          this.status = 'nomore'
        } else {
          this.status = 'loadmore'
        }
        if (first) {
          // 埋点
          this.trackFun('YLXH_PageView')
        }
        this.triggered = false
        this.noticeNeaOne()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  padding: 20rpx 32rpx 0rpx 0rpx;
}

.home {
  background: url("https://metaverse-jwar-release.oss-cn-shanghai.aliyuncs.com/WeChat/PluginRepositories/WeChatData/home_background.jpg") no-repeat;
  background-size: cover;
  background-position: center;
  width: 750rpx;
  height: 100vh;
  // padding-top: 85rpx;
  padding-left: 32rpx;
  color: #ffffff;
  font-family: PingFangSC-Regular, PingFang SC;

  // 头部
  .top {
    align-items: flex-end;

    .top-left {
      display: flex;
      align-items: flex-end;

      .top-title {
        font-size: 48rpx;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
      }

      .top-text {
        font-size: 32rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #cce0f4;
        margin-left: 16rpx;
      }

      .top-icon {
        width: 32rpx;
        height: 32rpx;
        margin-left: 8rpx;
      }
    }
  }

  // 搜索
  .search {
    margin-top: 28rpx;
    position: relative;

    .position-pop {
      font-size: 28rpx;
      font-weight: 400;
      width: 660rpx;
      padding: 0rpx 0rpx 0rpx 35rpx;
      background-color: rgba($color: #000000, $alpha: 0.4);
      border-radius: 15rpx;
      position: absolute;
      top: 68rpx;

      // left: 20rpx;
      .posCity-text {
        width: 60rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .position-pop-btn {
        background-color: #50a3ff;
        padding: 5rpx 15rpx;
        border-radius: 10rpx;
      }

      .position-pop-close {
        margin-left: 60rpx;
        width: 51rpx;
        height: 68rpx;
        line-height: 68rpx;
      }
    }

    .city {
      .city-text {
        font-size: 28rpx;
        font-weight: 400;
        width: 60rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .city-icon {
        width: 28rpx;
        height: 28rpx;
        margin-left: 8rpx;
      }
    }

    .search-input-view {
      width: 460rpx;
      height: 68rpx;
      background: rgba(255, 255, 255, 0.2);
      box-shadow: 0rpx 2rpx 28rpx 0rpx rgba(72, 127, 121, 0.1);
      border-radius: 40rpx;
      margin-left: 24rpx;
    }

    .search-icon {
      width: 36rpx;
      height: 36rpx;
      margin-left: 24rpx;
    }

    .line {
      width: 0rpx;
      height: 48rpx;
      opacity: 0.31;
      border: 2rpx solid #ffffff;
      margin-left: 320rpx;
    }

    .scan {
      margin-left: 24rpx;
      width: 36rpx;
      height: 36rpx;
    }

    .top-right {
      width: 92rpx;
      height: 60rpx;
      background-color: #ffffff;
      color: #022475;
      text-align: center;
      border-radius: 30rpx 0 0 30rpx;
      line-height: 60rpx;
      margin-left: 60rpx;
      font-size: 30rpx;
      font-weight: 500;
    }
  }

  // 消息
  .message {
    margin-top: 32rpx;
    width: 686rpx;
    height: 64rpx;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 32rpx 32rpx 32rpx 32rpx;

    .message-icon {
      width: 48rpx;
      height: 48rpx;
      margin-left: 24rpx;
    }

    .text {
      width: 480rpx;
      font-size: 32rpx;
      font-family: PingFangSC-Regular-, PingFangSC-Regular;
      font-weight: normal;
      color: #333333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-left: 16rpx;
    }

    .close-icon {
      width: 44rpx;
      height: 44rpx;
      margin-left: 50rpx;
    }
  }

  .message-no {
    width: 686rpx;
    height: 20rpx;
  }

  // tabs
  .tabs {
    margin-top: 24rpx;

    .btn {
      width: 338rpx;
      padding-bottom: 16rpx;
      border-bottom: 2rpx solid rgba(3, 98, 231, 0.8);
      text-align: center;
      font-size: 32rpx;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.8);
    }

    .selected {
      padding-bottom: 13rpx;
      border-bottom: 6rpx solid #50a3ff;
      font-weight: 500;
      color: #ffffff;
    }
  }

  // 数据
  .datas {
    overflow-y: auto;
    position: absolute;
    bottom: 0rpx;
    left: 32rpx;
    top: 275rpx;
    width: 718rpx;
    padding-bottom: 51px;

    .data {
      margin-top: 36rpx;
      background: #ffffff;
      border-radius: 32rpx;
      width: 686rpx;

      .data-top {
        width: 686rpx;
        height: 376rpx;
        background: #d8d8d8;
        box-shadow: 0rpx 2rpx 28rpx 0rpx rgba(0, 75, 139, 0.3);
        border-radius: 32rpx;
        position: relative;

        .state {
          width: 160rpx;
          height: 48rpx;
          border-radius: 32rpx 0rpx 32rpx 0rpx;
          text-align: center;
          line-height: 48rpx;
          font-size: 28rpx;
          font-family: PingFangSC-Medium-, PingFangSC-Medium;
          font-weight: normal;
          position: absolute;
          top: 0rpx;
          left: 0rpx;
        }

        .state0 {
          background: linear-gradient(180deg,
              #ffe8b4 0%,
              #ffeac5 43%,
              #fac377 100%);
        }

        .state1 {
          background: linear-gradient(90deg,
              rgba(0, 75, 139, 0.2) 0%,
              rgba(0, 75, 139, 0.9) 100%);
        }

        .state2 {
          background: linear-gradient(90deg,
              rgba(51, 51, 51, 0.2) 0%,
              rgba(51, 51, 51, 0.9) 100%);
        }

        .is-show {
          width: 64rpx;
          height: 64rpx;
          background: rgba($color: #000000, $alpha: 0.4);
          border-radius: 19rpx 19rpx 19rpx 19rpx;
          position: absolute;
          top: 24rpx;
          left: 24rpx;

          .is-show-img {
            width: 64rpx;
            height: 64rpx;
          }
        }

        .score {
          position: absolute;
          right: 0rpx;
          top: 0rpx;
          width: 126rpx;
          height: 48rpx;
          text-align: center;
          background-color: rgba($color: #ffffff, $alpha: 0.9);
          border-top-right-radius: 32rpx;
          border-bottom-left-radius: 32rpx;

          .score-text {
            font-size: 22rpx;
            font-weight: 400;
            color: #004b8b;
          }

          .score-num {
            font-size: 32rpx;
            color: #ff4719;
            margin-left: 1rpx;
          }
        }

        .title {
          position: absolute;
          left: 24rpx;
          bottom: 16rpx;
          font-size: 36rpx;
          font-weight: 500;
          color: #ffffff;
          text-shadow: 0px 0px 12px rgba(0, 0, 0, 0.4);
          max-width: 550rpx;
        }

        .top-logo {
          width: 80rpx;
          height: 80rpx;
          position: absolute;
          right: 24rpx;
          bottom: 16rpx;
        }
      }

      .data-bottom {
        height: 92rpx;

        .imgs {
          margin-left: 24rpx;

          .img-view {
            width: 36rpx;
          }

          .img {
            width: 56rpx;
            height: 56rpx;
            border-radius: 28rpx;
          }
        }

        .useCount {
          font-size: 32rpx;
          font-family: Arial-BoldItalicMT, Arial;
          font-weight: normal;
          color: #333333;
          margin-right: 24rpx;
        }
      }
    }

    .loadmore {
      padding: 24rpx;
    }
  }

  .datas-top {
    // top: 365rpx;
  }

  // 隐私弹窗
  .popup {
    .title {
      padding-top: 48rpx;
      font-size: 40rpx;
      font-family: PingFang SC-Bold, PingFang SC;
      font-weight: bold;
      color: #333333;
      text-align: center;
    }

    .main-text {
      font-size: 32rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 48rpx;
      width: 528rpx;
      margin-left: 48rpx;
      margin-top: 28rpx;
      height: 620rpx;
      overflow-y: auto;
    }

    .agreement {
      width: 528rpx;
      margin-left: 48rpx;
      margin-top: 24rpx;
      font-size: 24rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      line-height: 36rpx;
      color: #333333;

      .agreement-text {
        color: #0e4a86;
      }
    }

    .agree-btn {
      margin-top: 16rpx;
      width: 528rpx;
      height: 104rpx;
      background: #0e4a86;
      border-radius: 52rpx 52rpx 52rpx 52rpx;
      line-height: 104rpx;
      font-size: 32rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      text-align: center;
      margin-left: 48rpx;
    }

    .unagree-btn {
      background: #ffffff;
      color: #999999;
    }
  }

  // 分享弹窗
  .pop-up-scan-mask {
    z-index: 1000;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 0rpx;
    left: 0rpx;

    .pop-up-scan {
      width: 600rpx;
      height: 800rpx;
      z-index: 2000;
      background: no-repeat;
      background-size: 100%;
      margin-top: 300rpx;

      .pop-up-scan-img {
        width: 460rpx;
        height: 104rpx;
        margin-top: 192rpx;
      }

      .name {
        height: 60rpx;
        background: rgba(0, 0, 0, 0.35);
        border-radius: 36rpx 36rpx 36rpx 36rpx;
        border: 2rpx solid #707070;
        font-size: 30rpx;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: bold;
        color: #ff5b00;
        line-height: 60rpx;
        text-align: center;
        padding: 0 46rpx;
        margin-top: 40rpx;
      }

      .text-preferential {
        font-size: 30rpx;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: bold;
        color: #ffffff;
        margin-top: 28rpx;
      }

      .money {
        font-size: 60rpx;
        font-family: DINPro-Bold, DINPro;
        font-weight: bold;
        color: #ff0000;
        -webkit-text-stroke: 1px #ffffff;
        text-transform: 1px #ffffff;
      }

      .money2 {
        font-size: 30rpx;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: bold;
        color: #ffffff;
        text-decoration: line-through;
        text-decoration-style: solid;
      }

      .btn {
        width: 440rpx;
        height: 92rpx;
        font-size: 40rpx;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: bold;
        color: #ffffff;
        line-height: 92rpx;
        text-align: center;
        margin-top: 72rpx;
        background: linear-gradient(180deg, #016cc8 0%, #004b8b 100%);
        box-shadow: 0rpx 6rpx 12rpx 2rpx #0a336f,
          inset 0rpx 10rpx 12rpx 2rpx rgba(255, 255, 255, 0.21);
        border-radius: 48rpx 48rpx 48rpx 48rpx;
      }

      .close {
        width: 64rpx;
        height: 64rpx;
        position: relative;
        top: 100rpx;
      }
    }
  }
}
</style>