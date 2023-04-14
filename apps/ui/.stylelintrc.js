module.exports = {
  plugins: ['stylelint-scss'],
  extends: ['stylelint-config-sass-guidelines', 'stylelint-config-prettier'],
  rules: {
    'color-hex-length': 'long',
    indentation: [2],
    'at-rule-no-unknown': null,
    'declaration-empty-line-before': ['always', { ignore: ['first-nested', 'after-comment', 'after-declaration'] }],
    'max-nesting-depth': null,
    'no-empty-source': null,
    'order/properties-alphabetical-order': null,
    'scss/dollar-variable-pattern': '^[a-z-]+',
    'scss/selector-no-redundant-nesting-selector': true,
  },
};
