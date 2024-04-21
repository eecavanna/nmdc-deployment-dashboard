module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime"
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    sourceType: "module",
    tsconfigRootDir: __dirname
  },
  plugins: ["react-refresh"],
  root: true,
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true }
    ]
  },
  settings: {
    /**
     * Settings for the `eslint-plugin-react` plugin.
     *
     * Reference: https://github.com/jsx-eslint/eslint-plugin-react/blob/master/README.md#configuration-legacy-eslintrc-
     */
    "react": {
      "version": "detect"
    }
  }
};
