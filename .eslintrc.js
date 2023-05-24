module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended'],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/no-use-v-if-with-v-for': 'off',
    'vue/multi-word-component-names': 'off',
    'no-console': 'off'
  }
}
