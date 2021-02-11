module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2017,
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
  rules: {
    "import/no-mutable-exports": 0,
    "no-labels": 0,
    "no-restricted-syntax": 0,
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "_" }]
  },
  plugins: ["@typescript-eslint", "svelte3"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:eslint-comments/recommended",
    "plugin:promise/recommended",
    "prettier",
    "prettier/@typescript-eslint",
  ],
  overrides: [
    {
      files: ["**/*.svelte"],
      processor: "svelte3/svelte3",
    },
  ],
  env: {
    es6: true
  }
};
