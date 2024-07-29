<!--
 * @Author: 王璇 xuan.wang@vonechain.com
 * @Date: 2023-10-20 16:33:32
 * @LastEditors: 王璇 xuan.wang@vonechain.com
 * @LastEditTime: 2023-10-30 09:53:40
 * @FilePath: /metaverse-tourism-h5/src/pagesPerson/wallet/fundList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <view
      class="kong"
      :style="{'height': height + 'px'}"
    >
      <img
        :src="url"
        style="width: 159px;height: 128px"
        alt=""
      >
      <view class="text">
        {{ emptyTxt }}
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    url: {
      type: String,
      default: 'https://metaverse-uni.oss-cn-shanghai.aliyuncs.com/file/wechat/empty.png'
    },
    emptyTxt: {
      type: String,
      default: '暂无数据'
    },
    height: {
      type: Number,
      default: 470

    }
  },
  data() {
    return {

    }

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
  .kong{
    height: 440px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .text{
      margin-top: 12px;
      font-size: 14px;
      font-weight: 400;
      color: #999999;
    }
  }

</style>