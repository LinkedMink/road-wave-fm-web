/**
 * @type {import("eslint").Linter.RulesRecord}
 */
const commonOverrideRules = {
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
  "prettier/prettier": "off",
};

/**
 * @type {import("eslint").ESLint.ConfigData}
 */
const config = {
  root: true,
  ignorePatterns: ["*.test.tsx"],
  overrides: [
    {
      files: ["*.{m,c,}js"],
      env: {
        node: true,
        es2023: true,
      },
      extends: ["eslint:recommended"],
    },
    {
      files: ["*.{m,c,}ts"],
      parserOptions: {
        project: ["tsconfig.json"],
      },
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      rules: { ...commonOverrideRules },
    },
    {
      files: ["src/**/*.{m,c,}ts{x,}"],
      env: {
        browser: true,
        es2020: true,
      },
      parserOptions: {
        project: ["src/tsconfig.json"],
        ecmaFeatures: {
          jsx: true,
        },
      },
      settings: {
        react: {
          version: "detect",
        },
      },
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
      ],
      rules: {
        ...commonOverrideRules,
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
      },
    },
  ],
};

module.exports = config;
