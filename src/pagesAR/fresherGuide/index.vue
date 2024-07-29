<template>
  <cover-view class="guide-container">
    <cover-image
      :src="`${ossUrl}/CoreResources/operationalGuideline/` + images[currentIndex] + `.jpg?time=${Date.now()}`"
      class="guide-image"
    />
    <cover-view
      class="skip-button"
      @click="skipGuide"
    >
      <cover-view class="skipTitle">
        {{ skipTitle }}
      </cover-view>
      <cover-image
        class="skipIcon"
        src="../../static/ARImages/skipIcon.png"
      />
    </cover-view>
    <cover-view
      class="guide-button"
      :class="currentIndex > 0 ? `step${currentIndex}` : 'hidden'"
      style="left:6%"
      @click="previousStep"
    >
      上一步{{ previousStepTitle }}
    </cover-view>
    <cover-view
      class="guide-button"
      :class="currentIndex < images.length - 1 ? `step${currentIndex}` : 'hidden'"
      style="right:6%"
      @click="nextStep"
    >
      下一步{{ nextStepTitle }}
    </cover-view>
  </cover-view>
</template>

<script>
const skipStr = '跳过教学'
const knownStr = '我已了解'
const ossUrl = process.env.VUE_APP_METAOSS_WEBAR_URL //新手引导图的域名
export default {
  data() {
    return {
      currentIndex: 0,
      images: [ '1', '2', '3', '4', '5' ],
      previousStepTitle: '(1/5)',
      nextStepTitle: '(2/5)',
      skipTitle: skipStr,
      ossUrl: ossUrl
    }
  },
  methods: {
    previousStep() {
      if (this.currentIndex > 0) {
        this.currentIndex--
        this.previousStepTitle = `(${this.currentIndex}/${this.images.length})`
        this.nextStepTitle = `(${this.currentIndex + 2}/${this.images.length})`
        this.skipTitle =
          this.currentIndex === this.images.length - 1 ? knownStr : skipStr
      }
    },
    nextStep() {
      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex++
        this.previousStepTitle = `(${this.currentIndex}/${this.images.length})`
        this.nextStepTitle = `(${this.currentIndex + 2}/${this.images.length})`
        this.skipTitle =
          this.currentIndex === this.images.length - 1 ? knownStr : skipStr
      }
    },
    skipGuide() {
      // 跳过新手引导逻辑
      this.$emit('skipGuide')
    }
  }
}
</script>

<style scoped lang="scss">
.guide-container {
  position: fixed;
  z-index: 199999;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
}

.hidden {
  display: none;
}

.guide-image {
  width: 100%;
  height: 100%;
}

.skip-button {
  position: absolute;
  top: 70rpx;
  right: 30rpx;
  height: 60rpx;
  background-color: rgba(0, 0, 0, 0.7);
  border: 1px solid #7e7e7f;
  border-radius: 30rpx;
  padding: 0 40rpx;
  display: flex;
  justify-content: space-between;
  .skipTitle {
    font-size: 30rpx;
    font-weight: 400;
    color: #fff7e8;
    padding-top: 12rpx;
  }
  .skipIcon {
    width: 30rpx;
    height: 30rpx;
    display: inline-block;
    margin: 14rpx 0 0 20rpx;
  }
}

.guide-button {
  position: absolute;
  height: 50rpx;
  background-color: rgba(255, 255, 255, 0.9);
  border: 2rpx solid #7e7e7f;
  border-radius: 29rpx;
  line-height: 50rpx;
  padding: 4rpx 20rpx;
  color: #777777;
  text-align: center;
  text-decoration: none;
  font-size: 24rpx;
  font-weight: bold;
}

.step0 {
  top: 40%;
}
.step1 {
  bottom: 330rpx;
}
.step2 {
  top: 280rpx;
}
.step3 {
  bottom: 480rpx;
}
.step4 {
  bottom: 340rpx;
}
</style>
