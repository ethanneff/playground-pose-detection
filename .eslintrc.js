module.exports = {
  extends: [
    "eslint:all",
    "plugin:jest/recommended",
    "plugin:react/all",
    "plugin:react-native/all",
    "plugin:sonarjs/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:typescript-sort-keys/recommended",
    "prettier",
  ],
  ignorePatterns: [
    "node_modules/",
    "coverage/",
    "android/",
    "ios/",
    "build/",
    "src/mocks/",
    "src/conversions/",
  ],
  env: { node: true },
  parser: "@typescript-eslint/parser",
  plugins: [
    "react",
    "react-hooks",
    "react-native",
    "import",
    "jest",
    "@typescript-eslint",
    "prettier",
    "sonarjs",
    "sort-keys-fix",
    "typescript-sort-keys",
  ],
  root: true,
  rules: {
    // imports
    "import/no-cycle": "error",
    "import/no-unresolved": "error",
    // react-native
    "@typescript-eslint/no-var-requires": "off", // images
    "react/jsx-no-literals": "off",
    // vscode
    "sort-keys": "off",
    "sort-imports": "off",
    // typescript
    "react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],
    "@typescript-eslint/no-use-before-define": "error",
    "no-use-before-define": "off",
    "default-param-last": "off",
    "react/jsx-filename-extension": "off",
    "react/require-default-props": "off",
    // style
    "react-hooks/exhaustive-deps": [
      "error",
      { enableDangerousAutofixThisMayCauseInfiniteLoops: true },
    ],
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "one-var": "off",
    "no-magic-numbers": "off",
    "no-ternary": "off",
    "react/jsx-max-depth": "off",
    "max-lines-per-function": "off",
    "max-statements": "off",
    "max-lines": "off",
    "no-nested-ternary": "off",
    "no-plusplus": "off", // for loops
    "id-length": "off", // 'x' and 'y' variables
    "no-undefined": "off", // react navigation types
    // comments
    "capitalized-comments": "off",
    "multiline-comment-style": "off",
    "no-inline-comments": "off",
    "line-comment-position": "off",
    // prettier
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-max-props-per-line": "off",
    "react/jsx-newline": "off",
    "react/jsx-indent": "off",
    "react/jsx-indent-props": "off",
    // remove
    "@typescript-eslint/ban-ts-comment": "off",
    "react-native/no-inline-styles": "off",
    "react/forbid-component-props": "off",
    "sonarjs/cognitive-complexity": "off",
  },
  settings: {
    "import/ignore": ["react-native"],
    react: { version: "detect" },
    jest: { version: "detect" },
  },
};
