module.exports = {
  singleQuote: true,
  semi: true,
  tabWidth: 2,
  useTabs: false,
  trailingComma: "none",
  printWidth: 140,
  overrides: [
    {
      files: ["*.html"],
      options: {
        useTabs: true,
        tabWidth: 4
      }
    },
    {
      files: ["*.js"],
      options: {
        singleQuote: false
      }
    },
    {
      files: ["*.ts"],
      options: {
        parser: "typescript",
        singleQuote: false
      }
    },
    {
      files: ["*.json"],
      options: {
        singleQuote: false
      }
    }
  ]
};
