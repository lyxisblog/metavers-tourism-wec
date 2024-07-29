/*
 * @Author: 王璇 xuan.wang@vonechain.com
 * @Date: 2023-05-25 10:49:25
 * @LastEditors: 王璇 xuan.wang@vonechain.com
 * @LastEditTime: 2023-11-07 13:38:15
 * @FilePath: /metaverse-tourism-h5/vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
const name = 'metaverse-tourism-weCht'
module.exports = {
  lintOnSave: process.env.NODE_ENV === 'development',
  transpileDependencies: [ 'uview-ui' ],
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        '@i': resolve('src/api'),
        '@c': resolve('src/components'),
        '@a': resolve('src/static'),
        '@s': resolve('src/styles'),
        '@u': resolve('src/utils'),
        '@v': resolve('src/pages')
      }
    }
  }
}
