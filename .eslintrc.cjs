module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential'
  ],
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
    'parser': '@typescript-eslint/parser',
    'sourceType': 'module'
  },
  'plugins': [
    '@typescript-eslint',
    'vue'
  ],
  'rules': {  
    'eqeqeq':'warn',  // 要求使用 === 和 !==      
    'no-dupe-args': 'error', // 禁止 function 定义中出现重名参数      
    'no-dupe-keys': 'error', // 禁止对象字面量中出现重复的 key      
    'no-eval': 'error', // 禁用 eval()      
    'no-self-compare': 'error', // 禁止自身比较      
    'no-self-assign': 'error', // 禁止自我赋值      
    'no-unused-vars': 'error',  // 禁止出现未使用过的变量      
    'no-const-assign': 'error',  // 禁止修改 const 声明的变量      
    'no-func-assign': 'error',  // 禁止对 function 声明重新赋值      
    'camelcase': 'error',  // 强制使用骆驼拼写法命名约定      
    'no-mixed-spaces-and-tabs': 'error', //禁止混用tab和空格      
    'indent': ['warn', 2], //缩进风格这里不做硬性规定，但是产品组内要达成统一      
    'quotes': ['warn', 'single'], //要求引号类型 `` ' ''      
    'semi': ['error', 'always'], //语句强制分号结尾    
  }
};
