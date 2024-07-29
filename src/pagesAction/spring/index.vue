
<template>
  <view
    v-if="!taskStarted"
    class="action-A"
  >
    <view class="action-not-start">
      <view
        class="navbar-box"
        :style="'top:' + statusHeight +'px;'"
      >
        <view
          class="left"
          @click="customBack"
        >
          <img
            style="width: 20px; height: 20px"
            src="@a/spring/back.png"
          >
        </view>
      </view>
    </view>
  </view>
  <view
    v-else
    class="action-A"
  >
    <view class="action">
      <view
        class="navbar-box"
        :style="'top:' + statusHeight +'px;'"
      >
        <view
          class="left"
          @click="customBack"
        >
          <img
            style="width: 20px; height: 20px"
            src="@a/spring/back.png"
          >
        </view>
      </view>
      <view
        class="action-rule"
        @click="popupShow = true"
      >
        <view>规则</view>
        <view style="margin-top: -7px">
          <img
            src="@a/spring/arrowUp.png"
            alt=""
            style="width: 13rpx; height: 11rpx"
          >
        </view>
      </view>
      <view class="notice">
        <u-notice-bar
          color="#fff"
          bg-color="rgba(0,0,0,0.5)"
          padding="12rpx"
          border-radius="11"
          speed="100"
          :no-list-hidden="fasle"
          :list="actionData.carouselContent"
        />
      </view>
      <view
        class="action-btn"
        :style="{ bottom: residueNum >= 7 ? '12px' : '4px' }"
        @click="checkPrivacy({state: true}, 'BTN')"
      >
        <view style="margin-bottom: -8rpx;">
          <img
            style="width: 232rpx; height: 39rpx"
            src="https://metaverse-uni.oss-cn-shanghai.aliyuncs.com/file/activity/heardtxt.png"
          >
        </view>
        <view
          v-if="residueNum < 7"
          class="action-text"
        >
          剩余{{ isToken ? actionData.residueNum : 1 }}次
        </view>
      </view>
    </view>

    <view class="action-bg">
      <view
        v-if="scenicId === '10112'"
        class="mini-enter"
        @click="openOtherMini"
      >
        <view>
          <img
            src="@a/spring/minBtn.png"
            alt=""
            style="width:125rpx; height: 235rpx"
          >
        </view>
      </view>
      <view class="action-bg-cneter-text">
        已有{{ actionData.activityNum }}人参与
      </view>
      <view class="action-shear">
        <view class="action-bg-cneter-shear">
          <view class="action-bg-cneter-shear-text">
            {{
              residueNum === 7
                ? "抽签已完成，快完成任务赢大奖吧"
                : "好运余额不足？分享再抽一次"
            }}
          </view>
          <view class="action-bg-cneter-shear-btn">
            <button
              class="action-bg-cneter-shear-btn-text"
              open-type="share"
            >
              去分享
            </button>
            <view class="action-bg-cneter-shear-btn-img">
              <img
                src="@a/spring/shearArrow.png"
                alt=""
              >
            </view>
          </view>
        </view>
      </view>
      <view class="action-time">
        <view class="action-time-bg">
          <view class="action-time-bg-img">
            <img src="@a/spring/time.png">
          </view>
          <view>活动时间：2024年2月7日-18日16时</view>
        </view>
      </view>

      <view class="action-tag">
        <view class="action-tag-bg">
          <view
            v-for="(item, index) in ballotList"
            :key="index"
            class="action-tag-bg-tag"
            :style="{
              backgroundImage: item.state
                ? `url(https://metaverse-uni.oss-cn-shanghai.aliyuncs.com/file/activity/tag2.png)`
                : `url(https://metaverse-uni.oss-cn-shanghai.aliyuncs.com/file/activity/tag1.png)`,
            }"
            @click="checkPrivacy(item)"
          >
            <view class="action-tag-bg-tag-text">
              <view>{{ item.state ? "去抽签" : item.ballotName }}</view>
            </view>
          </view>
        </view>
      </view>

      <view class="action-tips">
        <img
          src="@a/spring/taskTi.png"
          alt=""
          style="width: 100%; height: 100%"
        >
      </view>

      <view class="action-tips-title">
        <view class="action-tips-title-container">
          <view class="action-tips-title-text">
            {{ taskOver ? '已参与抽奖，等待开奖中' :'完成任务即可参与抽奖' }}
          </view>
        </view>
        <view class="action-tips-finish-text">
          <view class="action-time-bg-img">
            <img src="@a/spring/time.png">
          </view>
          <view class="text-view">
            开奖时间：2024年2月19日 10:00
          </view>
        </view>
      </view>

      <view class="action-prize">
        <view class="action-prize-bg" />
      </view>

      <view class="action-prize-count">
        <view class="action-count-desc" />
      </view>

      <view class="action-task">
        <view class="action-task-btn">
          <view
            class="action-task-btn-text"
            :style="{
              backgroundImage:
                curryTab === '1'
                  ? `url(https://metaverse-uni.oss-cn-shanghai.aliyuncs.com/file/activity/tabsL.png)`
                  : `url(https://metaverse-uni.oss-cn-shanghai.aliyuncs.com/file/activity/tabsA.png)`,
            }"
            @click="changeTab('1')"
          >
            心愿单
          </view>
          <view
            class="action-task-btn-text"
            :style="{
              backgroundImage:
                curryTab === '2'
                  ? `url(https://metaverse-uni.oss-cn-shanghai.aliyuncs.com/file/activity/tabsL.png)`
                  : `url(https://metaverse-uni.oss-cn-shanghai.aliyuncs.com/file/activity/tabsA.png)`,
            }"
            @click="changeTab('2')"
          >
            景区优惠券
          </view>
        </view>
      </view>
      <view class="action-task-content">
        <view
          v-if="curryTab === '1'"
          class="action-task-content-bg"
        >
          <view class="action-task-content-task">
            <view
              v-for="item in taskList"
              :key="item.id"
              class="action-task-one"
            >
              <view
                class="img"
                :style="{
                  backgroundImage: `url(${require('@a/spring/task' + item.id + '.png')})`,
                }"
              />
              <view style="flex: 1">
                <view class="action-task-txt">
                  {{ item.title }}
                </view>
                <view class="action-task-txt-i">
                  {{ item.desc }}
                </view>
              </view>
              <view
                class="action-task-btn"
                :style="{
                  backgroundImage: `url(${require(item.btnSatae === 1
                    ? '@a/spring/taskBtnA.png'
                    : '@a/spring/taskBtnL.png')})`,
                }"
                @click="handleTask(item)"
              >
                {{ item.btnSatae === 1 ? "已完成" : "未完成" }}
              </view>
            </view>
          </view>

          <view class="action-tips-sacp">
            <img
              src="@a/spring/sacoTi.png"
              style="width: 100%; height: 100%"
            >
          </view>
          <view
            v-for="item in actionData.scenicList"
            :key="item.scenicId"
            class="action-sacpe"
          >
            <view
              class="action-sacp"
              :style="{ backgroundImage: `url(${item.scenicImage})` }"
            >
              <view class="action-sacp-mask">
                <view class="action-sacp-mask-title">
                  {{ item.scenicName }}
                </view>
                <view
                  class="action-sacp-mask-btn"
                  @click="goScenic(item.scenicId)"
                >
                  去查看
                </view>
              </view>
            </view>
          </view>
        </view>

        <view
          v-else
          class="action-task-content-bg"
        >
          <CouponList :center-response="actionData.centerResponseList" />
        </view>
      </view>
    </view>

    <u-popup
      v-model="popupShow"
      mode="center"
      border-radius="14"
      :closeable="true"
      height="600px"
      length="630"
    >
      <view class="action-rule-content">
        <view class="title">
          <!-- <p>迎祥龙、接好运</p>
          <p>元宇宙新春狂欢</p> -->
          <p>活动规则</p>
        </view>
        <view class="content">
          <p>
            参与本次活动前，请您详细阅读活动规则及相关条款，充分理解活动规则，如您对活动规则有任何疑问，可向客服进行咨询。一旦您参与本次活动，则视为您已阅读、理解并同意活动规则及注意事项等全部内容。
          </p>
          <p>1.参与资格：参与用户应为具有完全民事行为能力的自然人，且活动期间仅可以使用一个自己合法有权的游历星河账号参与活动，如使用自己名下多个账号或使用他人账号，用户的全部参与行为将被视为无效，且无权获得任何奖品。</p>
          <p>2.活动范围：本活动仅限于游历星河小程序。</p>
          <p>3.活动时间：2024年2月7日-18日16:00</p>
          <p>4.活动说明</p>
          <p>【AR抽签－添好运、享补贴】</p>
          <p>活动玩法：</p>
          <p>活动期间内，新老用户进入活动页面后均自动获得1次抽签次数，可通过活动页面进行AR抽签，解签结果将随机获得“好运签、暴富签、心愿签、晋升签、勇敢签”等多种的祝福签文，有机会获得不同面值、权益的景区优惠券，优惠券可在对应景区的线下消费场景中使用；</p>
          <p>若还想多次抽签，可以通过将本活动分享给微信好友或微信朋友圈，系统判定为有效分享后用户可获得额外的抽签次数，每完成1次有效分享，可额外获得1次AR抽签的机会，每人最多可额外获得6次机会；</p>
          <p>完成抽签的用户均可解锁“好运心愿单”。</p>
          <p>注意事项：</p>
          <p>（1）以上优惠券随机发放，不可更换，不可折现，不可找零，数量有限，先到先得，领完即止；</p>
          <p>（2）优惠票券获得后立即生效，具体失效时间请以每张票券的具体说明为准，请注意在有效期内使用，逾期自动作废；</p>
          <p>（3）用户可通过活动页中【景区优惠券】查看优惠券详情，优惠券使用方法，请留意每张优惠券的规则详情。</p>
          <p>【完成心愿单，抽取终极大奖】</p>
          <p>活动玩法：</p>
          <p>活动期间内，新老用户完成AR抽签均可解锁“好运心愿单”，通过完成不同的任务数量将提高对应可抽奖励的奖品范围，完成心愿单上全部指派的“好运”小任务有机会抽取终极大奖。</p>
          <p>任务数量对应奖品范围：</p>
          <p>完成1个任务：五等奖+特别奖</p>
          <p>完成2个任务：四等奖+五等奖+特别奖</p>
          <p>完成全部任务：一等奖+二等奖+三等奖+四等奖+五等奖+特别奖</p>
          <p>奖励内容如下：</p>
          <view>
            <img
              src="@a/spring/jipin.png"
              style="width: 560rpx;height: 300rpx;"
              alt=""
            >
          </view>
          <p style="text-align: center;font-weight: 500;">
            以上奖品由盛阳伍月提供并发放
          </p>
          <p>注意事项：</p>
          <p>（1）部分“好运心愿单”内任务部分为景区线下探索任务，需要前往景区线下体验完成相关任务；</p>
          <p>（2）每个用户至多拥有一次抽奖机会，系统将在拥有抽奖资格的用户中自动抽取获奖用户，中奖概率将取决于活动期间参与抽奖活动的用户的数量【由于无法预计参与抽奖活动的用户总人数，所以中奖概率并不是一个确定的数值】；</p>
          <p>（3）获奖名单将于2024年2月19日10:00发布，届时将公告中奖用户脱敏手机号码，并将用户名单在游历星河官方微信公众号公布，并以手机短信通知获奖用户，届时请联系游历星河官方客服，我们将在7个工作日内为您完成奖品的发放；</p>
          <p>（4）以上奖品均为实物奖品，不可折现，不可更换，运费由用户自行承担；</p>
          <p>（5）获奖名单发布后如超过5个工作日未与游历星河官方取得联系核实获奖信息并提供收件信息，将视为自动放弃奖励，逾期不做补偿发放。</p>
          <p>3.特别说明</p>
          <p>（1）参与用户存在不正当行为，游历星河有权撤销违规用户的参与活动资格和所获奖励，并保留通过法律手段来维护合法权益。不正当行为包括但不限于以下情形：</p>
          <p>①作弊购买、批量下单，是指同一或者相似ID批量下单、相同或近似（包含雷同、临近、虚构）的订单、短时间内集中批量下单、收货地址集中于某一或者某几个地区的、近似行业黄牛批发订单等其他相似场景；</p>
          <p>②同一用户多账号，是指用户注册、持有、使用或控制多个游历星河账号。其中，同一用户是指游历星河账户注册信息、网络操作日志、交易订单信息等与用户身份和行为相关的信息，其中任意一项或数项存在相同、相似，亦或通过特定标记批量信息进行分析，其数项被存在相同、相似的；</p>
          <p>③恶意购买，是指经合理判断用户使用优惠权益获取的商品或服务并非个人生活所需或非用于个人消费；</p>
          <p>④通过任何不正当手段达成交易或参与活动，包括但不限于使用插件、外挂等工具或借助非自然流量或非正常社交关系完成分享助力任务（如使用专业助力群）；</p>
          <p>⑤盗用身份、提供虚假信息；</p>
          <p>⑥采用任何方式套取活动道具、套取补贴的行为；</p>
          <p>⑦从事赌博、洗钱、违规套现、刷信誉等行为；</p>
          <p>⑧利用技术漏洞或规则漏洞下单、获取福利、补贴；</p>
          <p>（2）在法律允许的范围内，游历星河有权对活动的规则/条款作出适当的修改，必要时暂停或调整本次活动，若有变更，将以【活动公告】方式及时通知。</p>
          <p>（3）本活动开展期间，如出现不可抗力等情况，例如发生自然灾害事件、遭受网络攻击、疫情、活动受法律法规、监管机构要求或政策指令需要停止举办或调整，游历星河单方暂停、中止或终止提供服务的，可免于承担责任。</p>
        </view>
      </view>
    </u-popup>
    <u-mask
      :show="show"
      @click="show = false"
    >
      <view class="shear-img">
        <img
          :src="ballotUrl"
          alt=""
          style="width: 674rpx;height: 1024rpx;"
        >
        <view class="shear-img-btn">
          <button
            class="action-item"
            @click="shareImg"
          >
            <!-- shareImg -->
            <img
              class="action-icon"
              src="@a/spring/ic_share_wx.png"
            >
            <text class="text">
              分享到微信
            </text>
          </button>
          <button
            class="action-item"
            @click="saveImg"
          >
            <img
              class="action-icon"
              src="@a/spring/ic_share_down.png"
            >
            <text class="text">
              保存图片
            </text>
          </button>
        </view>
      </view>
    </u-mask>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import { getActivityByActivityId, ballot, task, share } from '@i/action'
