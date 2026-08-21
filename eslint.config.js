import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  vue: true,
  typescript: true,
  // Blog posts are prose, and the code blocks inside them are verbatim quotes
  // from other repositories. The markdown formatter would re-indent and
  // re-punctuate both, so treat them as content rather than source.
  ignores: ['server/assets/blog/**'],
}, {
  files: ['**/*.vue'],
  rules: {
    'vue/operator-linebreak': ['error', 'before'],
    'vue/component-name-in-template-casing': ['error', 'kebab-case', {
      registeredComponentsOnly: false,
      ignores: [],
    }],
  },
}, {
  rules: {
    'style/semi': ['error', 'never'],
    'no-console': 'warn',
    'arrow-parens': ['error', 'as-needed'],
    'ts/ban-ts-comment': 'off',
    'style/eol-last': 'off',
    'style/arrow-parens': 'off',
    'unused-imports/no-unused-vars': 'warn',
    'node/prefer-global/process': 'off',
    'regexp/no-unused-capturing-group': ['error', { fixable: true }],
    // Wants `trustPolicy: no-downgrade` in pnpm-workspace.yaml, which rejects
    // chokidar@4.0.3 (transitive, via @netlify/blobs) and blocks pnpm install.
    'pnpm/yaml-enforce-settings': 'off',
  },
})
