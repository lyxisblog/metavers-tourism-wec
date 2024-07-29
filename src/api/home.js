import request from './request'

//景区列表
export const getScenicPage = (data) => {
  return request({
    method: 'get',
    url: '/front/index/getScenicPage',
    data
  })
}


// 获取数据
export const getList = (data) => {
  return request({
    method: 'get',
    url: '/WeChat/PluginRepositories/listOfScenicSpots.json',
    data,
    privateKey: false
  })
}

//已购列表
export const purchasedFoot = (data) => {
  return request({
    method: 'get',
    url: '/front/foot/purchasedFoot',
    data
  })
}

//保存个人位置
export const saveUserAddress = (data) => {
  return request({
    method: 'post',
    url: '/front/saveUserAddress',
    data
  })
}

//特定景区的推送消息
export const noticeNeaOne = (data) => {
  return request({
    method: 'post',
    url: '/front/notice/near-one',
    data
  })
}

//获取用户是否点赞
export const scenicLikeGetLike = (data) => {
  return request({
    method: 'post',
    url: '/front/scenicLike/getLike',
    data
  })
}

//点赞/取消点赞
export const scenicLikeSave = (data) => {
  return request({
    method: 'post',
    url: '/front/scenicLike/save',
    data
  })
}