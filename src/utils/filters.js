/*
 * @Author: 王璇 xuan.wang@vonechain.com
 * @Date: 2023-10-24 13:38:16
 * @LastEditors: 王璇 xuan.wang@vonechain.com
 * @LastEditTime: 2023-10-30 17:12:42
 * @FilePath: /metaverse-tourism-h5/src/utils/filters.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */




const filters = {

  /**
   * @description: 过滤金额
   * @param {*} str
   * @return {*}
   */
  splitValue(str, tage) {
    if(str){
      return str.split('.')[tage]
    }
  },

  /**
   * @description: 支付类型
   * @param {*} str
   * @return {*}
   */
  payType(str){
    if(str){
      const data = {
        0: '微信',
        1: '支付宝',
        2: '银行卡'
      }
      return data[str]
    }
  }
}

export default filters


