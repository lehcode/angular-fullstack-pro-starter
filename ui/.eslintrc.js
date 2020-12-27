module.exports = {
  "root": true,
  "ignorePatterns": [
    "coverage/**/*",
    "src/assets/fonts",
    "src/locale",
    "node_modules"
  ],
  "plugins": [
    "html"
  ],
  "settings": {
    "html/html-extensions": [
      ".html"
    ],
    "html/indent": "0",
    // code should start at the beginning of the line (no initial indentation).
    "html/report-bad-indent": "error"
  },
  "overrides": [
    {
      "files": [
        "*.ts"
      ],
      "parserOptions": {
        "project": [
          "tsconfig.eslint.json"
        ],
        "createDefaultProgram": true
      },
      "extends": [
        "plugin:@angular-eslint/ng-cli-compat",
        "plugin:@angular-eslint/ng-cli-compat--formatting-add-on",
        "plugin:@angular-eslint/template/process-inline-templates"
      ],
      "rules": {
        "array-bracket-newline": ["error", "consistent"],
        "array-element-newline": ["error", "consistent"],
        "newline-per-chained-call": [
          "error",
          {
            "ignoreChainWithDepth": 2
          }
        ],
        "quotes": "off",
        "@angular-eslint/component-selector": [
          "error",
          {
            "type": "element",
            "prefix": "app",
            "style": "kebab-case"
          }
        ],
        "@angular-eslint/directive-selector": [
          "error",
          {
            "type": "attribute",
            "prefix": "app",
            "style": "camelCase"
          }
        ],
        "@typescript-eslint/quotes": [
          "error"
        ]
      }
    },
    {
      "files": [
        "*.html"
      ],
      "extends": [
        "plugin:@angular-eslint/template/recommended"
      ],
      "rules": {}
    }
  ]
}
