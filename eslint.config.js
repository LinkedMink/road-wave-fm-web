// @ts-check

import eslint from "@eslint/js";
import eslintPluginReact from "eslint-plugin-react";
import globals from "globals";
import tsEslint from "typescript-eslint";

export default tsEslint.config(
  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    extends: [eslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
    },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      sourceType: "module",
    },
  },
  {
    files: ["config/**/*.js", "*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ["src/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [eslint.configs.recommended, ...tsEslint.configs.recommendedTypeChecked],
    languageOptions: {
      ecmaVersion: 2022,
      parserOptions: {
        project: ["tsconfig.json"],
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowNumber: true,
          allowBoolean: true,
          allowAny: false,
          allowNullish: true,
          allowRegExp: false,
        },
      ],
    },
  },
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    extends: [eslintPluginReact.configs.flat.recommended],
    plugins: {
      react: eslintPluginReact,
    },
    languageOptions: {
      parserOptions: {
        project: ["src/tsconfig.json"],
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
  }
);