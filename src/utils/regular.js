/**
 * 常用正则表达式
 */

/**
 * 手机号码（2021年现有号段）
 */
export const mobile = /^1\d{10}$/

/**
  * 密码 6-18位 只能包含字母、数字、_、@
  */
export const password = /[_@a-zA-Z0-9]{6,18}$/
/**
  * 电话号码
  */
export const phone = /(^\d{3,4}-\d{6,8}$)|(^1\d{10}$)/

/**
  * 姓名
  */
export const realName = /^[a-z\u4E00-\u9Fa5]{1,20}$/i

/**
  * 统一社会信用代码
  */
export const creditCode =
   /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/

/**
  * 统一社会信用代码（宽松）
  */
export const looseCreditCode =
   /^(([0-9A-Za-z]{15})|([0-9A-Za-z]{18})|([0-9A-Za-z]{20}))$/

/**
  * base64
  */
export const base64 =
   /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i

/**
  * 视频url
  */
export const videoUrl =
   /^https?:\/\/(.+\/)+.+(\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4))$/i

/**
  * 图片url
  */
export const imageUrl =
   /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i

/**
  * 一代身份证号码
  */
export const firstGenerationIDCard =
   /^[1-9]\d{7}(?:0\d|10|11|12)(?:0[1-9]|[1-2][\d]|30|31)\d{3}$/

/**
  * 二代身份证号码
  */
export const secondGenerationIDCard =
   /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/

/**
  * 身份证号码
  */
export const IDCard =
   /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/

/**
  * 香港身份证
  */
export const IDCardHK = /^[a-zA-Z]\d{6}\([\dA]\)$/
/**
  * 台湾身份证
  */
export const IDCardTWN = /^[a-zA-Z][0-9]{9}$/
/**
  * 澳门身份证
  */
export const IDCardMO = /^[1|5|7]\d{6}[(\d)]{3}$/

/**
  * 护照号码(包含香港、澳门)
  */
export const passport =
   /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/

/**
  * 中文/汉字
  */
export const ChineseCharacters =
   /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/

/**
  * 小数
  */
export const decimal = /^\d+\.\d+$/

/**
  * 数字
  */
export const number = /^\d{1,}$/

/**
  * QQ号码
  */
export const qq = /^[1-9][0-9]{4,10}$/

/**
  * 数字和字母
  */
export const numbersAndLetters = /^[A-Za-z0-9]+$/

/**
  * 字母
  */
export const letters = /^[a-zA-Z]+$/

/**
  * 字母
  */
export const capitalLetters = /^[A-Z]+$/

/**
  * ipv4
  */
export const ipv4 =
   /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$/

/**
  * ipv6
  */
export const ipv6 =
   /^(?:(?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))|\[(?:(?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))\](?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$/i

/**
  * 16进制颜色
  */
export const hexColor = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/

/**
  * 中国邮政编码
  */
export const postalCode =
   /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/

/**
  * 数字货币
  */
export const price = /^-?\d+(,\d{3})*(\.\d{1,2})?$/

/**
  * 银行卡号
  */
export const bankCode = /^[1-9]\d{9,29}$/

/**
  * 车牌（新能源）
  */
export const licensePlateByNewEnergy =
   /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z](?:((\d{5}[A-HJK])|([A-HJK][A-HJ-NP-Z0-9][0-9]{4}))|[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳])$/

/**
  * 车牌（普通/燃油车）
  */
export const licensePlateByCommon =
   /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]$/

/**
  * 车牌号
  */
export const licensePlate =
   /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/

// 密码复杂校验 数字字母混搭 6到18位 位数如果有变化 修改最后的6和18
export const loginPassWord = /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,18}$/
// 正整数
export const positiveWholeNumber = /^([1-9]\d*)$/
// 大于等于0的正整数
export const IntegerPlusRegex = /^([1-9]\d*|0)$/
// 大于等于0正数 两位小数
export const moneyRegex = /^(([1-9]{1}\d*)|(0))(\.\d{1,2})?$/
// 大于0 两位小数
export const moneyZrex = /(^([1-9]{1}\d*)(\.\d{1,2})?$)|(^0\.\d{1,2}?$)/
// 可以为负数
export const moneyNegativeRegex = /^((-?[1-9]{1}\d*)|(-?0{1}))(\.\d{1,2})?$/
// 小于100的 百分数
export const percentageRegex =
   /^(((\d|[1-9]\d)(\.\d{1,2})?)|100|100.0|100.00)$/
// 小于100不包含0
export const percentageRegex2 =
   /^((([1-9]|[1-9]\d)(\.\d{1,2})?)|(0\.\d{1,2})|100|100.0|100.00)$/
// 邮箱
export const emailRegex = /^.+@.+\..+$/
// 邮政编码
export const zipCodeReg = /^[0-9]{6}$/
// 传真
export const faxNumberReg = /^(?:\d{3,4}-)?\d{7,8}(?:-\d{1,6})?$/
