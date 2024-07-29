<!--
 * @Author: 王璇 xuan.wang@vonechain.com
 * @Date: 2023-10-19 11:31:55
 * @LastEditors: 王璇 xuan.wang@vonechain.com
 * @LastEditTime: 2024-01-19 11:23:31
 * @FilePath: /metaverse-tourism-h5/src/pages/webview/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <web-view :src="url" />
</template>
<script>
export default {
  data() {
    return {
      url: ''
    }
  },
  onLoad(item) {
    // 传入需要跳转的链接 使用web-view标签进行跳转
    const str = item.decode ? decodeURIComponent(item.url) : item.url
    this.url = encodeURI(str)
  }
}
</script>