module.exports = {
  root: true,
  ignorePatterns: ['coverage/**/*', 'src/assets/fonts', 'src/locale', 'node_modules'],
  plugins: ['html'],
  settings: {
    'html/html-extensions': ['.html'],
    'html/indent': '0',
    'html/report-bad-indent': 'error',
  },
  rules: {
    'array-bracket-newline': ['error', { minItems: 2 }],
    'array-element-newline': ['error', { minItems: 2 }],
    'quote-props': ['error', 'consistent-as-needed'],
    semi: 'error',
  },
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['tsconfig.eslint.json'],
        createDefaultProgram: true,
      },
      extends: [
        'plugin:@angular-eslint/ng-cli-compat',
        'plugin:@angular-eslint/ng-cli-compat--formatting-add-on',
        'plugin:@angular-eslint/template/process-inline-templates',
      ],
      rules: {
        'id-length': ['warn', { min: 2 }],
        'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'app',
            style: 'kebab-case',
          },
        ],
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'app',
            style: 'camelCase',
          },
        ],
        '@typescript-eslint/quotes': ['error', 'single', { allowTemplateLiterals: true }],
      },
    },
    {
      files: ['*.js'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {
        quotes: ['error', 'double'],
      },
    }
  ],
};
