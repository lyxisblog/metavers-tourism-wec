/*
 * @Author: 王璇 xuan.wang@vonechain.com
 * @Date: 2023-10-24 17:49:10
 * @LastEditors: 王璇 xuan.wang@vonechain.com
 * @LastEditTime: 2023-10-27 16:24:18
 * @FilePath: /metaverse-tourism-h5/src/utils/EAS.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 简单封装一下
 */

import JSEncrypt from 'jsencrypt'
// import { encode, decode } from 'js-base64'

const RSA = {
  //RSA 位数，这里要跟后端对应
  // bits: 1024,

  //当前JSEncrypted对象
  thisKeyPair: {},
  //生成密钥对(公钥和私钥)
  // genKeyPair: function (bits = RSA.bits) {
  //   const genKeyPair = {}
  //   RSA.thisKeyPair = new JSEncrypt({default_key_size: bits})

  //   //获取私钥
  //   genKeyPair.privateKey = RSA.thisKeyPair.getPrivateKey()

  //   //获取公钥
  //   genKeyPair.publicKey = RSA.thisKeyPair.getPublicKey()

  //   return genKeyPair
  // },

  //公钥加密
  encrypt: function (plaintext, publicKey) {
    RSA.thisKeyPair = new JSEncrypt()
    if (plaintext instanceof Object) {
      plaintext = JSON.stringify(plaintext)
    }
    RSA.thisKeyPair.setPublicKey(publicKey)
    return RSA.thisKeyPair.encrypt(JSON.stringify(plaintext))
  },

  //私钥解密
  decrypt: function (ciphertext, privateKey) {
    RSA.thisKeyPair = new JSEncrypt()
    privateKey && RSA.thisKeyPair.setPrivateKey(privateKey)
    let decString = RSA.thisKeyPair.decrypt(ciphertext)
    if(decString.charAt(0) === '{' || decString.charAt(0) === '[' ){
      decString = JSON.parse(decString)
    }
    return decString
  }
}

export default RSA