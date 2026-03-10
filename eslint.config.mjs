import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";

import tsEslint from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import reactHookPlugin from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";

// Re-create __filename and __dirname for the ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      "next",
      "next/core-web-vitals",
      "eslint:recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "prettier",
    ],
  }),
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsEslint,
      react: reactPlugin,
      "react-hooks": reactHookPlugin,
      import: importPlugin,
    },
    rules: {
      "no-case-declarations": "off",
      "no-inner-declarations": "off",
      "prefer-const": "error",
      curly: "error",
      "spaced-comment": ["error", "always", { block: { balanced: true } }],
      radix: "error",
      "one-var": ["error", "never"],
      "object-shorthand": "error",
      "no-var": "error",
      "no-param-reassign": "error",
      "no-underscore-dangle": "error",
      "no-undef-init": "error",
      "no-throw-literal": "error",
      "no-new-wrappers": "error",
      "no-eval": "error",
      "no-console": 0, //TODO ['error', { 'allow': ['error', 'warn'] }]
      "no-caller": "error",
      "no-bitwise": "error",
      eqeqeq: ["error", "smart"],
      "max-classes-per-file": ["error", 1],
      "guard-for-in": "error",
      complexity: "error",
      "arrow-body-style": "error",
      "import/order": "error",
      "@typescript-eslint/no-unused-vars": "error",
      // Enable if we want to enforce the return type for all the functions
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/array-type": [
        "error",
        {
          default: "generic",
        },
      ],
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/consistent-type-assertions": "error",
      "@typescript-eslint/dot-notation": "error",
      "@typescript-eslint/member-delimiter-style": [
        "error",
        {
          multiline: {
            delimiter: "semi",
            requireLast: true,
          },
          singleline: {
            delimiter: "semi",
            requireLast: false,
          },
        },
      ],
      "@typescript-eslint/no-floating-promises": "error",
      "no-unused-expressions": "off",
      "@typescript-eslint/no-unused-expressions": ["error"],
      "@typescript-eslint/prefer-function-type": "error",
      "@typescript-eslint/restrict-plus-operands": "error",
      semi: "off",
      "@typescript-eslint/semi": ["error"],
      "@typescript-eslint/unified-signatures": "error",
      "react/prop-types": "off",
      "react/display-name": "off",
      "react/jsx-key": "error",
      "react/jsx-no-bind": ["error", { allowArrowFunctions: true }],
      "react-hooks/rules-of-hooks": "warn",
      "@typescript-eslint/no-empty-function": [
        "error",
        { allow: ["arrowFunctions"] },
      ],
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    ignores: ["eslint.config.mjs", ".next/**", "out/**", "build/**"],
  },
  {
    files: ["**/*.test.*"],
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },
];

export default eslintConfig;
