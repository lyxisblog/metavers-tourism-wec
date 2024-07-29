/*
 * @Author: 王璇 xuan.wang@vonechain.com
 * @Date: 2023-10-24 14:47:27
 * @LastEditors: 王璇 xuan.wang@vonechain.com
 * @LastEditTime: 2023-10-27 16:45:13
 * @FilePath: /metaverse-tourism-h5/src/utils/ARS.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import CryptoJS from 'crypto-js'
// import { encode, decode } from 'js-base64'

const AES = {
  /**
   * @description: 随机生成字符串
   * @param {number} length 位数
   * @return {*} 生成结果
   */
  genKey : function (length = 32) {
    const random = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let str = ''
    for (let i = 0; i < length; i++) {
      str = str + random.charAt(Math.random() * random.length)
    }
    return str
  },

  /**
   * @description: AES加密
   * @param {*} plaintext 需要加密的内容
   * @param {*} key key
   * @return {*} 加密结果
   */
  encrypt: function (plaintext, key, iv='metaverseIvDatas') {
    if (plaintext instanceof Object) {
      plaintext = JSON.stringify(plaintext)
    }
    const keyHex = CryptoJS.enc.Utf8.parse(key) //
    const ivHex = CryptoJS.enc.Utf8.parse(iv)
    const plaintextHex = CryptoJS.enc.Utf8.parse(plaintext)
    const encrypted = CryptoJS.AES.encrypt(plaintextHex, keyHex, {
      iv: ivHex,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    })
    return encrypted.toString()// base64结果
  },
  /**
   * @description: AES解密
   * @param {*} plaintext 加密内容
   * @param {*} key 解密key
   * @return {*} 解密结果
   */
  decrypt:  function (plaintext, key, iv='metaverseIvDatas') {
    const keyHex = CryptoJS.enc.Utf8.parse(key)
    const ivHex = CryptoJS.enc.Utf8.parse(iv)
    const decrypt = CryptoJS.AES.decrypt(plaintext, keyHex, {
      iv: ivHex,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    })
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8).toString().trim()
    const lastBraceIndex = decryptedStr.lastIndexOf('}')
    if (lastBraceIndex !== -1) {
      decryptedStr = decryptedStr.slice(0, lastBraceIndex + 1)
    }
    if(decryptedStr.charAt(0) === '{' || decryptedStr.charAt(0) === '[' ){
      decryptedStr = JSON.parse(decryptedStr)
    }
    return decryptedStr
  }

}

export default AES

