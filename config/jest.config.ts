import type { Config } from "jest";
import path from "node:path";

const IGNORE_COVERAGE_FILES = ["index"];

const config: Config = {
  rootDir: path.resolve(__dirname, "../"),
  verbose: true,
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/config/jestSetupAfterEnv.ts"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  moduleFileExtensions: ["js", "jsx", "mjs", "cjs", "json", "ts", "tsx", "mts", "cts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
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
  transform: {
    "^.+\\.m?tsx?$": [
      "ts-jest",
      {
        tsconfig: "src/tsconfig.json",
        useESM: true,
      },
    ],
  },
};

export default config;
