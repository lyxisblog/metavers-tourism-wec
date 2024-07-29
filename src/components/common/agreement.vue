<template>
  <view>
    <web-view
      v-if="show"
      :webview-styles="{
        width: '100%',
        height: '100px'
      }"
      :src="agreType[agrement]"
    />
  </view>
</template>
<script>
export default {
  props: {
    agrement: {
      type: String,
      default: 'privacy'
    }
  },
  data() {
    return {
      url: '',
      show: false,
      agreType: {
        user:'https://meta-gateway.shengydt.com/api/front/login/getHtml/yhxy',
        privacy:'https://meta-gateway.shengydt.com/api/front/login/getHtml/webyszc'
      }
    }
  },
  methods: {
    close() {
      this.show = false
    },
    open() {
      this.show = true
    }
  }
}
</script>
<style lang="scss" scoped>
  .view{
    height: 100px;
  }
</style>