<!--
 * @Author: 王璇 xuan.wang@vonechain.com
 * @Date: 2023-08-18 14:46:08
 * @LastEditors: 王璇 xuan.wang@vonechain.com
 * @LastEditTime: 2023-12-15 15:25:40
 * @FilePath: /metaverse-tourism-h5/src/ar/pay.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE

-->
<template>
  <view class="pay">
    <!-- 解锁方式 -->
    <view class="title">
      解锁方式
    </view>
    <!-- 在线支付 -->
    <view
      class="pay-online"
      @click="payOrActivaionChange(1)"
    >
      <view class="pay-online-tr flex-between">
        <view class="pay-online-tr-left flex-middle">
          <img
            class="img"
            src="@a/wallet/pay-online.png"
          >
          <view
            class="text"
            :class="payOrActivaion == 1 ? 'text-select' : ''"
          >
            在线支付
          </view>
        </view>
        <view class="pay-online-tr-right">
          <img
            v-if="payOrActivaion == 1"
            class="img"
            src="@a/wallet/selected.png"
          >
          <img
            v-else
            class="img"
            src="@a/wallet/not_selected.png"
          >
        </view>
      </view>
      <view
        v-if="payOrActivaion == 1"
        class="pay-meth"
      >
        <u-radio-group
          v-model="value"
          class="margin"
        >
          <view
            class="pay-meth-item"
            @click="change(0)"
          >
            <view
              class="pay-meth-item-left"
            >
              <img
                style="vertical-align: middle; margin-right: 16px"
                src="@a/wallet/bage.png"
                class="img"
                alt=""
              >
              <span style="vertical-align: middle">游历星河钱包（剩余￥{{ uerWallet }}）</span>
            </view>
            <view
              class="radio"
              @click="radioChange"
            >
              <u-radio
                :name="0"
                :disabled="!walletVsValue"
              />
            </view>
          </view>
          <view
            class="pay-meth-item"
            @click="change(1)"
          >
            <view
              class="pay-meth-item-left"
            >
              <img
                style="vertical-align: middle; margin-right: 16px"
                src="@a/wallet/weipay.png"
                class="img"
                alt=""
              >
              <span style="vertical-align: middle">微信支付</span>
            </view>
            <view class="radio">
              <u-radio :name="1" />
            </view>
          </view>
        </u-radio-group>
      </view>
    </view>
    <!-- 激活 -->
    <view
      class="pay-activation"
      @click="payOrActivaionChange(2)"
    >
      <view class="pay-online-tr flex-between">
        <view class="pay-online-tr-left flex-middle">
          <img
            class="img"
            src="@a/wallet/activation.png"
          >
          <view
            class="text"
            :class="payOrActivaion == 2 ? 'text-select' : ''"
          >
            激活码激活
          </view>
        </view>
        <view class="pay-online-tr-right">
          <img
            v-if="payOrActivaion == 2"
            class="img"
            src="@a/wallet/selected.png"
          >
          <img
            v-else
            class="img"
            src="@a/wallet/not_selected.png"
          >
        </view>
      </view>
      <view
        v-if="payOrActivaion == 2"
        class="activation flex-middle"
      >
        <view class="lable">
          激活码：
        </view>
        <view>
          <u-input
            v-model="activityCode"
            class="activation-input"
            placeholder="请输入激活码"
            type="number"
          />
        </view>
      </view>
    </view>
    <!-- 激活说明 -->
    <view
      v-if="payOrActivaion == 2"
      class="activation-illustrate"
    >
      <view class="title">
        - 使用说明 -
      </view>
      <view class="text">
        1、请确认您选择激活的AR景区与您购买的景区一致；
      </view>
      <view class="text">
        2、请在输入框内填写您获取到的激活码进行激活操作；
      </view>
      <view class="text">
        3、激活后可在有效期内免费使用对应景区的AR产品；
      </view>
      <view class="text">
        4、请您合理安排游玩时间，避免过期影响您的游玩体验。
      </view>
    </view>
    <!-- 在线支付说明或按钮 -->
    <view
      v-if="payOrActivaion == 1"
      class="online-bottom"
    >
      <!-- 说明 -->
      <view class="online-illustrate">
        <view class="text">
          AR导览产品属于虚拟数字商品
        </view>
        <view class="text">
          非实物本商品一经售出，不支持退货
        </view>
      </view>
      <view class="online-btnView flex-between">
        <!-- 价格 -->
        <view class="price">
          <view class="flex-middle">
            <view class="price-number-text">
              AR价格
            </view>
            <view
              v-if="priceData.lineAmountAndroid && priceData.lineAmountAndroid !== '0.00' "
              class="pricer-line"
            >
              <span class="price-number-line">原价：¥</span><span class="price-number-line">{{ priceData.lineAmountAndroid }}</span>
            </view>
          </view>
          <view class="top">
            <view>
              <span class="price-number-icon">¥</span><span class="price-number-price">{{ priceData.amount }}</span>
            </view>
          </view>
        </view>
        <view
          class="online-btn"
          @click="payMethod"
        >
          去支付
        </view>
      </view>
    </view>
    <!-- 激活按钮 -->
    <view
      v-if="payOrActivaion == 2"
      class="activation-btn"
      @click="codeActivate"
    >
      立即激活
    </view>
    <u-toast ref="uToast" />
    <u-modal
      ref="uModal"
      v-model="show"
      :content="content"
      :async-close="true"
      @confirm="cansle"
    />
  </view>
