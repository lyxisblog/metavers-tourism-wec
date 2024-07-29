/**
 * 格式化金额
 * @param {string | number} num 金额
 * @param {boolean} thousands 是否开启千分位
 * @param {number} decimal 小数位，默认保留后两位
 * @returns {string} 格式化后的金额
 */
export const formatPrice = (num, thousands = false, decimal = 2) => {
  if (num === undefined || num === null || num === '') num = 0
  let price = Number(num).toFixed(decimal)
  if (thousands) price = price.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  return price
}

export const parseDictData = (
  dictData,
  value,
  // 解析属性
  parseAttr = 'label'
) => {
  let res = '--'
  if (typeof value === 'number') {
    value = String(value)
  }
  (dictData || []).forEach((item) => {
    if (item.children && item.children.length) {
      res = parseDictData(dictData, value)
    } else if (item.value === value) {
      res = item[parseAttr]
    }
  })
  return res
}
export const parseCityData = (data, codes, split, options) => {
  const names = []
  const defaultOptions = {
    value: 'code',
    label: 'name',
    children: 'children'
  }
  if (options) {
    Object.keys(options).forEach((k) => {
      if (options[k]) {
        defaultOptions[k] = options[k]
      }
    })
  }
  codes.forEach((code) => {
    if (code) {
      const find = data.find(
        (item) => item[defaultOptions.value] === `${code}`
      )
      if (find) {
        names.push(find[defaultOptions.label])
        data = find[defaultOptions.children]
      } else {
        throw new Error(
          `未找到code:{${code}}对应城市数据，请检查数据是否正确。`
        )
      }
    }
  })
  return names.join(split || '')
}

export const arrayToTree = (list, options) => {
  const defaultOptions = {
    parentId: 'pid',
    id: 'id',
    label: 'label',
    hasEmptyChildren: true
  }

  const ops = { ...defaultOptions, ...options }
  const result = []
  const itemMap = {}

  list.forEach((item) => {
    const id = item[ops.id]
    const pid = item[ops.parentId]

    if (!itemMap[id]) {
      itemMap[id] = { children: ops.hasEmptyChildren ? [] : null }
    }

    itemMap[id] = {
      ...item,
      children: itemMap[id].children
    }

    const treeItem = itemMap[id]

    if (!pid || +pid === 0) {
      result.push(treeItem)
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = { children: [] }
      }
      if (!itemMap[pid].children) {
        itemMap[pid].children = []
      }
      itemMap[pid].children.push(treeItem)
    }
  })
  return result
}

export const toDecimal2 = (x) => {
  let f_x = parseFloat(x)
  if (isNaN(f_x)) {
    return 0
  }
  f_x = Math.round(x*100)/100
  let s_x = f_x.toString()
  let pos_decimal = s_x.indexOf('.')
  if (pos_decimal < 0){
    pos_decimal = s_x.length
    s_x += '.'
  }
  while (s_x.length <= pos_decimal + 2){
    s_x += '0'
  }
  return s_x
}

/**
 * @description: 截取小数6位数
 * @param {*} value
 * @return {*}
 */
export const getBit = (value) => {
  const reg = /([0-9]+\.[0-9]{6})[0-9]*/
  let str = value.toString()
  str = str.replace(reg, '$1')
  return str
}