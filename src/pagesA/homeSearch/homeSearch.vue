<template>
  <view class="homeSrarch">
    <!-- 搜索 -->
    <view class="search flex-middle">
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
            placeholder="请输入目标的地点或景区"
            maxlength="30"
          />
        </view>
      </view>
      <view
        class="btn"
        @click="searchDatas()"
      >
        搜索
      </view>
    </view>
    <!-- 搜索记录 -->
    <view class="records flex-between">
      <view class="records-title">
        搜索记录
      </view>
      <img
        src="../../static/images/delete_record.svg"
        class="records-icon"
        @click="openDeleteSearchRecordsModal"
      >
    </view>
    <!-- tags -->
    <view class="tags flex-middle">
      <view
        v-for="(item,index) in searchRecordsList"
        :key="index"
        class="tag"
        @click="searchDatas(item)"
      >
        {{ item }}
      </view>
    </view>
    <!-- 数据 -->
    <scroll-view
      scroll-y="true"
      class="datas"
      @scrolltolower="pageTurning"
    >
      <view
        v-for="item in dataList"
        :key="item.scenicId"
        class="data"
        @click="goDetails(item.scenicId)"
      >
        <view
          class="data-top"
          :style="'background-image: url('+item.sattDir+');background-size: cover;'"
        >
          <view
            v-if="item.isShow === 1"
            class="is-show flex-v"
          >
            <img
              class="is-show-img"
              src="../../static/images/locationGif.gif"
            >
          </view>
          <!-- 评分 -->
          <view class="score">
            <view class="score-text">
              评分<span class="score-num">{{ item.score ? item.score : '0.0' }}</span>
            </view>
          </view>
          <!-- 景点名称 -->
          <view class="title">
            {{ item.scenicName }}
          </view>
          <img
            class="top-logo"
            src="../../static/images/AR_logo.svg"
          >
        </view>
        <view class="data-bottom flex-between">
          <view class="imgs flex-middle">
            <view
              v-for="(img,index) in item.footUserPicList"
              :key="index"
              class="img-view"
            >
              <img
                class="img"
                :src="img.userPic"
              >
            </view>
          </view>
          <view class="useCount">
            {{ item.useCount ? item.useCount : '0' }}
          </view>
        </view>
      </view>
    </scroll-view>
    <u-toast ref="uToast" />
    <u-modal
      v-model="showModal"
      :content="modalContent"
      show-cancel-button
      mask-close-able
      @confirm="deleteSearchRecords"
      @cancel="closeDeleteSearchRecordsModal"
    />
  </view>
</template>

<script>
import { getScenicPage } from '../../api/home'
import { scenicInfoNonAuth } from '../../api/api'
export default {
  data () {
    return {
      selected:1, //展示类型
      status: 'loadmore', //加载状态
      dataList:[],
      search:'',
      searchRecordsList:[],
      // 弹窗
      showModal: false,
      token:'',
      modalContent: '确认删除搜索记录吗？',
      // 分页
      limit:10,
      page:1,
      total:0,
      totalPage:0
    }
  },
  onLoad(){
    this.getSearchRecords()
  },
  methods:{
    closeDeleteSearchRecordsModal(){
      this.showModal = false
    },
    // 跳转到景区导航页面
    goDetails(scenicId){
      // if(!this.token) {
      //   uni.navigateTo({
      //     url: '/pagesA/login/index'
      //   })
      //   return
      // }
      const params = {
        id: scenicId
      }
      scenicInfoNonAuth(params).then((res) => {
        if (res.wechatMiniStatus) {
          if (res.feature === '2') {
            uni.navigateTo({
              url: '/pagesA/scanCode/index?scenicId=' + scenicId + '&scanSpecification=' + res.scanSpecification
            })
          } else {
            uni.navigateTo({
              url: '/pagesAR/guide/index?scenicId=' + scenicId
            })
          }
        } else {
          uni.showToast({
            title: 'AR功能建设中，敬请期待。',
            duration: 2000,
            icon: 'none'
          })
        }
      })
    },
    // 打开搜索记录删除确认弹窗
    openDeleteSearchRecordsModal(){
      this.showModal = true
    },
    // 删除缓存
    deleteSearchRecords(){
      this.searchRecordsList = []
      wx.removeStorageSync('searchRecordsList')
    },
    // 获取定位
    getPosition(){
      const that = this
      uni.getLocation({
        type: 'gcj02',
        success: function(res) {
          console.log(res)
          console.log('经度：' + res.longitude)
          console.log('纬度：' + res.latitude)
        },
        fail: function() {
          that.$refs.uToast.show({
            title: '请打开定位',
            type: 'error'
          })
        }
      })
    },
    // 获取搜索记录
    getSearchRecords(){
      const str = uni.getStorageSync('searchRecordsList')
      this.token = uni.getStorageSync('token')
      console.log(str)
      if(str){
        const searchRecordsList = str.split(',')
        this.searchRecordsList = searchRecordsList
      }
    },
    // 搜索
    searchDatas(item){
      this.dataList = []
      this.limit = 3
      this.page = 1
      this.total = 0
      this.totalPage = 0
      if (item) {
        this.search = item
      }
      if (!this.search) {
        return
      }
      this.saveSearchRecords()
      this.getScenicPage()
    },
    // 保存搜索记录
    saveSearchRecords(){
      const str = uni.getStorageSync('searchRecordsList')
      if(str){ //存在搜索记录
        const searchRecordsList = str.split(',')
        for (let index = 0; index < searchRecordsList.length; index++) {
          const element = searchRecordsList[index]
          if (element === this.search) { //存在相同搜索记录
            break
          }else if(index === searchRecordsList.length-1 && this.search){ //不存在相同搜索记录 且搜索内容不能为空
            this.searchRecordsList.unshift(this.search)
            if(this.searchRecordsList.length>5){
              this.searchRecordsList.pop()
            }
          }
        }
      }else if(this.search){
        this.searchRecordsList.unshift(this.search)
      }
      const str2 = this.searchRecordsList.toString()
      uni.setStorage({
        key: 'searchRecordsList',
        data: str2
      })
    },
    // 翻页
    pageTurning(){
      if(this.page>=this.totalPage) return
      this.status = 'loading'
      this.limit = this.limit + 10
      this.getScenicPage()
    },
    // 获取数据
    getScenicPage(){
      const parmas = {
        limit:this.limit,
        page:this.page,
        type:this.selected,
        name:this.search
      }
      getScenicPage(parmas).then(res => {
        this.dataList = res.list
        this.limit = res.limit
        this.page = res.page
        this.total = res.total
        this.totalPage = res.totalPage
        if(this.page >= this.totalPage) this.status = 'nomore'
        else this.status = 'loadmore'

      })
    }
  }
}
</script>