</template>
<script>
import { getPrice, queryPayCmb, createOrder, codeActivate } from '@i/api'
import { getUserWalletBalance } from '@i/person'

export default {
  data() {
    return {
      activityCode:'',
      payOrActivaion:1, // 支付或激活 1支付 2激活
      value: null,
      scenicId: '',
      priceData: {},
      flag: false,
      payNo: '',
      timener: null,
      show: false,
      content: '取消未支付订单',
      uerWallet: '0.00'
    }
  },
  computed: {
    walletVsValue() {
      return this.uerWallet - this.priceData.amount >= 0
    }
  },
  methods: {
    // 激活
    codeActivate(){
      const params = {
        activityCode: this.activityCode,
        payChannel: 3,
        payTerminal: 3,
        scenicId: this.scenicId,
        payPosition: 0
      }
      codeActivate(params).then(res => {
        if (res) {
          uni.showToast({
            title: '激活成功',
            duration: 2000
          })
          uni.navigateBack()
        }
      })
    },
    // 更改支付方式 1支付 2激活
    payOrActivaionChange(type){
      this.payOrActivaion = type
    },
    change(name) {
      this.value = name
      if(name === 0) {
        this.radioChange()
      }
    },
    radioChange() {
      if(!this.walletVsValue) {
        uni.showToast({
          title: '余额不足',
          duration: 2000,
          icon:'none'
        })
      }
    },
    showMaskFun(scenicId) {
      getPrice({ scenicId, payTerminal: 2 }).then((res) => {
        console.log('res', res)
        const { scenicName, amount, payNo, lineAmountAndroid } = res
        this.priceData = {
          scenicName,
          amount,
          payNo,
          lineAmountAndroid
        }
      })
    },
    // 获取用户余额
    getUserWalletBalanceFun() {
      getUserWalletBalance().then((res) => {
        this.uerWallet = res
        console.log('res', res)
      })

    },
    // 创建订单
    createOrderFun(scenicId, type) {
      createOrder({
        scenicId,
        payTerminal: 3,
        payChannel: type
      }).then((res) => {
        console.log(res, '接口')
        this.payNo = res.payNo
        if(type === 0) {
          this.goToMin2(res.param, res.payNo)
        } else {
          uni.showToast({
            title: '支付成功',
            duration: 2000,
            icon: 'success',
            success: () => {
              setTimeout(() => {
                uni.navigateBack()
              }, 1000)
            }
          })
        }
      })
    },
    goToMin2(data, payNo) {
      wx.requestPayment({
        ...data,
        success() {
          console.log(payNo, '成功')
          uni.showToast({
            title: '支付成功',
            duration: 2000,
            icon: 'success',
            success: () => {
              setTimeout(() => {
                uni.navigateBack()
              }, 1000)
            }
          })
          // 支付成功
          // uni.navigateTo({
          //   url: `/pagesA/active/index?state=0&payNo=${payNo}`
          // })
        },
        fail(res) {
          console.log(res, '失败')
          uni.showToast({
            title: '支付失败',
            duration: 2000,
            icon: 'error'
          })
        }
      })
    },
    // 支付方式
    payMethod() {
      if (this.value === 0 ) {
        if(!this.walletVsValue) {
          uni.showToast({
            title: '余额不足',
            duration: 2000,
            icon: 'error'
          })
        } else {
          this.createOrderFun(this.scenicId, 4)
        }
      } else if (this.value === 1) {
        this.createOrderFun(this.scenicId, 0)
      }
    },
    // 查询订单状态
    queryPayCmb() {
      const params = {
        payNo: this.payNo
      }
      queryPayCmb(params).then((res) => {
        if (res.status === 1) {
          uni.reLaunch({
            url: '/ar/index'
          })
        }
      })
    },
    // 关闭查询
    cansle() {
      queryPayCmb({ payNo: this.payNo }).then((res) => {
        this.show = false
        if (res.status === 1) {
          this.show = false
          uni.reLaunch({
            url: '/ar/index'
          })
        }
      })
    }
  },
  onLoad(options) {
    this.scenicId = options.scenicId
    this.showMaskFun(this.scenicId)
    this.getUserWalletBalanceFun()
  },
  onShow() {
    if (this.payNo) {
      this.queryPayCmb()
    }
  }
}
</script>
<style lang="scss" scoped>

