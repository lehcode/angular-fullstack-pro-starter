module.exports = {
  singleQuote: true,
  semi: true,
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'none',
  printWidth: 120,
  overrides: [
    {
      files: ['*.js'],
      options: {
        trailingComma: 'es5',
      },
    },
    {
      files: ['*.ts'],
      options: {
        parser: 'typescript',
      },
    },
    {
      files: ['*.json'],
      options: {
        singleQuote: false,
      },
    },
  ],
};
