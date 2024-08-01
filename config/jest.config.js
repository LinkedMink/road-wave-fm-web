// @ts-check

const IGNORE_COVERAGE_FILES = ["index"];

/**
 * @type {import('jest').Config}
 */
const config = {
  rootDir: process.cwd(),
  verbose: true,
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/config/jestSetupAfterEnv.ts"],
  moduleFileExtensions: ["js", "jsx", "mjs", "cjs", "json", "ts", "tsx", "mts", "cts"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|svg)$/": "<rootDir>/__mocks__/fileMock.js",
    "\\.(eot|otf|ttf|woff|woff2)$/": "<rootDir>/__mocks__/fileMock.js",
    "\\.(txt|md)$/": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js",
  },
  testMatch: ["**/src/**/*.test.ts{x,}"],

  collectCoverage: false,
  collectCoverageFrom: [
    `<rootDir>/src/**/!(${IGNORE_COVERAGE_FILES.join("|")}|*.spec|*.test|*.enum).{m,c,}tsx?`,
  ],
  coverageReporters: ["html", "text"],
  // coverageThreshold: {
  //   global: {
  //     statements: 75,
  //     branches: 75,
  //     functions: 75,
  //     lines: 75,
  //   },
  // },
  transformIgnorePatterns: ["/node_modules/(?!(jose)/)"],
};

export default config;
