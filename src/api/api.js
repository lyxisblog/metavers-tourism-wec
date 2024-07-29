/*
 * @Author: 王璇 xuan.wang@vonechain.com
 * @Date: 2023-08-17 20:37:07
 * @LastEditors: 王璇 xuan.wang@vonechain.com
 * @LastEditTime: 2024-03-12 09:08:03
 * @FilePath: /metaverse-tourism-h5/src/api/api.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from './request'

/* 图片预览 */

//登录
// export const login = (data) => {
//   return request({
//     method: 'post',
//     url: '/finance-base/login/miniLogin',
//     data
//   })
// }

//判断是否在景区
export const isInScenicSpot= (data) => {
  return request({
    method: 'post',
    url: '/front/index/isInScenicSpot',
    data
  })
}

// 微信绑定
export const wechatBinding = (data) => {
  return request({
    method: 'post',
    url: '/front/smallProgram/login/wechatBindingMini',
    data
  })
}

//景区详情无权限
export const scenicInfoNonAuth = (data) => {
  return request({
    method: 'post',
    url: '/front/foot/scenicInfoNonAuth',
    data
  })
}

//填写邀请码
export const addInviteCode = (data) => {
  return request({
    method: 'get',
    url: '/front/user/addInviteCode',
    data
  })
}

// 获取价格
export const getPrice = (data) => {
  return request({
    method: 'post',
    url: '/front/order/priceForH5',
    data
  })
}

//手机号登录注册
export const loginPhoneForH5 = (data) => {
  return request({
    method: 'post',
    url: '/front/login/phoneForH5',
    data,
    privateKey: true
  })
}

//发送验证码短信
export const sendCodeForH5 = (data) => {
  return request({
    method: 'post',
    url: '/front/sms/sendCodeForH5',
    data,
    privateKey: true
  })
}

//用户详情（使用token)
export const getUserInfoWithToken = () => {
  return request({
    method: 'get',
    url: '/front/user/getUserInfoWithToken'
  })
}

//退出
export const logout = () => {
  return request({
    method: 'post',
    url: '/front/logout'
  })
}

// ar页面详情
export const arDetail = (data) => {
  return request({
    method: 'get',
    url: '/front/order/getFootScenicUserBaseInfoByDevice',
    data
  })
}
//激活码支付
export const codeActivate = (data) => {
  return request({
    method: 'post',
    url: '/front/pay/code/activate',
    data
  })
}

//订单详情
export const getOrderInfo = (data) => {
  return request({
    method: 'post',
    url: '/front/order/info',
    data
  })
}

// 创建订单
export const createOrder = (data) => {
  return request({
    method: 'post',
    url: '/front/order/createOrder',
    data
  })
}
// 获取小程序链接
export const getGenerateUrllink = (data) => {
  return request({
    method: 'post',
    url: '/front/smallProgram/getGenerateUrllink',
    data
  })
}

// 获取支付结果
export const queryPayCmb = (data) => {
  return request({
    method: 'post',
    url: '/front/pay/cmb/query',
    data
  })
}

// 查询倒计时
export const queryFreeTime = (data) => {
  return request({
    method: 'get',
    url: '/front/order/getWebDeviceArInfo',
    data
  })
}

// 处理时间
export const dealDeviceArUseInfo = (data) => {
  return request({
    method: 'post',
    url: '/front/order/dealDeviceArUseInfo',
    data
  })
}

// 保存ar使用统计
export const saveArUseStat = (data) => {
  return request({
    method: 'post',
    url: '/front/order/saveArUseStat',
    data
  })
}

// 订单分页列表
export const getFrontOrderPage = (data) => {
  return request({
    method: 'post',
    url: '/front/pay-record/getFrontOrderPage',
    data
  })
}

// 订单详情
export const getFrontOrderDetail = (data) => {
  return request({
    method: 'post',
    url: '/front/pay-record/getFrontOrderDetail',
    data
  })
}


// 小程序一键登录
export const wechatMiniLogin = (data) => {
  return request({
    method: 'post',
    url: '/front/login/wechatMiniLogin',
    data,
    privateKey: true
  })
}

// 神策数据埋点配置地址
export const appSystemConfig = (data) => {
  return request({
    method: 'get',
    url: '/front/setting/appSystemConfig',
    data,
    privateKey: true
  })
}