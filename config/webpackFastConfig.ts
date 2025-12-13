import { merge } from "webpack-merge";
import { styleRuleSet, tsRuleSet, webpackCommonConfig } from "./webpackCommonConfig.js";

const tsRuleSetDev = structuredClone(tsRuleSet);
tsRuleSetDev.use[0].options.compilerOptions = {
  jsx: "react-jsxdev",
};

export const webpackFastConfig = merge(webpackCommonConfig, {
  mode: "development",
  module: {
    rules: [
      {
        ...styleRuleSet,
        use: [{ loader: "style-loader" }, ...styleRuleSet.use],
      },
      tsRuleSetDev,
    ],
  },
  output: {
    filename: "static/[name].js",
    assetModuleFilename: "static/[name][ext][query]",
  },
});