.pay {
  padding: 16px;
  min-height: 100vh;
  .title {
    font-size: 32rpx;
    font-family: Source Han Sans CN, Source Han Sans CN;
    font-weight: 400;
    color: #999999;
    line-height: 46rpx;
    margin-left: 64rpx;
    margin-bottom: 20rpx;
    margin-top: 64rpx;
  }
  // 在线支付
  .pay-online{
    width: 686rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(152,150,150,0.16);
    border-radius: 20rpx 20rpx 20rpx 20rpx;
    .pay-online-tr {
      border-bottom: 2rpx solid #F5F5F5;
      padding-top: 40rpx;
      padding-bottom: 40rpx;
      .pay-online-tr-left {
        .img {
          width: 52rpx;
          height: 52rpx;
          margin-left: 32rpx;
        }
        .text {
          font-size: 36rpx;
          font-family: Source Han Sans CN, Source Han Sans CN;
          font-weight: bold;
          color: #333333;
          margin-left: 20rpx;
        }
        .text-select {
          color: #0E4A86;
        }
      }
      .pay-online-tr-right {
        .img {
          width: 40rpx;
          height: 40rpx;
          margin-right: 32rpx;
        }
      }
    }
    .pay-meth {
      width: 100%;
      padding-left: 86rpx;
      .pay-meth-title {
        font-size: 16px;
        font-weight: normal;
        color: #333333;
        margin-top: 8px;
      }
      .pay-meth-item {
        display: flex;
        justify-content: space-between;
        padding-top: 40rpx;
        padding-bottom: 40rpx;
        border-bottom: 1rpx solid #F5F5F5;
        margin-right: 32rpx;
        .u-radio__icon-wrap--disabled {
          background-color: #ffffff !important;
        }
        .pay-meth-item-left {
          font-size: 14px;
          font-weight: normal;
          color: #333333;
        }
        .radio {
          width: 19px;
          height: 19px;
        }
      }
      .img {
        width: 24px;
        height: 24px;
      }
    }
  }
  // 激活
  .pay-activation{
    width: 686rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(152,150,150,0.16);
    border-radius: 20rpx 20rpx 20rpx 20rpx;
    margin-top: 32rpx;
    .pay-online-tr {
      border-bottom: 2rpx solid #F5F5F5;
      padding-top: 40rpx;
      padding-bottom: 40rpx;
      .pay-online-tr-left {
        .img {
          width: 52rpx;
          height: 52rpx;
          margin-left: 32rpx;
        }
        .text {
          font-size: 36rpx;
          font-family: Source Han Sans CN, Source Han Sans CN;
          font-weight: bold;
          color: #333333;
          margin-left: 20rpx;
        }
        .text-select {
          color: #0E4A86;
        }
      }
      .pay-online-tr-right {
        .img {
          width: 40rpx;
          height: 40rpx;
          margin-right: 32rpx;
        }
      }
    }
    .activation {
      padding-top: 40rpx;
      padding-bottom: 40rpx;
      .lable {
        font-size: 32rpx;
        font-family: Source Han Sans CN, Source Han Sans CN;
        font-weight: bold;
        color: #333333;
        margin-left: 32rpx;
      }
    }
  }
  // 激活说明
  .activation-illustrate {
    width: 686rpx;
    background: #FFFCE9;
    border-radius: 20rpx 20rpx 20rpx 20rpx;
    font-size: 24rpx;
    font-family: Source Han Sans CN, Source Han Sans CN;
    padding-top: 32rpx;
    padding-bottom: 32rpx;
    margin-top: 40rpx;
    .title {
      font-weight: bold;
      color: #B5A855;
      margin-left: 0rpx;
      margin-top: 0rpx;
      text-align: center;
    }
    .text {
      font-weight: 400;
      color: #B5A855;
      line-height: 40rpx;
      margin-left: 40rpx;
      margin-bottom: 1rpx;
    }
  }
  // 在线支付说明或按钮
  .online-bottom {
    width: 686rpx;
    background: #FFFCE9;
    border-radius: 20rpx 20rpx 88rpx 88rpx;
    position: absolute;
    bottom: 32rpx;
    left: 32rpx;
    .online-illustrate {
      padding: 20rpx 0rpx;
      .text {
        font-size: 24rpx;
        font-family: Source Han Sans CN, Source Han Sans CN;
        font-weight: 400;
        color: #B5A855;
        line-height: 40rpx;
        text-align: center;
      }
    }
    .online-btnView {
      width: 686rpx;
      height: 160rpx;
      background: #FFFFFF;
      border-radius: 88rpx 88rpx 88rpx 88rpx;
      .price {
        margin-left: 40rpx;
        padding-top: 28rpx;
        .price-number-text {
          width: 84rpx;
          height: 36rpx;
          font-size: 20rpx;
          background-color: red;
          font-family: Source Han Sans CN, Source Han Sans CN;
          font-weight: 400;
          color: #FFFFFF;
          border-radius: 20rpx 20rpx 20rpx 0rpx;
          text-align: center;
          line-height: 36rpx;
        }
        .pricer-line{
            font-size: 20rpx;
            text-decoration: line-through;
            color: #999999;
            margin-left: 8rpx;
          }
        .top {
          font-size: 64rpx;
          font-family: Source Han Sans CN, Source Han Sans CN;
          font-weight: bold;
          color: #0E4A86;
          .price-number-icon {
            font-size: 40rpx;
          }
        }
      }
      .online-btn {
        width: 236rpx;
        height: 96rpx;
        background: #0E4A86;
        border-radius: 62rpx 62rpx 62rpx 62rpx;
        font-family: PingFangSC-Medium, PingFangSC-Medium;
        font-weight: normal;
        color: #FFFFFF;
        text-align: center;
        line-height: 96rpx;
        margin-right: 20rpx;
      }
    }
  }
  .activation-btn {
    position: absolute;
    bottom: 64rpx;
    left: 32rpx;
    width: 343px;
    height: 48px;
    background: #0e4a86;
    border-radius: 24px;
    font-size: 16px;
    color: #ffffff;
    line-height: 48px;
    text-align: center;
  }
}
::v-deep .u-radio-group {
  display: block;
}
</style>
