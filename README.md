<!--
 * @Author: 王璇 xuan.wang@vonechain.com
 * @Date: 2023-05-25 10:49:25
 * @LastEditors: 王璇 xuan.wang@vonechain.com
 * @LastEditTime: 2023-11-13 10:37:43
 * @FilePath: /metaverse-tourism-h5/README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# metaverse-tourism-wechat

## 初始化

```js
npm install
```

### 本地运行

```js
npm run dev
```

### 打包

```js
npm run build
```

### 技术栈

1. vue2
2. uView
3. uniapp
4. eslint

### 路径别名

``` js
  详情见：vue.config.js

```

### 与AR的交互

```js

1. '/pagesA/active/index' 已购买/已激活 入参:  state: 1 已购买 0 已激活  payNo: 订单编号
2.  '/pagesPerson/pay/index'  支付页面 入参: scenicId 景区id
3. '/pagesA/activation/index' 激活页面 入参: scenicId 景区id

```
