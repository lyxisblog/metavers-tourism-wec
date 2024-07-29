<template>
  <view class="positioning">
    <!-- 头部 -->
    <view
      class="top flex-middle"
      :style="'padding-top:'+ statusHeight +'px;'"
    >
      <view class="goback">
        <img
          class="top-icon"
          src="../../static/images/goback.svg"
          @click="goBack"
        >
      </view>
      <view class="search-input-view flex-middle">
        <img
          class="search-icon"
          src="../../static/images/search_blue.svg"
        >
        <view
          class="search-input"
        >
          <u-input
            v-model="search"
            placeholder="请输入城市名称"
            maxlength="20"
            @input="searchData"
          />
        </view>
      </view>
    </view>
    <!-- 搜索数据 -->
    <view
      v-if="search"
      class="search-datas"
    >
      <view v-if="searchList.length>0">
        <view
          v-for="(item,index) in searchList"
          :key="index"
          class="search-data"
          @click="openModal(item.name)"
        >
          <view>{{ item.name }}</view>
          <view class="hr" />
        </view>
      </view>
      <view
        v-else
        class="no-data"
      >
        抱歉！没有找到该城市
      </view>
    </view>
    <!-- 当前位置 -->
    <view
      v-if="!search"
      class="current-location"
    >
      <view class="title">
        当前位置
      </view>
      <view
        class="current-city flex-center"
        @click="openModal(currentCity)"
      >
        <img
          src="../../static/images/current_city.svg"
          class="current-icon"
        >
        <view class="current-city-text">
          {{ currentCity ? currentCity : '未知' }}
        </view>
      </view>
    </view>
    <!-- 热门城市 -->
    <view
      v-if="!search"
      class="popular"
    >
      <view class="title">
        热门城市
      </view>
      <view
        class="tags-city"
      >
        <view
          v-for="(item,index) in popularCityList"
          :key="index"
          class="tag"
          @click="openModal(item)"
        >
          {{ item }}
        </view>
      </view>
    </view>
    <!-- 城市索引 -->
    <view
      v-if="!search"
      class="city-index"
    >
      <u-index-list
        :scroll-top="scrollTop"
        :index-list="indexList"
      >
        <view
          v-for="(item, index) in citysIndexList"
          :key="index"
          :ref="'anchor' + index"
        >
          <u-index-anchor
            :id="item[0].key"
            class="anchor"
            :use-slot="true"
            :index="item[0].key"
          >
            <text class="anchor-text">
              {{ item[0].key }}
            </text>
          </u-index-anchor>
          <view
            v-for="(city,index2) in item"
            :key="index2"
            class="list-cell"
            @click="openModal(city.name)"
          >
            {{ city.name }}
            <view class="hr" />
          </view>
        </view>
      </u-index-list>
    </view>
    <u-toast ref="uToast" />
    <u-modal
      v-model="showModal"
      :content="modalContent"
      show-cancel-button
      mask-close-able
      @confirm="selectCity"
      @cancel="closeModal"
    />
  </view>
</template>

<script>
import { saveUserAddress } from '../../api/home'
import jsonCity from './allcity.json'
const QQMapWX = require('../../utils/qqmap-wx-jssdk.js')
export default {
  data(){
    return{
      search:'',
      searchList:[],
      scrollTop: 0,
      token:'',
      currentCity:'', //当前选择城市
      selectCityName:'', //点击后暂时选择的城市
      popularCityList:[ '北京', '上海', '深圳', '广州', '天津', '成都', '西安', '乌鲁木齐', '三亚', '长沙', '杭州', '苏州' ],
      citysIndexList:[],
      // 索引
      indexList: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z' ],
      showModal:false,
      modalContent:'确认选择此城市吗？',
      statusHeight: 35
    }
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop
  },
  onLoad(){
    this.getcitysIndexList()
  },
  methods:{
    //保存个人位置
    saveUserAddress(city, longitude, latitude){
      const parmas = {
        address:city,
        longitude:longitude,
        latitude:latitude
      }
      saveUserAddress(parmas).then(res => {
        console.log(res)
      })
    },
    // 搜索城市
    searchData(){
      this.searchList = []
      const str = jsonCity.City
      for (let i = 0; i < str.length; i++) {
        const element = str[i]
        if(element.name.indexOf(this.search) !== -1){
          this.searchList.push(element)
        }
      }
    },
    // 返回上一页
    goBack () {
      wx.navigateBack({
        delta: 1
      })
    },
    // 关闭弹窗
    closeModal(){
      this.showModal = false
    },
    // 打开弹窗
    openModal(name){
      if (name) {
        // this.showModal = true
        // this.modalContent = '确认选择'+name+'吗？'
        this.selectCityName = name
        this.selectCity()
      }else{
        this.getPosition()
        console.log('定位')
      }
    },
    // 选择城市
    selectCity(){
      uni.setStorageSync('city', this.selectCityName)
      if (this.currentCity !== this.selectCityName) {
        uni.setStorageSync('latitude', 0)
        uni.setStorageSync('longitude', 0)
      }
      uni.reLaunch({
        url: '/pages/home/home'
      })
    },
    // 获取定位
    getPosition(){
      const that = this
      const tMap = new QQMapWX({
        key: '56SBZ-4ULEG-3MIQ7-QVOXE-HUNXE-6PBMI' //开发者密钥
      })
      uni.getLocation({
        type: 'gcj02',
        success: function(res) {
          that.longitude = res.longitude
          that.latitude = res.latitude
        },
        fail: function(res) {
          if (res.errno === 103) { //未给定位权限
            wx.showModal({
              title: '提示',
              content: '您尚未授权地理位置权限，请前往设置授权后再次尝试',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.openSetting({
                    settingList: [ 'scope.userLocation' ],
                    success: function () {
                      console.log('打开设置成功')
                    }
                  })
                }
              }
            })
          } else {
            that.$refs.uToast.show({
              title: '请打开定位定位',
              type: 'error'
            })
          }
        },
        complete: function(){
          // 使用腾讯sdk的reverseGeocoder方法 解析经纬度
          tMap.reverseGeocoder({
            location: {
              latitude: that.latitude,
              longitude: that.longitude
            },
            success: function(res) {
              console.log('解析地址成功', res)
              console.log('当前地址：', res.result.address)
              const regex = /[^省市]+(?=市)/g
              const result = res.result.address.match(regex)
              let city
              if (result && result.length > 0) {
                city = result[0]
                console.log(city)
              }
              that.currentCity = city
              //保存缓存
              uni.setStorageSync('latitude', that.latitude)
              uni.setStorageSync('longitude', that.longitude)
              if (that.token) {
                that.saveUserAddress(city, that.longitude, that.latitude)
              }
            },
            fail: function(res) {
              console.log(res)
            },
            complete: function() { //无论成功失败都会执行
              console.log('获取定位信息')
              return
            }
          })
        }
      })
    },
    // 获取城市索引
    getcitysIndexList(){
      const res = wx.getMenuButtonBoundingClientRect()
      const statusHeight = res.top //胶囊距离顶部
      // const navHeight = res.height //胶囊高度
      this.statusHeight = statusHeight - 10
      console.log(statusHeight)
      this.token = uni.getStorageSync('token')
      const str = jsonCity.City
      this.citysIndexList = str.reduce(function(acc, curr) {
        const key = curr.key
        if (!acc[key]) {
          acc[key] = []
        }
        acc[key].push(curr)
        return acc
      }, {})
      this.getPosition()
    }
  }

}
</script>