import CouponList from './couponList'
const QQMapWX = require('../../utils/qqmap-wx-jssdk.js')

export default {
  components: { CouponList },
  data() {
    return {
      activityId: '',
      actionData: {},
      ballotList: [],
      show: false,
      statusHeight: 50,
      ballotUrl: '',
      latitude: '',
      longitude: '',
      curryTab: '1',
      popupShow: false,
      scenicId: ''
    }
  },
  computed: {
    ...mapGetters([ 'isToken' ]),
    residueNum() {
      return this.actionData.ballotList ? this.actionData.ballotList.length : 0
    },
    taskList() {
      return [
        {
          id: 1,
          title: '任务1：好运不停歇' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
          desc: '累计完成三次抽签',
          btnSatae: this.actionData.task1State
        },
        {
          id: 2,
          title: '任务2：感受不一样的年味',
          desc: '前往附近的活动景区看一场新年AR秀',
          btnSatae: this.actionData.task2State
        },
        {
          id: 3,
          title: '任务3：好好犒劳一下自己',
          desc: '前往附近的活动景区核销一张优惠券',
          btnSatae: this.actionData.task3State // 1 已完成 0 未完成
        }
      ]
    },
    taskOver() {
      return this.actionData.task1State || this.actionData.task2State || this.actionData.task3State
    },
    taskAllOver() {
      return this.actionData.task1State && this.actionData.task2State && this.actionData.task3State
    },
    taskStarted() {
      const startTime =(this.actionData.startTime || '2024-02-07 00:00:00').replace(' ', 'T')
      const targetDate = new Date(startTime)
      const currentDate = new Date()
      return currentDate.valueOf() > targetDate.valueOf()
    }
  },
  onLoad(params) {
    console.log('111', params)
    this.activityId = params.activityId
    this.scenicId = params.scenicId ? params.scenicId : ''
    this.latitude = uni.getStorageSync('latitude')
    this.longitude = uni.getStorageSync('longitude')
    const res = wx.getMenuButtonBoundingClientRect()
    const statusHeight = res.top //胶囊距离顶部
    this.statusHeight = statusHeight - 8
    // this.getActivityDetail()
    this.getPosition()
  },
  onShow() {
    // this.getActivityDetail()
    this.getPosition()

  },
  methods: {
    goToLogin() {
      uni.navigateTo({
        url: '/pagesA/login/index'
      })
    },
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
          // 使用腾讯sdk的reverseGeocoder方法 解析经纬度
          tMap.reverseGeocoder({
            location: {
              latitude: that.latitude,
              longitude: that.longitude
            },
            success: function(res) {
              const regex = /[^省市]+(?=市)/g
              const result = res.result.address.match(regex)
              let city
              if (result && result.length > 0) {
                city = result[0]
                console.log(city)
              }
              that.cityName = city
              uni.setStorage({
                key: 'city',
                data: city,
                success() {
                  console.log('保存地址')
                }
              })
              uni.setStorageSync('latitude', that.latitude)
              uni.setStorageSync('longitude', that.longitude)
              that.getActivityDetail()

              // this.latitude = uni.getStorageSync('latitude')
              // this.longitude = uni.getStorageSync('longitude')
            },
            fail: function() {
              that.getActivityDetail()
              uni.showToast({
                title: '定位失败',
                duration: 2000,
                icon: 'none'
              })
            },
            complete: function() { //无论成功失败都会执行
              return
            }
          })
        },
        fail: function() {
          that.getActivityDetail()
          uni.showToast({
            title: '请打开定位',
            icon: 'error'
          })
        }
      })
    },
    // 返回
    customBack() {
      console.log(231, this.scenicId !== '')
      if(this.scenicId !== '') {
        uni.navigateBack({
          delta: 1
        })
      } else {
        uni.switchTab({
          url: '/pages/home/home' // 跳转到新页面
        })
      }
    },
    // 分享图片给好友
    shareImg() {
      uni.downloadFile({
        url: this.ballotUrl,
        success: (res) => {
          if (res.statusCode === 200) {
            uni.showShareImageMenu({
              path: res.tempFilePath,
              success: () => {
                uni.showToast({
                  title: '操作成功',
                  icon: 'none'
                })
              }
            })
          }
        }
      })


    },
    saveImg() {
      uni.downloadFile({
        url: this.ballotUrl,
        success: (res) => {
          if (res.statusCode === 200) {
            uni.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: () => {
                uni.showToast({
                  title: '图片保存成功',
                  icon: 'none'
                })
              },
              fail: () => {
                uni.showModal({
                  content:'检测到您没打开获取信息功能权限，是否去设置打开？',
                  confirmText: '确认',
                  cancelText:'取消',
                  success: (res) => {
                    if(res.confirm){
                      uni.openSetting({
                        success: (res) => {
                          console.log(res)
                          uni.showToast({
                            title: '请重新点击分享保存图片',
                            icon: 'none'
                          })
                        }
                      })
                    }else{
                      uni.showToast({
                        title: '保存失败，请打开权限功能重试',
                        icon: 'none'
                      })
                    }
                  }
                })
              }
            })
          }
        }
      })
    },
    // 是否可以进行任务
    taskFun(taskType) {
      task({
        activityId: this.activityId,
        latitude: this.latitude,
        longitude: this.longitude,
        scenicId: this.actionData.scenicList[0].scenicId,
        taskType
      }).then((res) => {
        console.log('res', res)
        if (taskType === 2) {
          uni.navigateTo({
            url:
              '/pagesAR/guide/index?scenicId=' + this.actionData.scenicList[0].scenicId
          })
        }
      })
    },
    // 跳转新的mini
    openOtherMini() {
      wx.navigateToMiniProgram({
        appId: 'wx704c3805a4dc61a9',
        path: '/package/index/commonPage/index?id=3812',
        complete: (data) => {
          console.log('data', data)
        }
      })
    },
    // 完成任务
    handleTask(item) {
      if(this.taskAllOver){
        uni.showToast({
          title: '任务已完成,请等待开奖',
          icon: 'none'
        })
        return
      }
      if (item.btnSatae !== 1) {
        if (item.id === 1) {
          uni.pageScrollTo({
            selector: '.action-btn', //你要跳转的样式位置
            duration: 300 //跳转时间段
          })
        } else if (item.id === 2) {
          this.taskFun(2)
        } else {
          this.curryTab = '2'
        }
      } else {
        uni.showToast({
          title: '此任务已完成,快去完成其他任务吧',
          icon: 'none'
        })
      }
    },
    // 获取活动详情
    async getActivityDetail() {

      console.log('经纬度', this.latitude, '维度:', this.longitude)

      this.actionData = await getActivityByActivityId({
        activityId: this.activityId,
        latitude: this.latitude,
        longitude: this.longitude,
        scenicId: this.scenicId
      })
      console.log('景区详情', this.actionData)
      if (this.actionData.ballotList) {
        const arr = new Array(7 - this.actionData.ballotList.length).fill({
          state: true
        })
        this.ballotList = [ ...this.actionData.ballotList, ...arr ]
      } else {
        const arr = new Array(7).fill({ state: true })
        this.ballotList = [ ...arr ]
      }
    },
    // 景区跳转详情
    goScenic(scenicId) {
      uni.navigateTo({
        url: '/pagesAR/guide/index?scenicId=' + scenicId
      })
    },
    // 去抽签
    checkPrivacy(item, type) {
      if(type !== 'BTN') {
        this.ballotUrl = item.ballotImage
      } else {
        if(this.residueNum === 7) {
          uni.showToast({
            title: '好运签已抽完，快去完成任务赢大奖吧',
            icon: 'none'
          })
          return
        }
      }
      console.log('item', item)
      if (item.state) {
        ballot({
          activityId: this.activityId,
          scenicId: this.scenicId,
          latitude: this.latitude,
          longitude: this.longitude
        }).then((res) => {
          console.log('抽签结果', res)
          const str = `https://minigame.shengydt.com/Game001/index.html?token=&mapId=&t=抽签&code=${res.ballotCode}`
          uni.navigateTo({
            url: '/pages/webview/index?url=' + encodeURIComponent(str) + '&decode=' + true
          })
        })
      } else {
        this.show = true
      }
    },
    // 切换tabs
    changeTab(item) {
      console.log('item', item)
      this.curryTab = item
    },

    // 分享
    shareFun() {
      share({ activityId: this.activityId })
    }
  },
  onShareTimeline() {
    if(this.isToken) {
      this.shareFun()
    }
    let path = '/pagesAction/spring/index?activityId=1'
    if(this.scenicId) {
      path = path + '&scenicId=' + this.scenicId
    }
    return {
      title: '迎新年，接好运，快来游历星河抽签赢大吧',
      imageUrl:
          'https://metaverse-uni.oss-cn-shanghai.aliyuncs.com/file/activity/share.png',
      path
    }
  },
  onShareAppMessage() {
    if(this.isToken) {
      this.shareFun()
    }
    let path = '/pagesAction/spring/index?activityId=1'
    if(this.scenicId) {
      path = path + '&scenicId=' + this.scenicId
    }
    return {
      title: '迎新年，接好运，快来游历星河抽签赢大奖吧',
      imageUrl:
          'https://metaverse-uni.oss-cn-shanghai.aliyuncs.com/file/activity/share.png',
      path
    }
  }
}
</script>


