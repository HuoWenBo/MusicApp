module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  plugins: ['html'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2021
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended']
}
