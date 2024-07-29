/*
 * @Author: 王璇 xuan.wang@vonechain.com
 * @Date: 2023-10-16 11:24:42
 * @LastEditors: 王璇 xuan.wang@vonechain.com
 * @LastEditTime: 2023-10-26 17:56:34
 * @FilePath: /metaverse-tourism-h5/.eslintrc.js
 * @Description: 这是默认设置,请设置`customMade`,
 * 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/recommended'
  ],
  'globals': {
    'swan': 'readonly',
    'wx': 'readonly',
    'uni': 'readonly'
  },
  'overrides': [
    {
      'env': {
        'node': true
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script'
      }
    }
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    'vue'
  ],
  'rules': {
    // 'vue/max-attributes-per-line': [2, {
    //   'singleline': 10,
    //   'multiline': {
    //     'max': 1,
    //     'allowFirstLine': false
    //   }
    // }],

    'vue/multi-word-component-names': 0,
    eqeqeq: [ 'error', 'always', { null: 'ignore' } ], // 强制使用 === 和 !==
    '@typescript-eslint/no-explicit-any': [ 'off' ],
    '@typescript-eslint/no-var-requires': 'off',
    'space-before-function-paren': 'off',
    'block-spacing': [ 2, 'always' ],
    'operator-linebreak': [ 2, 'after', {
      'overrides': {
        '?': 'before',
        ':': 'before'
      }
    } ],
    'semi': [ 2, 'never' ],
    'semi-spacing': [ 2, {
      'before': false,
      'after': true
    } ],
    'arrow-spacing': [ 2, {
      'before': true,
      'after': true
    } ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'object-curly-spacing': [ 'error', 'always' ],
    'no-delete-var': 2,
    'no-func-assign': 2,
    'no-irregular-whitespace': 2,
    'no-multi-spaces': 1,
    'no-undef': 2,
    'no-unused-vars': 1,
    'no-var': 2,
    'prefer-const': 2,
    'prefer-rest-params': 2,
    'prefer-spread': 2,
    'quotes': [ 1, 'single' ],
    'require-yield': 2,
    'yield-star-spacing': [ 2, 'both' ],
    'no-console': 'off',
    'no-debugger': 'off',
    'no-unused-expressions': 'off',
    'no-empty': 'off',
    'no-unreachable': 'off',
    'no-shadow': 'off',
    'no-shadow-restricted-names': 'off',
    'no-trailing-spaces': 2,
    'indent': [ 2, 2 ], //缩进风格
    'comma-dangle': [ 2, 'never' ],
    'comma-spacing': [ 2, {
      'before': false,
      'after': true
    } ]
  }
}
