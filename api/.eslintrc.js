module.exports = {
  root: true,
  ignorePatterns: ["dist", "node_modules"],
  plugins: [],
  rules: {
    "indent": ["error",
      2,
      { SwitchCase: 1 }],
    "array-bracket-newline": ["warn", "consistent"],
    "array-element-newline": ["warn", "consistent"],
    "function-call-argument-newline": ["warn", "consistent"],
    "function-paren-newline": ["warn", "consistent"],
    "quotes": ["error", "double"],
    "quote-props": ["error", "consistent"],
    "semi": "error",
  },
  parser: "@typescript-eslint/parser",
  overrides: [
    {
      files: ["*.ts"],
      parserOptions: {
        project: ["tsconfig.json"],
        createDefaultProgram: true,
      },
      extends: [
        "plugin:@typescript-eslint/recommended", "prettier/@typescript-eslint"
      ],
      rules: {
        "id-length": ["warn", { min: 2 }],
        "newline-per-chained-call": ["warn", { ignoreChainWithDepth: 2 }],
        "quotes": ["error", "single"],
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/explicit-function-return-type": "warn",
        "@typescript-eslint/explicit-module-boundary-types": "warn",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/quotes": [
          "warn",
          "single",
          { allowTemplateLiterals: true }
        ],
      },
    },
  ],
};
