// @ts-check
/**
 * @typedef {import("eslint").Linter.RuleEntry} RuleEntry
 */
import eslint from "@eslint/js";
import globals from "globals";
import tsEslint from "typescript-eslint";

/** @type {RuleEntry} */
const noUnusedVarsOptions = [
  "error",
  {
    argsIgnorePattern: "^_",
    varsIgnorePattern: "^_",
    caughtErrorsIgnorePattern: "^_",
    destructuredArrayIgnorePattern: "^_",
  },
];

/** @type {Record<string, RuleEntry>} */
const tsRules = {
  "@typescript-eslint/no-unused-vars": noUnusedVarsOptions,
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
};

export default tsEslint.config(
  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    extends: [eslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
    },
    rules: {
      "no-unused-vars": noUnusedVarsOptions,
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
    extends: [eslint.configs.recommended, ...tsEslint.configs.strictTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: tsRules,
  },
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    extends: [eslint.configs.recommended, ...tsEslint.configs.strictTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      ...tsRules,
    },
  },
  {
    // Test files are excluded from src/tsconfig.json (the build project), so the
    // project service would route them to the root tsconfig (nodenext resolution,
    // where extensionless imports fail). Route them to a dedicated project that
    // extends the src config and adds the jest global types.
    files: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    languageOptions: {
      parserOptions: {
        projectService: false,
        project: "./src/tsconfig.test.json",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
);
