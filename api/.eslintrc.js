module.exports = {
  root: true,
  ignorePatterns: [
    "dist",
    "node_modules"
  ],
  plugins: [],
  rules: {
    "array-bracket-newline": [
      "error",
      { minItems: 2 }
    ],
    "array-element-newline": [
      "error",
      { minItems: 2 }
    ],
    "quote-props": [
      "error",
      "consistent-as-needed"
    ],
    "semi": "error"
  },
  overrides: [
    {
      files: ["*.ts"],
      parserOptions: {
        project: ["tsconfig.json"],
        createDefaultProgram: true
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "prettier/@typescript-eslint"
      ],
      rules: {
        "id-length": [
          "warn",
          { min: 2 }
        ],
        "newline-per-chained-call": [
          "warn",
          { ignoreChainWithDepth: 2 }
        ],
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/explicit-function-return-type": "warn",
        "@typescript-eslint/explicit-module-boundary-types": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/quotes": [
          "warn",
          "single",
          { allowTemplateLiterals: true }
        ]
      }
    },
    {
      files: ["*.js"],
      rules: {
        quotes: [
          "error",
          "double"
        ]
      }
    }
  ]
};
