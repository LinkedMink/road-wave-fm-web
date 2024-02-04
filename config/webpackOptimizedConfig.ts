import CssMinimizerWebpackPlugin from "css-minimizer-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { RuleSetUseItem } from "webpack";
import { merge } from "webpack-merge";
import { styleRuleSet, webpackCommonConfig } from "./webpackCommonConfig";

const optimizedStyleRuleSet = {
  ...styleRuleSet,
  use: [{ loader: MiniCssExtractPlugin.loader }, ...(styleRuleSet.use as RuleSetUseItem[])],
};

export const webpackOptimizedConfig = merge(webpackCommonConfig, {
  mode: "production",
  module: {
    rules: [optimizedStyleRuleSet],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "static/[name].[contenthash].css",
      chunkFilename: "static/[id].[contenthash].js",
    }),
  ],
  optimization: {
    minimizer: ["...", new CssMinimizerWebpackPlugin()],
    splitChunks: {
      chunks: "all",
    },
  },
  output: {
    filename: "static/[name].[contenthash].js",
    assetModuleFilename: "static/[name][ext][query]",
    clean: true,
  },
});
