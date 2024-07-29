<!--
 * @Author: 王璇 xuan.wang@vonechain.com
 * @Date: 2023-05-25 10:49:25
 * @LastEditors: 王璇 xuan.wang@vonechain.com
 * @LastEditTime: 2023-11-13 10:23:37
 * @FilePath: /metaverse-tourism-wachat/src/pages/home/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view
    class="content"
    style=""
  >
    <view v-if="load">
      <view>
        <image
          style="vertical-align: middle; margin-right: 10px"
          src="/static/images/wxpay.png"
          class="img"
          alt=""
        />
        <span style="vertical-align: middle">支付成功</span>
      </view>
      <view class="texet">
        请手动返回游历星河
      </view>
    </view>
    <u-loading
      v-else
      mode="circle"
    />
  </view>
</template>

<script>

export default {
  data() {
    return {
      load: false
    }
  },
  methods: {

    goToMin2(data) {
      wx.requestPayment({
        ...data,
        success(res) {
          console.log(res, '成功')
          this.load = true
        },
        fail(res) {
          console.log(res, '失败')
          this.load = false
        }
      })
    }
  },
  onLoad(options) {
    console.log(options, '3232')
    const { scenicId } = options
    this.createOrderFun(scenicId)
  },
  onShow() {}
}
</script>

<style scoped lang="scss">
.content {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.img {
  width: 26px;
  height: 26px;
}
.texet {
  margin-top: 50px;
  font-size: 14px;
  width: 100%;
  text-align: center;
}
.btn-box {
  display: flex !important;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 10%;
  width: 100%;
  height: 100px;
  padding: 12px;
}
</style>
