<template>
  <view class="tabBar">
    <view v-for="(item) in tabBar" :key="item.url" class="tabbar_item" :class="item.url == currentPage ? 'active' : ''"
      @click="navTo(item)">
      <image v-if="item.url == currentPage" :src="item.imgClick" mode="" />
      <image v-else :src="item.imgNormal" mode="" />
      <view class="text">
        {{ item.text }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: String,
      default: 'index'
    }
  },
  data() {
    return {
      tabBar: [{
        url: 'pages/home/home',
        text: '展厅',
        imgNormal: '../../static/tabbar/ar.png',
        imgClick: '../../static/tabbar/ars.png'
      },
      {
        url: 'pages/user/user',
        text: '我的',
        imgNormal: '../../static/tabbar/my.png',
        imgClick: '../../static/tabbar/mys.png'

      }]
    }
  },
  computed: {

  },
  created() {
    uni.hideTabBar({});

  },
  mounted() {
    if (uni.getStorageSync("tabs")) {
      this.tabBar[0].text = uni.getStorageSync("tabs").navNames[0];
      this.tabBar[1].text = uni.getStorageSync("tabs").navNames[1];
    }
  },
  methods: {
    navTo(item) {
      console.log(item)
      if (item.url !== this.currentPage) {
        const isUrl = `/${item.url}`
        uni.switchTab({
          url: isUrl
        })
      } else {
        // this.$parent.toTop()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
//导航栏设置
$isRadius: 20upx; //左上右上圆角
$isWidth: 348px; //导航栏宽度
$isBorder: 0px solid white; //边框 不需要则设为0px
// $isBg:white; //背景

// 选中设置
$chooseTextColor: #FFFFFF; //选中时字体颜色
$chooseBgColor: transparent; //选中时背景颜色 transparent为透明

//未选中设置
$normalTextColor: #789EBF; //未选中颜色

.tabBar {
  // background: linear-gradient(180deg, #003D97 0%, rgba(0,38,99,0.9) 100%);
  background: linear-gradient(180deg, #717479 0%, rgb(63 65 56 / 90%) 100%);
  width: $isWidth;
  height: 60px;
  position: fixed;
  bottom: 23px;
  left: 0;
  right: 0;
  // box-shadow: 0upx 2upx 10upx rgba(89,125,172,.4);
  margin: 0 auto;
  z-index: 998;
  color: $normalTextColor;
  display: flex;
  justify-content: space-around;
  border-radius: 12px;
  box-sizing: border-box;
  overflow: hidden;

  .tabbar_item {
    width: 25%;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &.active {
      border-left: $isBorder;
      border-top: $isBorder;
      background: $chooseBgColor;
      color: $chooseTextColor;
    }
  }

  image {
    width: 48upx;
    height: 48upx;
  }
}
</style>