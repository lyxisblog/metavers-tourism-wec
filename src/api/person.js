/*
 * @Author: 王璇 xuan.wang@vonechain.com
 * @Date: 2023-10-24 11:29:51
 * @LastEditors: 王璇 xuan.wang@vonechain.com
 * @LastEditTime: 2023-11-02 16:30:32
 * @FilePath: /metaverse-tourism-h5/src/api/position.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import request from './request'

//保存个人位置
export const saveFeedBack = (data) => {
  return request({
    method: 'post',
    url: '/front/feedBack/saveFeedBack',
    data
  })
}

// 收益记录
export const incomeInfo = () => {
  return request({
    method: 'get',
    url: '/front/income/info'
  })
}

//邀请记录
export const incomeRecord = (data) => {
  return request({
    method: 'post',
    url: '/front/income/incomeRecord',
    data,
    privateKey: true
  })
}

//资金记录
export const withdrawRecord = (data) => {
  return request({
    method: 'post',
    url: '/front/income/withdrawRecord',
    data,
    privateKey: true
  })
}
// user/getUserWalletBalance

// 获取用户余额
export const getUserWalletBalance = (data) => {
  return request({
    method: 'get',
    url: '/front/user/getUserWalletBalance',
    data
    // privateKey: true
  })
}