<style lang="scss" scoped>
.homeSrarch{
  width: 750rpx;
  height: 100vh;
  color: #FFFFFF;
  font-family: PingFangSC-Regular, PingFang SC;
  background-color: #F7F7F7;
  // 搜索
  .search {
    background-color: #FFFFFF;
    height: 100rpx;
    .search-input-view {
      width: 524rpx;
      height: 64rpx;
      background: #F4F4F4;
      border-radius: 32rpx 32rpx 32rpx 32rpx;
      margin-left: 24rpx;
      .search-input {
        width: 400rpx;
        ::v-deep .u-input {
          width: 380rpx;
          margin-left: 26rpx;
        }
      }
    }
    .search-icon {
      width: 36rpx;
      height: 36rpx;
      margin-right: 10rpx;
      margin-left: 24rpx;
    }
    .btn{
      width: 120rpx;
      height: 64rpx;
      background: #004B8B;
      border-radius: 32rpx 32rpx 32rpx 32rpx;
      font-size: 28rpx;
      color: #FFFFFF;
      text-align: center;
      line-height: 64rpx;
      margin-left: 42rpx;
    }
  }
  // 搜索记录
  .records{
    margin-top: 42rpx;
    .records-title{
      font-size: 28rpx;
      font-family: PingFangSC-Medium-, PingFangSC-Medium;
      font-weight: normal;
      color: #333333;
      margin-left: 32rpx;
    }
    .records-icon {
      width: 44rpx;
      height: 44rpx;
      margin-right: 32rpx;
    }
  }
  // tags
  .tags{
    margin-top: 26rpx;
    .tag {
      height: 56rpx;
      background: #E8E8E8;
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      font-size: 24rpx;
      font-family: PingFangSC-Regular-, PingFangSC-Regular;
      font-weight: normal;
      color: #333333;
      line-height: 56rpx;
      text-align: center;
      padding: 0rpx 20rpx;
      margin-left: 16rpx;
      max-width: 152rpx;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .tag:first-child{
      margin-left: 32rpx;
    }
  }
  // 数据
  .datas{
    overflow-y: auto;
    position: absolute;
    bottom: 0rpx;
    left: 32rpx;
    top: 280rpx;
    width: 718rpx;
    .data{
      margin-top: 36rpx;
      background: #FFFFFF;
      border-radius:32rpx;
      width: 686rpx;
      .data-top {
        width: 686rpx;
        height: 376rpx;
        background: #D8D8D8;
        box-shadow: 0rpx 2rpx 28rpx 0rpx rgba(0,75,139,0.3);
        border-radius: 32rpx;
        position: relative;
        .is-show{
          width: 64rpx;
          height: 64rpx;
          background: rgba($color: #000000, $alpha: 0.4);
          border-radius: 19rpx 19rpx 19rpx 19rpx;
          position: absolute;
          top: 24rpx;
          left: 24rpx;
          .is-show-img {
            width: 64rpx;
            height: 64rpx;
          }
        }
        .score {
          position: absolute;
          right: 0rpx;
          top: 0rpx;
          width: 126rpx;
          height: 48rpx;
          text-align: center;
          background-color: rgba($color: #FFFFFF, $alpha: 0.9);
          border-top-right-radius: 32rpx;
          border-bottom-left-radius: 32rpx;
          .score-text{
            font-size: 22rpx;
            font-weight: 400;
            color: #004B8B;
          }
          .score-num {
            font-size: 32rpx;
            color: #FF4719;
            margin-left: 1rpx;
          }
        }
        .title {
          position: absolute;
          left: 24rpx;
          bottom: 16rpx;
          font-size: 36rpx;
          font-weight: 500;
          color: #FFFFFF;
          text-shadow: 0px 0px 12px rgba(0,0,0,0.4);
          max-width: 550rpx;
        }
        .top-logo {
          width: 80rpx;
          height: 80rpx;
          position: absolute;
          right: 24rpx;
          bottom: 16rpx;
        }
      }
      .data-bottom {
        height: 92rpx;
        .imgs{
          margin-left: 24rpx;
          .img-view {
            width: 36rpx;
          }
          .img {
            width: 56rpx;
            height: 56rpx;
            border-radius: 28rpx;
          }
        }
        .useCount {
          font-size: 32rpx;
          font-family: Arial-BoldItalicMT, Arial;
          font-weight: normal;
          color: #333333;
          margin-right: 24rpx;
        }
      }
    }
    .loadmore {
      padding: 24rpx;
    }
  }
}
</style>>