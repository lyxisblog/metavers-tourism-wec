<!--
 * @Author: 王璇 xuan.wang@vonechain.com
 * @Date: 2023-10-20 09:53:40
 * @LastEditors: 王璇 xuan.wang@vonechain.com
 * @LastEditTime: 2024-01-12 17:21:23
 * @FilePath: /metaverse-tourism-h5/src/pagesPerson/wallet/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <view
      class="navbar"
      :style="'padding-top:' + statusHeight +'px;'"
    >
      <view class="navbar-box">
        <view
          class="left"
          @click="customBack"
        >
          <img
            style="width:16px;height:16px;"
            src="@a/images/goback_baise.svg"
          >
        </view>
        <view class="navbar-title">
          <view>收益</view>
          <view style="margin-top: 3px">
            <img
              style="width:18px;height:18px;margin-left:5px;"
              src="@a/wallet/wenhao.png"
              alt=""
              @click="checkPrivacy"
            >
          </view>
        </view>
      </view>
      <view class="card">
        <view class="card-top">
          <view class="card-top-left">
            累计金额
          </view>
        </view>
        <view class="card-min flex-between">
          <view class="card-min-left">
            <span>{{ incomeInfoData.totalWithdrawBalance | splitValue(0) }}</span>
            <span style="font-size:14px">.{{ incomeInfoData.totalWithdrawBalance | splitValue(1) }}</span>
          </view>
          <!-- <view
            class="card-min-right"
            @click="gotoApp"
          >
            去提现
          </view> -->
        </view>
        <view style="padding: 0 23px">
          <view class="cell" />
        </view>
        <view class="card-bottom flex-between">
          <view class="card-bottom-left">
            累计收益
          </view>
          <view class="card-bottom-right">
            <span>{{ incomeInfoData.totalBalance | splitValue(0) }}</span>
            <span style="font-size:14px">.{{ incomeInfoData.totalBalance | splitValue(1) }}</span>
          </view>
        </view>
      </view>
    </view>

    <view class="content">
      <!-- 正文内容 -->
      <view class="content-main">
        <view
          class="content-main-tap flex-between"
          :class="{'bgc': currntTap === 'YAO', 'bgc1': currntTap !== 'YAO' }"
        >
          <view
            :class="{ 'tap-title': true, 'tap-title-action': currntTap === 'YAO' }"
            @click="changeTap('YAO')"
          >
            邀请记录
          </view>
          <view
            :class="{ 'tap-title': true, 'tap-title-action': currntTap === 'ZI' }"
            @click="changeTap('ZI')"
          >
            资金记录
          </view>
        </view>
        <FundList
          v-show="currntTap === 'ZI'"
          ref="FundList"
        />
        <InviteList
          v-show="currntTap === 'YAO'"
          ref="InviteList"
        />
      </view>
    </view>
    <!-- <u-modal
      v-model="show"
      :content="content"
      show-cancel-button
    /> -->
  </view>
</template>
<script>
import FundList from './fundList'
import InviteList from './inviteList'
import { incomeInfo } from '@i/person'
export default {
  components: { FundList, InviteList },
  data() {
    return {
      statusHeight: 50,
      currntTap: 'YAO',
      show: false,
      // content: '请下载游历星河APP操作提现',
      incomeInfoData: {}
    }
  },
  onLoad() {
    this.getincomeInfo()
  },
  methods: {
    // 获取钱包信息
    getincomeInfo() {
      const res = wx.getMenuButtonBoundingClientRect()
      const statusHeight = res.top //胶囊距离顶部
      // const navHeight = res.height //胶囊高度
      this.statusHeight = statusHeight - 8
      incomeInfo().then(res => {
        console.log(res)
        this.incomeInfoData = res
        this.$refs.InviteList.getIncomeRecord()
      })
    },
    checkPrivacy() {
      uni.navigateTo({
        url: '/pages/webview/index?url=' + 'https://meta-gateway.shengydt.com/api/front/login/getHtml/gzsm'
      })
    },
    customBack() {
      uni.switchTab({
        url: '/pages/user/user'
      })
    },
    changeTap(type) {
      this.currntTap = type
      if( type === 'ZI') {
        this.$refs.FundList.withdrawRecordList = []
        this.$refs.FundList.getwithdrawRecord(1)
      } else {
        this.$refs.InviteList.incomeRecordList = []
        this.$refs.InviteList.getIncomeRecord(1)
      }
    }
    // gotoApp() {
    //   this.show = true
    // }
  }
}
</script>

<style lang="scss" scoped>
  .navbar{
    background: url('https://metaverse-uni.oss-cn-shanghai.aliyuncs.com/file/wechat/walletbgc.png') no-repeat;
    background-size: 100% 100%;
    height:337px;
    padding: 44px 16px 0px 16px;

    .navbar-box{
      display: flex;
      height: 44px;
      line-height: 44px;
      align-items: center;

      color: #fff;
      font-size: 18px;
      .navbar-title{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
      }
    }
    .card{
      height: 167px;
      background: url('../../static/wallet/mask.png') no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
      background-color: #fff;
      border-radius: 12px;
      .cell {
        border-bottom: 1rpx solid #F7F8F9;
        padding: 10px 16px;
      }
      .card-top{
        display: flex;
        justify-content: space-between;
        padding: 23px 23px 20px 23px;
      }
      .card-min{
        padding: 0 23px;
        .card-min-left {
          font-size: 18px;
          font-family: DIN-Bold, DIN;
          font-weight: bold;
          color: #C97E18;
        }
        .card-min-right{
          font-size: 14px;
          font-weight: 500;
          color: #0E4A86;
          margin-right: 20px;
          position: relative;
          &::after{
            content: "";
            width: 0px;
            height: 0px;
            position: absolute;
            border-top:solid 6px transparent;
            border-left:solid 6px #0E4A86 ;
            border-bottom:solid 6px transparent;
            top: 6px;
            right: -10px;
          }
        }
      }
      .card-bottom{
        padding: 13px 23px;
        .card-bottom-right{
          font-size: 16px;
          font-family: DIN-Bold, DIN;
          font-weight: bold;
          color: #C97E18;
        }

      }
    }
  }
  .content{
    position: relative;
    padding: 0 16px;
    top: -56px;
    .content-main{
      background-color: #fff;
      border-radius: 12px;
      .bgc{
        background:url('https://metaverse-uni.oss-cn-shanghai.aliyuncs.com/file/wechat/btnbgc.png') no-repeat center center;
        background-size: 100% 100%;
      }
      .bgc1{
        background:url('https://metaverse-uni.oss-cn-shanghai.aliyuncs.com/file/wechat/btnbgc1.png') no-repeat center center;
        background-size: 100% 100%;
      }
      .content-main-tap{
        height: 56px;
        line-height: 56px;
        font-size: 16px;
        color: #999999;
        .tap-title{
          flex:1;
          text-align: center;
        }
        .tap-title-action{
          color: #0E4A86;
        }
      }
    }
  }


</style>