/**
 * @type {import("eslint").ESLint.ConfigData}
 */
const config = {
  root: true,
  env: {
    node: true,
    es2020: true,
    browser: true,
  },
  overrides: [
    {
      files: ['src/**/*.{m,c,}ts{x,}'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['tsconfig.json'],
        ecmaVersion: 2020,
        sourceType: 'module',
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
        'react/prop-types': 'off',
        'prettier/prettier': 'off',
      },
    },
    {
      files: ['*.{m,c,}js'],
      extends: ['eslint:recommended'],
    },
  ],
};

module.exports = config;
