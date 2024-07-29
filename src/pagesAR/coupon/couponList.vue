<template>
  <view class="couponList">
    <!-- tabs -->
    <view class="tabs flex-between">
      <view
        class="tab flex-v"
        :class="tabType == 0 ? 'tab-select' : ''"
        @click="changeTabs(0)"
      >
        <view>可领优惠劵</view>
        <view
          v-if="tabType == 0"
          class="hr"
        />
      </view>
      <view
        class="tab flex-v"
        :class="tabType == 1 ? 'tab-select' : ''"
        @click="changeTabs(1)"
      >
        <view>已领优惠劵</view>
        <view
          v-if="tabType == 1"
          class="hr"
        />
      </view>
    </view>
    <!-- 缺省页 -->
    <view
      v-if="coupntList.length == 0"
      class="no-datas flex-v"
    >
      <img
        src="../../static/images/coupon_default.png"
        class="no-datas-img"
      >
      <view class="no-datas-text">
        暂无优惠劵
      </view>
    </view>
    <!-- 数据 -->
    <scroll-view
      v-if="coupntList.length"
      scroll-y="true"
      class="datas"
      refresher-enabled="true"
      :refresher-triggered="triggered"
      @refresherrefresh="fresh"
      @scrolltolower="pageTurning"
    >
      <u-collapse>
        <view
          v-for="item in coupntList"
          :key="item.id"
          class="data"
        >
          <!-- 卡片 -->
          <view class="card flex-middle">
            <!-- 左边金额折扣部分 -->
            <view
              class="img flex-v"
              :style="'background-image: url('+ item.merAvatar +');'"
            >
              <view
                class="text flex-v"
              >
                <view class="money">
                  <span class="num">{{ item.couponType === 0 ? item.discount : item.discountAmount }}</span>
                  <span class="unit">{{ item.couponType === 0 ? '折' : '元' }}</span>
                </view>
                <view class="type">
                  {{ item.couponType === 0 ? '折扣券' : '现金券' }}
                </view>
              </view>
            </view>
            <!-- 卡片简介 -->
            <view
              class="blurb"
            >
              <img
                v-if="tabType == 1"
                class="used"
                src="@a/images/used.svg"
              >
              <view class="useScope-label">
                {{ tabType == 0 ? '' : '截止时间:' + item.effectiveEnd }}
              </view>
              <view class="useScope-value">
                <!-- <span v-if="tabType == 0">{{ item.useScope === 0 ? '景区门市票' : item.useScope === 1 ? '景区自营二消' : item.useScope === 2 ? '第三方商户' : '未知' }}</span> -->
                <!-- <span v-if="tabType == 0">{{ item.useScopeDescribe }}</span> -->
                <span>{{ item.couponName }}</span>
              </view>
              <view class="dashed" />
              <view class="blurb-bottom flex-between">
                <view class="collapse">
                  <u-collapse-item
                    title="详情信息"
                    :index="item.id"
                    @change="collapseChange"
                  />
                </view>
                <view
                  class="btn"
                  @click="receiceCoupon(item.id)"
                >
                  {{ tabType == 0 ? '立即领取' : '立即使用' }}
                </view>
              </view>
            </view>
          </view>
          <!-- 说明 -->
          <view
            v-show="item.show"
            class="illustrate"
          >
            <view class="title">
              优惠券说明
            </view>
            <view class="text">
              1.使用范围：{{ item.useScopeDescribe }}
            </view>
            <view
              v-if="tabType == 0"
              class="text"
            >
              2.有效期：{{ item.useTerm === 0 ? item.effectiveStart + '至' + item.effectiveEnd : item.useTerm === 1 ? '领取后' + item.effectiveDays + '天内有效' : '' }}
            </view>
            <view
              v-if="tabType == 1"
              class="text"
            >
              2.有效期：{{ item.effectiveStart + '至' + item.effectiveEnd }}
            </view>
          </view>
        </view>
      </u-collapse>
    </scroll-view>
  </view>
</template>

<script>
import { getCouponList, receiceCoupon } from '../../api/guideMap'
export default {
  data(){
    return{
      scenicId:'',
      tabType:0,
      coupntList:[],
      triggered:false,
      limit: 10,
      page: 1,
      total: 0,
      totalPage: 0,
      blurb_back:'../../static/images/text_back.png',
      text_back:'/static/images/text_back.png'
    }
  },
  methods:{
    // 领取、使用优惠券
    receiceCoupon(id){
      const params ={
        id:id
      }
      if(this.tabType === 0){
        receiceCoupon(params).then(() => {
          uni.showToast({
            title: '领取成功',
            duration: 2000,
            type:'success'
          })
          this.getCouponList()
        })
      }else {
        this.goCouponDetails(id)
      }
    },
    // 跳转到优惠券详情
    goCouponDetails(id){
      uni.navigateTo({
        url: '/pagesAR/coupon/couponDetails?id=' + id
      })
    },
    // 折叠面板切换
    collapseChange(row){
      for (const item of this.coupntList) {
        if(item.id === row.index){
          this.$set(item, 'show', row.show)
          // item.show = row.show
        }else{
          this.$set(item, 'show', false)
        }
      }
    },
    // 下拉刷新
    fresh() {
      this.triggered = true
      this.limit = 10
      this.page = 1
      this.getCouponList()
    },
    // 翻页
    pageTurning() {
      if (this.page >= this.totalPage) return
      this.limit = this.limit + 10
      this.getCouponList()
    },
    // 切换tabs
    changeTabs(tabType){
      if(this.tabType === tabType) return
      this.tabType = tabType
      this.coupntList = []
      this.limit = 10
      this.page = 1
      this.total = 0
      this.totalPage = 0
      this.getCouponList()
    },
    // 获取优惠券列表数据
    getCouponList(){
      const params = {
        scenicId:this.scenicId,
        tabType:this.tabType,
        limit:this.limit,
        page:this.page
      }
      getCouponList(params).then(res => {
        this.coupntList = res.list
        this.limit = res.limit
        this.page = res.page
        this.total = res.total
        this.totalPage = res.totalPage
        this.triggered = false
      })
    }
  },
  onLoad (options) {
    this.scenicId = options.scenicId
    this.getCouponList()
  }
}
</script>

