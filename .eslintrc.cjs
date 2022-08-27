/**
 * @type {import("eslint").Linter.RulesRecord}
 */
const commonOverrideRules = {
  '@typescript-eslint/no-unused-vars': [
    'error',
    { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
  ],
  '@typescript-eslint/restrict-template-expressions': [
    'error',
    {
      allowNumber: true,
      allowBoolean: true,
      allowAny: false,
      allowNullish: true,
      allowRegExp: false,
    },
  ],
  'prettier/prettier': 'off',
};

/**
 * @type {import("eslint").ESLint.ConfigData}
 */
const config = {
  root: true,
  overrides: [
    {
      files: ['*.{m,c,}js', 'deploy/**/*.{m,c,}ts'],
      env: {
        node: true,
        es2021: true,
      },
      extends: ['eslint:recommended'],
    },
    {
      files: ['deploy/**/*.{m,c,}ts'],
      parserOptions: {
        project: ['deploy/tsconfig.json'],
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended',
      ],
      rules: { ...commonOverrideRules },
    },
    {
      files: ['src/**/*.{m,c,}ts{x,}'],
      parser: '@typescript-eslint/parser',
      env: {
        browser: true,
        es2020: true,
      },
      parserOptions: {
        project: ['tsconfig.json'],
        ecmaFeatures: {
          jsx: true,
        },
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
      extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended',
      ],
      rules: {
        ...commonOverrideRules,
        'react/prop-types': 'off',
      },
    },
  ],
};

module.exports = config;
