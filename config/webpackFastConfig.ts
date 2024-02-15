import { RuleSetUseItem } from "webpack";
import { merge } from "webpack-merge";
import { styleRuleSet, webpackCommonConfig } from "./webpackCommonConfig";

const fastStyleRuleSet = {
  ...styleRuleSet,
  use: [{ loader: "style-loader" }, ...(styleRuleSet.use as RuleSetUseItem[])],
};

export const webpackFastConfig = merge(webpackCommonConfig, {
  mode: "development",
  module: {
    rules: [fastStyleRuleSet],
  },
  output: {
    filename: "static/[name].js",
    assetModuleFilename: "static/[name][ext][query]",
  },
});
