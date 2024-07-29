<!--
 * @Author: 王璇 xuan.wang@vonechain.com
 * @Date: 2023-10-20 16:33:32
 * @LastEditors: 王璇 xuan.wang@vonechain.com
 * @LastEditTime: 2023-11-17 09:48:13
 * @FilePath: /metaverse-tourism-h5/src/pagesPerson/wallet/fundList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <scroll-view
    scroll-y="true"
    style="height:55vh"
    @scrolltolower="pageUp"
  >
    <view
      v-if="withdrawRecordList.length > 0"
      class="item"
    >
      <view
        v-for="(item, index) in withdrawRecordList"
        :key="index"
        class="item-content"
      >
        <view class="item-label">
          <view class="item-label-left">
            <view class="amount">
              <span>{{ [ 4,5 ].includes(item.type)? '余额支付' : '提现金额' }}</span>
              <span class="amount-i">{{ item.amount }}</span>
              <!-- <span class="amount-z">.00</span> -->
            </view>
          </view>
          <view class="item-label-right">
            <view
              class="status"
              :style="styleStatus[item.type === 5? 2: item.status]"
            >
              {{ item.status| payStatus(item.type) }}
            </view>
          </view>
        </view>
        <view
          v-for="(items, indexs) in item.arr"
          :key="indexs"
          class="item-i flex-between"
        >
          <view class="item-i-label">
            {{ items.item }}
          </view>
          <view
            class="item-i-value"
            :style="items.style? items.style : ''"
          >
            {{ items.value }}
          </view>
        </view>
      </view>
    </view>
    <Empty
      v-else
      empty-txt="暂无资金记录"
    />
  </scroll-view>
</template>
<script>
import { withdrawRecord } from '@i/person'
import Empty from '@c/empty/index'

export default {

  components: { Empty },
  filters: {
    payStatus(str, type){
      if(str){
        if([ 4 ].includes(type)) {
          const data = {
            0: '支付中',
            1: '支付成功',
            2: '支付失败'
          }
          return data[str]
        } else if ([ 5 ].includes(type)) {
          const data = {
            0: '退款中',
            1: '退款成功',
            2: '退款失败'
          }
          return data[str]
        } else {
          const data = {
            0: '入账中',
            1: '入账成功',
            2: '入账失败'
          }
          return data[str]
        }
      }

    }
  },
  data() {
    return {
      styleStatus: {
        0: 'background: #0E4A86;color: #EDF2F7;',
        1: 'background: #F5F5F5;color: #999999;',
        2: 'background:rgba(255,0,0,0.07);color:#FF0000 ;'
      },
      limit: 10,
      page: 1,
      totalPage: 0,
      withdrawRecordList: []
    }

  },
  computed: {
    itemList() {
      return this.withdrawRecordList.map(item => {
        if(item.type === 4 || item.type === 5 ) {
          item.arr = [
            {
              item: '支付时间',
              value: item.createTime
            }
          ]
        } else {
          item.arr = [
            {
              item: '个税比例',
              value: item.withholdRate
            },
            {
              item: '代扣个税',
              value: item.withholdFee
            },
            {
              item: '提现手续费',
              value: item.withdrawFee
            },
            {
              item: '到账金额',
              value: item.actualAmount,
              style: 'color:#FF0000;'
            },
            {
              item: '提现方式',
              value: this.payType(item.type)
            },
            {
              item: '提现时间',
              value: item.createTime
            }

          ]
        }

      })
    }
  },
  methods: {
    payType(str){
      if(str){
        const data = {
          0: '微信',
          1: '支付宝',
          2: '银行卡',
          4: '余额扣除',
          5: '余额退款'
        }
        return data[str]
      }
    },
    // changeTab() {

    // },
    pageUp() {
      console.log('上翻')
      this.page = this.page + 1
      if(this.withdrawRecordList.length < this.total ) {
        this.getwithdrawRecord()
      }
    },
    getwithdrawRecord(page) {
      if(page) {
        this.page = page
      }
      withdrawRecord({
        page: this.page,
        limit: this.limit
      }).then(res => {
        console.log('资金记录', res)
        this.total = res.total
        this.withdrawRecordList = [ ...this.withdrawRecordList, ...res.list ]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.item-content{
  border-bottom: 1px solid #DEDEDE;
  &:last-child{
    border-bottom: none;
  }
}
  .item{
    display: flex;
    flex-direction: column;
    padding: 15px 20px 0px 24px;
    .item-label{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .item-label-left{
        .amount{
          font-size: 16px;
          font-weight: bold;
          color: #333333;
          .amount-i{
            font-size: 22px;
            color: #FF0000;
            margin-left: 10px;
          }
          .amount-z{
            color: #FF0000;
          }
        }
      }
      .item-label-right{
        .status{
          font-size: 12px;
          font-weight: 400;
          width: 64px;
          height: 20px;
          border-radius: 12px;
          text-align: center;
          line-height: 20px;
        }
      }
    }
    .item-i{
        padding: 8px;
        .item-i-label{
          font-size: 14px;
          font-weight: 400;
          color: #999999;
        }
        .item-i-value{
          font-size: 14px;
          font-weight: 400;
          color: #333333;
        }

      }
  }
</style>