<style lang="scss" scoped>
  .positioning{
    width: 750rpx;
    height: 100vh;
    background-color: #F7F7F7;
    // 头部
    .top{
      height: 176rpx;
      width: 750rpx;
      background-color: #FFFFFF;
      .goback {
        margin-left: 32rpx;
        margin-top: 4rpx;
        .top-icon {
          width: 32rpx;
          height: 32rpx;
        }
      }
      .search-input-view {
        width: 420rpx;
        height: 64rpx;
        background: #F4F4F4;
        border-radius: 32rpx 32rpx 32rpx 32rpx;
        margin-left: 24rpx;
        .search-icon {
            width: 36rpx;
            height: 36rpx;
            margin-right: 10rpx;
            margin-left: 24rpx;
          }
        .search-input {
          width: 350rpx;
          ::v-deep .u-input {
            width: 310rpx;
            margin-left: 26rpx;
          }
        }
      }
    }
    // 搜索数据
    .search-datas{
      .search-data {
        width: 750rpx;
        height: 80rpx;
        padding-left: 32rpx;
        background: #FFFFFF;
        line-height: 80rpx;
        .hr{
          width: 686rpx;
          height: 1rpx;
          background: #E8E8E8;
        }
      }
      .no-data {
        height: 300rpx;
        width: 750rpx;
        background: #FFFFFF;
        text-align: center;
        line-height: 300rpx;
      }
    }
    // 当前位置
    .current-location{
      .title {
        font-size: 28rpx;
        font-family: PingFangSC-Medium-, PingFangSC-Medium;
        font-weight: normal;
        color: #004B8B;
        margin-left: 32rpx;
        margin-top: 34rpx;
      }
      .current-city {
        margin-top: 14rpx;
        margin-left: 32rpx;
        width: 148rpx;
        height: 56rpx;
        background: #FFFFFF;
        border-radius: 16rpx 16rpx 16rpx 16rpx;
        .current-icon {
          width: 44rpx;
          height: 44rpx;
        }
        .current-city-text {
          font-size: 28rpx;
          font-family: PingFangSC-Regular-, PingFangSC-Regular;
          font-weight: normal;
          color: #333333;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
    }
    // 热门城市
    .popular {
      margin-top: 42rpx;
      .title {
        margin-left: 32rpx;
        font-size: 28rpx;
        font-family: PingFangSC-Regular-, PingFangSC-Regular;
        font-weight: normal;
        color: #666666;
      }
      .tags-city {
        margin-top: 14rpx;
        width: 750rpx;
        margin-left: 12rpx;
        display: flex;
        flex-wrap:wrap;
        .tag {
          width: 148rpx;
          height: 56rpx;
          background: #FFFFFF;
          border-radius: 16rpx 16rpx 16rpx 16rpx;
          font-size: 28rpx;
          font-family: PingFangSC-Regular-, PingFangSC-Regular;
          font-weight: normal;
          color: #333333;
          line-height: 56rpx;
          text-align: center;
          margin-left: 20rpx;
          margin-top: 12rpx;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
    }
    // 城市索引
    .city-index {
      margin-top: 40rpx;
      .anchor{
        .anchor-text {
          height: 80rpx;
          padding-left: 10rpx;
        }
      }
      .list-cell {
        height: 80rpx;
        background: #FFFFFF;
        padding-left: 32rpx;
        line-height: 80rpx;
        .hr{
          width: 686rpx;
          height: 1rpx;
          background: #E8E8E8;
        }
      }
    }
  }
</style>