<template>
  <cover-view
    v-if="loadState"
    class="share-box flex-center"
  >
    <cover-image
      style="width: 10%; height: 5%"
      src="../../static/ARImages/loading.gif"
      mode="aspectFit"
    />
  </cover-view>
</template>

<script>
export default {
  data() {
    return {
      loadState: false
    }
  },
  methods: {
    showLoading() {
      this.loadState = true
    },
    hideLoading() {
      this.loadState = false
    }
  }
}
</script>

<style scoped lang="scss">
.share-box {
  width: 100%;
  height: auto;
  position: fixed;
  top: 0rpx;
  left: 0rpx;
  bottom: 0rpx;
  right: 0rpx;
  background-color: rgba(0, 0, 0, 0);
  transition: 0.3s;
  z-index: 100000;
}
</style>
