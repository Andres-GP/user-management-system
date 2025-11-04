// eslint.config.cjs
const globals = require("globals");
const { defineConfig } = require("eslint/config");
const js = require("@eslint/js");

module.exports = defineConfig([
  js.configs.recommended,

  {
    files: ["**/*.{js,cjs}"],
    ignores: ["public/**/*", "__tests__/**/*"],
    languageOptions: {
      sourceType: "script",
      ecmaVersion: "latest",
      globals: globals.node,
    },
  },

  {
    files: ["public/**/*.js"],
    languageOptions: {
      sourceType: "script",
      globals: globals.browser,
    },
  },

  {
    files: ["__tests__/**/*.js"],
    languageOptions: {
      sourceType: "script",
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },

  {
    rules: {
      "no-unused-vars": "warn",
      semi: ["error", "always"],
      quotes: ["warn", "double"],
      "no-console": "off",
    },
  },
]);
