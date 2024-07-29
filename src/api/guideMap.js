import request from './request'

// 以下AR接口需要privateKey字段
// "/third/ar/getFootScenicUserBaseInfo",
// "/third/ar/getFootScenicUserBaseInfoNonAuth",
// "/third/ar/getFootScenicUserBaseInfoByDevice",
// "/api/upload/file"

// 核销优惠券
export const verifyCoupon= (data) => {
  return request({
    method: 'post',
    url: '/front/coupon/verifyCoupon',
    data
  })
}


// 使用优惠券
export const useCoupon = (data) => {
  return request({
    method: 'post',
    url: '/front/coupon/useCoupon',
    data
  })
}

// 领取优惠券
export const receiceCoupon = (data) => {
  return request({
    method: 'post',
    url: '/front/coupon/receiceCoupon',
    data
  })
}

// 优惠券中心
export const getCouponList = (data) => {
  return request({
    method: 'post',
    url: '/front/coupon/couponCenterPage',
    data
  })
}

//获取分享海报图片
export const getSharePostPage = (id) => {
  return request({
    url: `/front/user/getShareImageWithWechatProgram?scenicId=${id}`
  })
}

// 设备获取ar基础信息
export const arDetail = (data) => {
  return request({
    url: '/third/ar/getFootScenicUserBaseInfoByDevice',
    data: { ...data, type: 3 },
    privateKey: true
  })
}

// 处理设备ar使用时长
export const dealDeviceArUseInfo = (data) => {
  return request({
    method: 'post',
    url: '/third/ar/dealDeviceArUseInfo',
    data
  })
}

// 保存默认足迹
export const saveDefaultFoot = (data) => {
  return request({
    method: 'post',
    url: '/front/foot/saveDefaultFoot',
    data
  })
}

// 处理订单是否识别点位
export const dealOrderStatus = (data) => {
  return request({
    method: 'post',
    url: '/third/ar/dealOrderStatus',
    data
  })
}

// 记录ar坐标
export const saveCoordinate = (data) => {
  return request({
    method: 'post',
    url: '/third/ar/saveCoordinate',
    data
  })
}

// 记录ar停留时长
export const saveCoordinateTime = (data) => {
  return request({
    method: 'post',
    url: '/third/ar/saveCoordinateTime',
    data
  })
}

// 获取分享用的景区图片
export const getShareScenic = (data) => {
  return request({
    url: '/front/user/getShareScenic',
    data
  })
}

// 获取当前用户某景点是否显示过新手引导页面
export const getFresherGuide = (data) => {
  return request({
    method: 'post',
    url: '/third/ar/getOperationalGuideline',
    data
  })
}

// 保存【新手引导页面]已经展示过
export const saveFresherGuide = (data) => {
  return request({
    method: 'post',
    url: '/third/ar/saveOperationalGuideline',
    data
  })
}

export const getDownloadAppUrl = () => {
  return request({
    url: '/admin/statistics/getDownloadUrl'
  })
}