<style lang="scss">
.action-A{
  .u-collapse-head {
    font-size: 24rpx;
    font-weight: 400;
    color: #FEFEDE !important;
    .u-iconfont {
      color: #FEFEDE !important;
      font-size: 24rpx !important;
    }
  }
}
</style>
<style lang="scss" scoped>

.action-rule-content {
  padding: 30rpx 30rpx;
  max-height: 600rpx;
  .title {
    font-size: 24rpx;
    font-weight: normal;
    color: #333333;
    text-align: center;
  }
  .content {
    font-size: 20rpx;
    color: #666666;
    font-weight: normal;
    padding-bottom: 30rpx;
    .content-title {
      margin-top: 20rpx;
    }
  }
}
.mini-enter {
  position: fixed;
  z-index: 9999;
  left: 20rpx;
}
.action-rule {
  position: absolute;
  right: 27rpx;
  background: url("../../static/spring/rule.png") no-repeat;
  background-position: center center;
  background-size: cover;
  width: 80rpx;
  height: 80rpx;
  font-size: 23rpx;
  font-weight: 500;
  color: #ffffff;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  bottom: 256rpx;
  z-index: 9999;
}
.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  background: none;
  padding: 0;
  font-size: 28rpx;
  color: #fff;
  &::after {
    border: none;
    content: none;
  }
}

