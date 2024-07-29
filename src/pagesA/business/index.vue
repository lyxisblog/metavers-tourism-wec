<template>
  <view>
    <view class="content">
      <image
        class="img"
        src="/static/images/bgtop.png"
      >
        <view class="top-text">
          <view class="top-text-zn">
            一流的文旅元宇宙服务提供商和平台运营商
          </view>
          <view class="top-text-in">
            A first-class cultural and tourism metaverse service provider and platform operator
          </view>
        </view>
      </image>
      <view class="box-content">
        <view class="box-content-text">
          <view class="title">
            公司简介
          </view>
          <p>盛阳伍月集上海高新技术企业旺链科技和指旺科技研发力量、产研成果等优势，致力于构建文旅元宇宙新场景，利用AR、VR、MR、裸眼3D、AI等技术打破时空壁垒，打造沉浸式虚拟空间与现实世界交融充满想象力的世界。突破创新，推进文旅企业在文化+科技+旅游的高质量发展。</p>
          <view style="margin-top:32px">
            <view
              v-for="(p, index) in list"
              :key="index"
              class="title-content"
            >
              <view class="title-icon">
                {{ p.lable }}:
              </view>
              <view class="title-icon-text">
                {{ p.title }}
              </view>
            </view>
          </view>
        </view>
        <view class="content-fooler">
          <image src="/static/images/bgbottom.png" />
          <view class="content-fooler-text">
            <view class="fooler-title">
              盛阳伍月
            </view>
            <view
              v-for="(p, index) in footList"
              :key="index"
              class="fooler-title-content"
            >
              <view class="title-icon">
                <image :src=" p.icon" />
              </view>
              <view class="title-vuale">
                {{ p.title }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { lable: '使命', title: '赋能文旅企业' },
        { lable: '愿景', title: '做中国文旅产业转型升级的制造者' },
        { lable: '目标', title: '全国一流的文旅元宇宙服务提供商和平台运营商' }
      ],
      footList: [
        { icon: '/static/images/tel.png', title: '400-867-5999' },
        { icon: '/static/images/tim.png', title: '工作日 9:30-18:00' },
        { icon: '/static/images/em.png', title: 'sykf@shengydt.com' },
        { icon: '/static/images/addrss.png', title: '上海市宝山区长江西路2687号' }
      ]
    }

  },
  onLoad() {

  },
  methods: {
    clickGo(path) {
      uni.navigateTo({
        url: path
      })
    }
  }
}
</script>

<style scoped lang="scss">
	.content {
		position: relative;
		.img{
			width: 100%;
			height: 210px;
			position: relative;
		}
		.top-text{
			position:absolute;
			top:41px;
			padding: 0px 32px;
			font-family: Alibaba PuHuiTi-Regular, Alibaba PuHuiTi;
			font-weight: 400;
			color: #FFFFFF;
			text-shadow: 0px 0px 2px rgba(0,89,191,0.32);

			.top-text-zn{
				font-size: 22px;
				line-height: 32px;
				font-family: Helvetica-Regular, Helvetica;
			}
			.top-text-in{
				font-size: 14px;
				line-height: 14px;
				margin-top:4px;
			}

		}
	}
	.box-content{
		position:absolute;
		padding: 0px 16px;
		top: 74%;
		.box-content-text{
			padding: 20px 16px 0px 16px;
			background-color: #fff;
			border-top-right-radius: 8px;
			border-top-left-radius: 8px;
		}
		.title{
			font-size: 20px;
			font-family: PingFang SC-Bold, PingFang SC;
			font-weight: bold;
			color: #333333;
			line-height: 13px;
			padding-bottom: 20px;
		}
		p{
			font-size: 16px;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
			line-height: 25px;
		}
		.title-content{
			display: flex;
			padding: 4px 0px;
		}
		.title-icon{
			font-size: 16px;
			font-family: PingFang SC-Bold, PingFang SC;
			font-weight: bold;
			color: #333333;
			line-height: 23px;
			width: 50px;
		}
		.title-icon-text{
			font-size: 16px;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;
			line-height: 23px;
		}
	}
	.content-fooler{
		position: relative;
		background-color: #fff;
		width: 100%;
		border-bottom-right-radius: 8px;
		border-bottom-left-radius: 8px;
		image{
			width: 100%;
			height: 232px;
			position: relative;
		}
		.content-fooler-text{
			position:absolute;
			top: 84px;
			display: flex;
			flex-direction: column;
			align-items: left;
			justify-content: center;
			margin-left: 42px;
			.fooler-title{
				font-size: 16px;
				font-family: PingFang SC-Bold, PingFang SC;
				font-weight: bold;
				color: #FFFFFF;
				line-height: 9px;
				padding-bottom: 9px;
			}
			.fooler-title-content{
				display: flex;
				.title-icon{
					width: 14px;
					height: 14px;
					display: block;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.title-vuale{
					font-size: 12px;
					font-family: Helvetica-Regular, Helvetica;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 23px;
					margin-left: 9px;
				}
			}

		}
	}
</style>
