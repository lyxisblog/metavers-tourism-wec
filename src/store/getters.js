/*
 * @Author: 王璇 xuan.wang@vonechain.com
 * @Date: 2023-10-18 13:56:49
 * @LastEditors: 王璇 xuan.wang@vonechain.com
 * @LastEditTime: 2024-03-14 09:59:11
 * @FilePath: /metaverse-tourism-h5/src/store/getters.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const getters = {
  roles: state => state.user.roles,
  isToken: state => state.user.isToken,
  cityStr: state => state.user.cityStr
}
export default getters