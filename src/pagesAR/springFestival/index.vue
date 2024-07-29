<template>
  <cover-view
    v-if="showSpring"
    class="share share-box"
  >
    <cover-view class="image-container">
      <cover-view style="width: 100%">
        <cover-image
          class="close-icon"
          src="../../static/images/close_white.png"
          @click="handleClose"
        />
      </cover-view>
      <cover-image
        id="iconUrlImg"
        class="picture"
        :src="`${ossUrl}/CoreResources/spingFestival/spring_entrance.png`"
        mode="aspectFit"
        @click="handleClick"
        @load="pictureLoaded"
      />
    </cover-view>
  </cover-view>
</template>

<script>
// function debounce(func, delay) {
//   let timerId
//   return function (...args) {
//     clearTimeout(timerId)
//     timerId = setTimeout(function () {
//       func.apply(this, ...args)
//     }, delay)
//   }
// }
const ossUrl = process.env.VUE_APP_METAOSS_WEBAR_URL
export default {
  props: {
    osName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showSpring: false,
      count: 0,
      ossUrl: ossUrl
    }
  },
  watch: {
    showSpring: {
      handler(newVal, oldVal) {
        if (!oldVal && newVal) {
          uni.showLoading({
            title: '下载中'
          })
        } else {
          uni.hideLoading()
        }
      }
    }
  },
  mounted() {},
  methods: {
    pictureLoaded(e) {
      //为了准确控制海报下载loading的显示与隐藏
      //此处不知道为啥pictureLoaded 在ios真机上会被调用五次，所以有了次数判断的逻辑。模拟器和安卓上只会一次
      if (e.target.id === 'iconUrlImg') {
        this.count++
        if (this.osName === 'ios') {
          if (this.count > 4) {
            this.count = 0
            uni.hideLoading()
          }
        } else {
          this.count = 0
          uni.hideLoading()
        }
      }
    },
    handleShow() {
      this.showSpring = true
    },
    handleClose() {
      uni.hideLoading()
      this.showSpring = false
    },
    handleClick(){
      this.$emit('gotoDetail')
    }
  }
}
</script>

<style scoped lang="scss">
.image-container {
  width: 100%;
  height: 100%;
  .close-icon {
    width: 44rpx;
    height: 44rpx;
    margin-right: 10%;
    margin-top: 10%;
    float: right;
  }
  .picture {
    width: 80%;
    height: 70%;
    padding-left: 10%;
    padding-top: 2%;
  }
}

.share {
  width: 100%;
  height: 100%;
}

.share-box {
  width: 100%;
  height: auto;
  position: fixed;
  top: 0rpx;
  left: 0rpx;
  bottom: 0rpx;
  right: 0rpx;
  background-color: rgba(0, 0, 0, 0.34);
  transition: 0.3s;
  z-index: 99999;
}
</style>