.action-item .action-icon {
  width: 104rpx;
  height: 106rpx;
  // margin-bottom: 24rpx;
}
.shear-img {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  // background-color: #fff;
  .shear-img-btn {
    margin-top: 20rpx;
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
}
.notice {
  position: absolute;
  width: 100%;
  // display: flex;
  // justify-content: center;
  top: 378rpx;
  padding: 0 74rpx;
}
.navbar-box {
  display: flex;
  height: 88rpx;
  line-height: 88rpx;
  align-items: center;
  color: #fff;
  font-size: 36rpx;
  top: 84rpx;
  position: absolute;
  left: 20rpx;
  position: fixed;
}
.action-not-start {
  width: 100%;
  height: 100vh;
  background: url("https://metaverse-uni.oss-cn-shanghai.aliyuncs.com/file/activity/notStart.png")
    no-repeat;
  background-position: center center;
  background-size: cover;
}
.action {
  width: 100%;
  height: 1090rpx;
  background: url("https://metaverse-uni.oss-cn-shanghai.aliyuncs.com/file/activity/springHeard.png")
    no-repeat;
  background-position: center center;
  background-size: cover;
  position: relative;
  .action-btn {
    display: flex;
    justify-content: center;
    // padding: 15rpx;
    flex-direction: column;
    align-items: center;
    position: absolute;
    // bottom: 6rpx;
    width: 100%;
    padding: 0 222rpx;
    .action-text {
      width: 330rpx;
      font-size: 24rpx;
      font-weight: 400;
      color: rgba(255, 245, 181, 1);
      text-align: center;
    }
  }
}
.action-bg {
  width: 100%;
  height: 3900rpx;
  background: url("https://metaverse-uni.oss-cn-shanghai.aliyuncs.com/file/activity/springBg.png")
    no-repeat;
  background-position: center center;
  background-size: cover;
  margin-top: -0.7rpx;
  padding-top: 30rpx;
  scroll-behavior: smooth;
  .action-bg-cneter-text {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24rpx;
    font-weight: 400;
    color: #ffffff;
  }
  .action-shear {
    display: flex;
    justify-content: center;
    margin-top: 20rpx;
  }
  .action-bg-cneter-shear {
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("https://metaverse-uni.oss-cn-shanghai.aliyuncs.com/file/activity/shearTip.png")
      no-repeat;
    background-position: center center;
    background-size: cover;
    width: 505rpx;
    height: 72.99rpx;

    .action-bg-cneter-shear-text {
      margin-right: 16rpx;
      font-size: 24rpx;
      font-weight: 400;
      color: #b46c06;
    }
    .action-bg-cneter-shear-btn {
      width: 125rpx;
      height: 50rpx;
      display: flex;
      padding: 13rpx;
      justify-content: center;
      align-items: center;
      background: url("../../static/spring/shearBtn.png") no-repeat;
      background-position: center center;
      background-size: cover;
      .action-bg-cneter-shear-btn-text {
        font-size: 24rpx;
        font-weight: 500;
        color: #ffffff;
        margin: 0;
        background: none;
        padding: 0;
        &::after {
          border: none;
          content: none;
        }
      }
      .action-bg-cneter-shear-btn-img {
        margin-left: 7rpx;
        img {
          width: 20.01rpx;
          height: 18rpx;
        }
      }
    }
  }
  .action-time {
    margin-top: 20rpx;
    display: flex;
    justify-content: center;
    // align-items: center;
    .action-time-bg {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24rpx;
      font-weight: 400;
      color: #ffffff;
      width: 441rpx;
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 17rpx;
      padding: 5rpx 18rpx;
      .action-time-bg-img {
        margin-right: 6rpx;
        margin-top: 4rpx;
        img {
          width: 21rpx;
          height: 21rpx;
        }
      }
    }
  }
  .action-tag {
    margin-top: 30rpx;
    display: flex;
    justify-content: center;
    .action-tag-bg {
      width: 702rpx;
      height: 562rpx;
      background: url("https://metaverse-uni.oss-cn-shanghai.aliyuncs.com/file/activity/tagBg.png")
        no-repeat;
      background-position: center center;
      background-size: cover;
      padding: 144rpx 42rpx 62rpx 41rpx;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
      .action-tag-bg-tag {
        width: 139rpx;
        height: 155.3rpx;
        background-position: center center;
        background-size: cover;
        .action-tag-bg-tag-text {
          font-size: 24rpx;
          font-weight: 400;
          color: #fff5b5;
          display: flex;
          justify-content: flex-end;
          flex-direction: column;
          align-items: center;
          height: 100%;
        }
      }
    }
  }
  .action-tips {
    margin-top: 69rpx;
    height: 51.26rpx;
    padding: 0 49rpx 0 45rpx;
  }
  .action-tips-sacp {
    margin-top: 4rpx;
    height: 30rpx;
    padding: 0 79rpx;
  }
  .action-tips-title {
    margin-top: 24rpx;
    display: flex;
    flex-direction: column;
    .action-tips-title-container {
      display: flex;
      justify-content: center;
      .action-tips-title-text {
        font-size: 24rpx;
        font-weight: 500;
        color: #ffffff;
        padding: 11rpx 16rpx 10rpx 16rpx;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 26rpx;
        border: 1rpx solid #ffffff;
      }
    }
    .action-tips-finish-text {
      display: flex;
      justify-content: center;
      margin-top: 10rpx;
      .action-time-bg-img {
        margin-right: 4rpx;
        margin-top: 6rpx;
        img {
          width: 21rpx;
          height: 21rpx;
        }
      }
      .text-view {
        font-size: 24rpx;
        font-weight: 500;
        color: #ffffff;
        padding: 11rpx 16rpx 10rpx 16rpx;
      }

    }
  }
  .action-prize {
    display: flex;
    justify-content: center;
    margin-top: -60rpx;
    .action-prize-bg {
      width: 661.5rpx;
      height: 841rpx;
      background: url("https://metaverse-uni.oss-cn-shanghai.aliyuncs.com/file/activity/prize.png")
        no-repeat;
      background-position: center center;
      background-size: cover;
    }
  }

  .action-prize-count {
    display: flex;
    justify-content: center;
    margin-bottom: 60rpx;
    .action-count-desc {
      width: 702rpx;
      height: 332rpx;
      background: url("https://metaverse-uni.oss-cn-shanghai.aliyuncs.com/file/activity/prize-count.png")
        no-repeat;
      background-size: contain;
    }
  }
  .action-task {
    display: flex;
    justify-content: center;
    // margin-top: 20rpx;
    .action-task-btn {
      display: flex;
      width: 65%;
      justify-content: space-around;
      .action-task-btn-text {
        width: 215rpx;
        height: 73rpx;
        font-size: 32rpx;
        font-weight: bold;
        color: #ffffff;
        text-align: center;
        background-position: center center;
        background-size: cover;
        line-height: 73rpx;
      }
    }
  }
  .action-task-content {
    display: flex;
    justify-content: center;
    .action-task-content-bg {
      width: 702rpx;
      height: 1516rpx;
      background: url("https://metaverse-uni.oss-cn-shanghai.aliyuncs.com/file/activity/taskBg.png")
        no-repeat;
      background-position: center center;
      background-size: cover;
      .action-task-content-task {
        padding: 33rpx 24rpx 24rpx 24rpx;
        .action-task-one {
          background: url("https://metaverse-uni.oss-cn-shanghai.aliyuncs.com/file/activity/task.png")
            no-repeat;
          background-position: center center;
          background-size: cover;
          width: 654rpx;
          height: 140rpx;
          margin-top: 24rpx;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .action-task-txt {
            font-size: 28rpx;
            font-weight: 500;
            color: #854c3c;
          }
          .action-task-txt-i {
            font-size: 24rpx;
            font-weight: 400;
            color: #a9724e;
          }
          .action-task-btn {
            background-position: center center;
            background-size: cover;
            width: 126rpx;
            height: 55rpx;
            font-size: 24rpx;
            font-weight: 400;
            color: #ffffff;
            line-height: 55rpx;
            text-align: center;
            margin:0 16rpx;
          }
          .img {
            width: 88rpx;
            height: 88rpx;
            background-position: center center;
            background-size: cover;
            margin:0 16rpx;
          }
        }
      }
    }
  }
  .action-sacpe {
    display: flex;
    justify-content: center;
    padding: 0 30rpx;
    margin-top: 16rpx;
  }
  .action-sacp {
    background-position: center center;
    background-size: cover;
    height: 287rpx;
    width: 100%;
    display: flex;
    margin-top: 10rpx;
    flex-direction: column;
    justify-content: flex-end;
    border-radius: 20rpx;
    .action-sacp-mask {
      display: flex;
      align-items: center;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 0rpx 0rpx 20rpx 20rpx;
      padding: 10rpx 16rpx;
      justify-content: space-between;
      .action-sacp-mask-title {
        font-size: 30rpx;
        font-family: Source Han Sans CN, Source Han Sans CN;
        font-weight: bold;
        color: #ffffff;
      }
      .action-sacp-mask-btn {
        padding: 16rpx 27rpx;
        background: #ffffff;
        border-radius: 37rpx;
      }
    }
  }
}
</style>
