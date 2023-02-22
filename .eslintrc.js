/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  parser: 'vue-eslint-parser',
  rules: {
    'no-irregular-whitespace': 'off',
    'linebreak-style': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    quotes: [2, 'single', { avoidEscape: true }],
    'jsx-quotes': [2, 'prefer-double'],
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        semi: true,
        tabWidth: 2,
        trailingComma: 'es5',
        arrowParens: 'avoid',
        endOfLine: 'auto',
        printWidth: 100,
      },
    ],
  },
};
