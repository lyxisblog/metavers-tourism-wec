<template>
  <scroll-view
    scroll-y="true"
    style="height:55vh"
    @scrolltolower="pageUp"
  >
    <view
      v-if="incomeRecordList.length >0"
      class="item"
    >
      <view
        v-for="(item, index) in incomeRecordList"
        :key="index"
        class="item-label"
      >
        <view
          class="item-label-left"
        >
          <view class="title">
            {{ item.scenicName }}
          </view>
          <view class="amount">
            <span class="amount-plus"> {{ item.statusStr === "已退款" ? '-' : '+' }}</span>
            <span class="amount-i">{{ item.invitationAmount }}</span>
            <!-- <span>.00</span> -->
          </view>
        </view>
        <view class="item-label-right">
          <view class="tips flex-middle-a">
            <img
              class="img"
              src="@a/wallet/you.png"
            >
            <view>{{ item.invitationCode }}</view>
            <view>{{ item.payTime }}</view>
          </view>
          <view class="status">
            {{ item.statusStr }}
          </view>
        </view>
      </view>
    </view>
    <Empty
      v-else
      empty-txt="暂无邀请记录"
    />
  </scroll-view>
</template>
<script>
import { incomeRecord } from '@i/person'
import Empty from '@c/empty/index'

export default {
  components: { Empty },
  data() {
    return {
      list: [],
      pageData: {
        limit: 10,
        page: 1
      },
      total: 0,
      incomeRecordList: []
    }
  },
  onLoad() {

  },
  methods: {
    pageUp() {
      console.log('上翻')
      this.pageData.page = this.pageData.page + 1
      if(this.incomeRecordList.length < this.total ) {
        this.getIncomeRecord()
      }
    },
    getIncomeRecord(page) {
      if(page) {
        this.page = page
      }
      incomeRecord({
        ...this.pageData
      }).then(res => {
        console.log('邀请记录', res)
        this.total = res.total
        this.incomeRecordList =[ ...this.incomeRecordList, ...res.list ]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .item{
    padding: 15px 24px 0px 24px;
    .item-label{
      border-bottom: 1px solid #F1F1F1;
      padding: 14px 0px;
      .item-label-left{
        display: flex;
        height: 100%;
        justify-content: space-between;

        .title{
          font-size: 15px;
          font-weight: 500;
          color: #333333;
        }
      }
        .tips{
          flex: 0.8;
          font-size: 14px;
          font-weight: 400;
          color: #999999;
          .img{
            height: 16px;
            width: 16px;
          }
        }
         .amount{
          font-size: 16px;
          font-weight: bold;
          color: #FF0000;
          .amount-plus{
            font-weight: normal;
            color: #999999;
          }
          .amount-i{
            font-size: 22px;
          }

        }
      .item-label-right{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 12px;
        .status{
          font-size: 14px;
          font-weight: 400;
          text-align: right;
          color: #999999;
        }
      }
    }
  }
</style>