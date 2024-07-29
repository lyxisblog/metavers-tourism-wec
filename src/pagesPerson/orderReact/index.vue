<template>
  <view class="orderReeat">
    <!-- tabs -->
    <view class="tabs flex-between">
      <view
        class="tab flex-v"
        :class="orderType == 0 ? 'tab-select' : ''"
        @click="changeTabs(0)"
      >
        <view>支付订单</view>
        <view
          v-if="orderType == 0"
          class="hr"
        />
      </view>
      <view
        class="tab flex-v"
        :class="orderType == 1 ? 'tab-select' : ''"
        @click="changeTabs(1)"
      >
        <view>激活记录</view>
        <view
          v-if="orderType == 1"
          class="hr"
        />
      </view>
    </view>
    <!-- 数据 -->
    <scroll-view
      scroll-y="true"
      class="datas"
      @scrolltolower="pageTurning"
    >
      <!-- 缺省页 -->
      <view
        v-if="orderList.length == 0"
        class="no-data flex-v"
      >
        <img
          v-if="orderType == 0"
          src="../../static/images/no_data_pay.svg"
          class="no-data-img"
        >
        <view
          v-if="orderType == 0"
          class="text"
        >
          暂无订单记录
        </view>
        <img
          v-if="orderType == 1"
          src="../../static/images/no_data_active.svg"
          class="no-data-img"
        >
        <view
          v-if="orderType == 1"
          class="text"
        >
          暂无激活记录
        </view>
      </view>
      <view
        v-for="item in orderList"
        :key="item.payNo"
        class="data"
      >
        <!-- 激活logo -->
        <view
          v-if="orderType == 1"
          class="activation"
        >
          <img
            v-if="item.complexStatus == 2"
            src="../../static/images/active.svg"
            class="logo"
          >
          <img
            v-if="item.complexStatus == 5"
            src="../../static/images/out_date.svg"
            class="logo"
          >
          <img
            v-if="item.complexStatus == 4"
            src="../../static/images/expired.svg"
            class="logo"
          >
        </view>
        <!-- 订单编号 -->
        <view class="top flex-between">
          <view class="pay-no">
            订单编号：{{ item.payNo }}
          </view>
          <view
            v-if="orderType == 0"
            class="complex-status"
            :class="item.complexStatus == 1 ? 'green' : item.complexStatus == 2 ? 'red' : '' "
          >
            {{ item.complexStatusMsg }}
          </view>
        </view>
        <!-- 图片 -->
        <view class="middle flex-middle">
          <view class="sattDir">
            <img
              :src="item.sattDir"
              class="img"
            >
          </view>
          <view class="right">
            <view class="name">
              {{ item.scenicName }}
            </view>
            <view
              class="money"
            >
              <view v-if="orderType == 0">
                ￥{{ item.amount }}
              </view>
            </view>
          </view>
        </view>
        <!-- 分割线 -->
        <view class="hr" />
        <!-- 查看详情 -->
        <view class="bottom flex-between">
          <view class="time">
            {{ orderType == 0 ? '创建时间：' + item.orderCreateTime : orderType == 1 ? '激活时间：' + item.payTime : '' }}
          </view>
          <view
            class="btn"
            @click="goDetails(item.id)"
          >
            查看详情
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { getFrontOrderPage } from '../../api/api'
export default {
  data(){
    return{
      orderType:0,
      orderList:[],
      status:'loading',
      // 分页
      limit:3,
      page:1,
      total:0,
      totalPage:0
    }
  },
  onLoad(){
    this.getFrontOrderPage()
  },
  methods:{
    // 跳转到详情页
    goDetails(id){
      uni.navigateTo({
        url: '/pagesPerson/orderReact/details?id=' + id +'&orderType=' + this.orderType
      })
    },
    // 翻页
    pageTurning(){
      if(this.page>=this.totalPage) return
      this.status = 'loading'
      this.page = ++ this.page
      this.getFrontOrderPage()
    },
    // 获取数据
    getFrontOrderPage(){
      const parmas = {
        limit:this.limit,
        page:this.page,
        orderType:this.orderType
      }
      getFrontOrderPage(parmas).then(res => {
        console.log(res)
        this.orderList.push(...res.list)
        this.limit = res.limit
        this.page = res.page
        this.total = res.total
        this.totalPage = res.totalPage
        if(this.page >= this.totalPage) {
          this.status = 'nomore'
        }else {
          this.status = 'loadmore'
        }
      })
    },
    // 切换tabs
    changeTabs(orderType){
      if(this.orderType === orderType) return
      this.orderType = orderType
      this.orderList = []
      this.limit = 3
      this.page = 1
      this.total = 0
      this.totalPage = 0
      this.getFrontOrderPage()
    }
  }
}
</script>