<style lang="scss">
.couponList{
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
  // 缺省页
  .no-datas {
    .no-datas-img {
      margin-top: 192rpx;
      width: 412rpx;
      height: 300rpx;
    }
    .no-datas-text {
      margin-top: 32rpx;
      font-size: 32rpx;
      font-family: PingFangSC, PingFang SC;
      font-weight: bold;
      color: #999999;
    }
  }
  // 数据
  .datas {
    position: fixed;
    top: 100rpx;
    bottom: 0rpx;
    .data {
      width: 686rpx;
      min-height: 248rpx;
      margin-left: 32rpx;
      margin-top: 48rpx;
      border-radius: 58rpx;
      padding: 8rpx 0rpx 8rpx 2rpx;
      background-color: #FEF1E3;
      // 卡片
      .card {
        width: 684rpx;
        height: 232rpx;
        border-radius: 58rpx;
        overflow: hidden;
        // 左边金额折扣部分
        .img {
          position: relative;
          left: 6rpx;
          width: 250rpx;
          height: 232rpx;
          background-size: contain;
          .text {
            background-image: url(../../static/images/blurb_back.png);
            color: #FEFEDE;
            margin-top: 46rpx;
            width: 186rpx;
            height: 156rpx;
            background-size: 100%;
            .money {
              margin-top: 18rpx;
              .num{
                font-size: 48rpx;
                font-family: PingFangSC, PingFang SC;
                font-weight: 600;
                color: #FEFEDE;
              }
              .unit {
                font-size: 24rpx;
                font-family: PingFangSC, PingFang SC;
                font-weight: 400;
                color: #FEFEDE;
              }
            }
            .type {
              margin-top: 6rpx;
              font-size: 28rpx;
              font-family: PingFangSC, PingFang SC;
              font-weight: 500;
              color: #FEFEDE;
            }
          }
        }
        // 卡片简介
        .blurb {
          background-image: url(../../static/images/text_back.png);
          position: relative;
          width: 481rpx;
          height: 232rpx;
          color: #FDFFA8;
          font-family: PingFangSC, PingFang SC;
          padding-left: 32rpx;
          background-size: cover;
          right: 8rpx;
          .used {
            position: absolute;
            right: 16rpx;
            width: 92rpx;
            height: 92rpx;
            top: 14rpx;
          }
          .useScope-label {
            font-size: 24rpx;
            font-weight: 400;
            margin-top: 24rpx;
            height: 30rpx;
          }
          .useScope-value {
            font-size: 28rpx;
            font-weight: 600;
            margin-top: 6rpx;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 400rpx;
          }
          .dashed {
            border-bottom: 2rpx dashed #FDFFA8;
            width: 344rpx;
            height: 1rpx;
            margin-top: 22rpx;
          }
          .blurb-bottom {
            margin-top: 30rpx;
            .collapse {
              .u-collapse-head {
                font-size: 24rpx;
                font-family: SourceHanSansCN, SourceHanSansCN;
                font-weight: 400;
                color: #FEFEDE;
                .u-icon__icon {
                  color: #FEFEDE !important;
                  font-size: 24rpx !important;
                }
              }
            }
            .btn {
              width: 136rpx;
              height: 56rpx;
              background: #FEFEDE;
              border-radius: 28rpx;
              font-size: 24rpx;
              font-family: PingFangSC, PingFang SC;
              font-weight: 600;
              color: #FE8427;
              text-align: center;
              line-height: 56rpx;
              margin-right: 46rpx;
            }
          }
        }
      }
      .illustrate {
        .title {
          text-align: center;
          font-size: 28rpx;
          font-family: PingFangSC, PingFang SC;
          font-weight: bold;
          color: #333333;
          margin-top: 20rpx;
        }
        .text {
          margin-left: 32rpx;
          margin-right: 32rpx;
          margin-top: 20rpx;
          font-size: 24rpx;
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          color: #333333;
        }
        .text:last-child{
          margin-bottom: 20rpx;
        }
      }
    }
  }
}
</style>