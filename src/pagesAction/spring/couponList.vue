<template>
  <view class="couponList11">
    <!-- 缺省页 -->
    <view
      v-if="centerResponseList.length == 0"
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

    <view class="datas">
      <u-collapse>
        <view
          v-for="(item, index) in centerResponseList"
          :key="index"
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
                class="used"
                src="../../static/images/used.svg"
              >
              <view class="useScope-label">
                {{ '截止时间:' + item.effectiveEnd }}
              </view>
              <view class="useScope-value">
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
                  {{ '立即使用' }}
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
              class="text"
            >
              2.有效期：{{ item.effectiveStart + '至' + item.effectiveEnd }}
            </view>
          </view>
        </view>
      </u-collapse>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    centerResponse: {
      type: Array,
      default: () => []
    }
  },
  data(){
    return{
      tabType:0,
      triggered:false,
      blurb_back:'../../static/images/text_back.png',
      text_back:'/static/images/text_back.png'
    }
  },
  computed: {
    centerResponseList: {
      get() {
        return this.centerResponse
      },
      set(val) {
        this.$emit('update:centerResponse', val)
      }
    }
  },
  methods:{
    // 折叠面板切换
    collapseChange(row){
      this.centerResponseList.map((item) => {
        if(item.id === row.index){
          this.$set(item, 'show', row.show)
        }else{
          this.$set(item, 'show', false)
        }
      })
      this.$forceUpdate()

    },
    receiceCoupon(id) {
      // 跳转到优惠券详情
      uni.navigateTo({
        url: '/pagesAR/coupon/couponDetails?id=' + id
      })
    }
  }

}
</script>

<style lang="scss">

.couponList11{
  max-height: 1454rpx;
  overflow-y: auto;
  margin-top: 30rpx;
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
    display: flex;
    /* justify-content: center; */
    align-items: center;
    flex-direction: column;
    margin-top: 28rpx;
    .data {
      flex-direction: column;
      width: 654rpx;
      min-height: 248rpx;
      border-radius: 58rpx;
      padding: 8rpx 0rpx 8rpx 2rpx;
      background-color: #FEF1E3;
      display: flex;
      margin-top: 28rpx;
      justify-content: center;
      &:nth-child(1) {
        margin-top: 0rpx;
      }
      // 卡片
      .card {
        width: 633.76rpx;
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
          }
          .useScope-value {
            font-size: 28rpx;
            font-weight: 600;
            margin-top: 6rpx;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 300rpx;
          }
          .dashed {
            border-bottom: 2rpx dashed #FDFFA8;
            width: 344rpx;
            height: 1rpx;
            margin-top: 22rpx;
          }
          .blurb-bottom {
            margin-top: 30rpx;
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