/*
 * @Author: 王璇 xuan.wang@vonechain.com
 * @Date: 2024-01-15 09:45:18
 * @LastEditors: 王璇 xuan.wang@vonechain.com
 * @LastEditTime: 2024-01-16 15:45:25
 * @FilePath: /metaverse-tourism-h5/src/api/action.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from './request'

//活动详情
export const getActivityByActivityId = (data) => {
  return request({
    method: 'get',
    url: '/front/activity/info/getActivityByActivityId',
    data
  })
}
// 活动列表
export const getActivityList = (params) => {
  return request({
    method: 'get',
    url: '/front/activity/info/getActivityList',
    params
  })
}
//活动抽签
export const ballot = (data) => {
  return request({
    method: 'post',
    url: '/front/activity/attend/ballot',
    data
  })
}
// 用户是否可以进行任务
export const task = (data) => {
  return request({
    method: 'post',
    url: '/front/activity/attend/task',
    data
  })
}
// 分享增加抽奖次数
export const share = (data) => {
  return request({
    method: 'get',
    url: '/front/activity/attend/share',
    data
  })
}
