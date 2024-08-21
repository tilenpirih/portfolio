import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    typescript: true,
    formatters: {
      css: true,
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/operator-linebreak': ['error', 'before'],
      'vue/component-name-in-template-casing': ['error', 'kebab-case', {
        registeredComponentsOnly: false,
        ignores: [],
      }],
    },
  },
  {
    rules: {
      'style/semi': ['error', 'never'],
      'no-console': 'warn',
      'arrow-parens': ['error', 'as-needed'],
      'ts/ban-ts-comment': 'off',
      'node/prefer-global/process': 'off',
      'style/eol-last': 'off',
      'style/arrow-parens': 'off',
    },
  },
)