<style lang="scss" scoped>
.orderReeat {
  background: #F7F7F7;
  width: 750rpx;
  height: 100vh;
  // tabs
  .tabs {
    width: 750rpx;
    height: 100rpx;
    background-color: #FFFFFF;
    .tab{
      font-size: 34rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #999999;
      height: 50rpxrpx;
      .hr{
        width: 60rpx;
        height: 8rpx;
        background: #004B8B;
        border-radius: 4rpx 4rpx 4rpx 4rpx;
        margin-top: 4rpx;
      }
    }
    .tab:first-child{
      margin-left: 92rpx;
    }
    .tab:last-child{
      margin-right: 92rpx;
    }
    .tab-select {
      font-weight: 800;
      color: #333333;
      margin-top: 10rpx;
    }
  }
  // 数据
  .datas {
    width: 750rpx;
    overflow-y: auto;
    position: absolute;
    bottom: 0rpx;
    top: 100rpx;
    .no-data {
      width: 750rpx;
      height: 80vh;
      .no-data-img {
        width: 520rpx;
        height: 520rpx;
      }
      .text {
        font-size: 32rpx;
        font-family: PingFangSC-Medium-, PingFangSC-Medium;
        font-weight: normal;
        color: #333333;
      }
    }
    .data {
      position: relative;
      width: 686rpx;
      height: 360rpx;
      background: #FFFFFF;
      box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(0,0,0,0.03);
      border-radius: 20rpx 20rpx 20rpx 20rpx;
      margin-top: 32rpx;
      margin-left: 32rpx;
      padding: 0rpx 24rpx;
      .activation {
        position: absolute;
        right: 14rpx;
        top: 12rpx;
        .logo {
          width: 150rpx;
          height: 120rpx;
        }
      }
      // 订单编号
      .top {
        .pay-no {
          margin-top: 24rpx;
          font-size: 28rpx;
          font-family: PingFang SC-Bold, PingFang SC;
          font-weight: bold;
          color: #999999;
        }
        .complex-status {
          margin-top: 22rpx;
          font-size: 30rpx;
          font-family: PingFang SC-Heavy, PingFang SC;
          font-weight: 800;
        }
        .green {
          color: #30AA14;
        }
        .red {
          color: #FF0000;
        }
      }
      // 图片
      .middle {
        margin-top: 24rpx;
        .sattDir {
          .img {
            width: 180rpx;
            height: 136rpx;
          }
        }
        .right {
          margin-left: 20rpx;
          .name {
            width: 410rpx;
            height: 88rpx;
            font-size: 32rpx;
            font-family: PingFang SC-Bold, PingFang SC;
            font-weight: bold;
            color: #333333;
          }
          .money {
            height: 50rpx;
            width: 410rpx;
            font-size: 36rpx;
            font-family: PingFang SC-Bold, PingFang SC;
            font-weight: bold;
            color: #FF0000;
          }
        }
      }
      // 分割线
      .hr{
        width: 638rpx;
        height: 1rpx;
        background: #E8E8E8;
        margin-top: 26rpx;
      }
      // 查看详情
      .bottom {
        margin-top: 26rpx;
        .time {
          height: 36rpx;
          font-size: 26rpx;
          font-family: PingFang SC-Medium, PingFang SC;
          font-weight: 500;
          color: #999999;
        }
        .btn {
          width: 140rpx;
          height: 52rpx;
          border-radius: 10rpx 10rpx 10rpx 10rpx;
          border: 2rpx solid #707070;
          text-align: center;
          line-height: 52rpx;
        }
      }
    }
  }
}
</style>