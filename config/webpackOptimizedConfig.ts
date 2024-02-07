import CompressionWebpackPlugin from "compression-webpack-plugin";
import CssMinimizerWebpackPlugin from "css-minimizer-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import zlib, { BrotliOptions } from "node:zlib";
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
    new CompressionWebpackPlugin({
      filename: "[path][base].gz",
      algorithm: "gzip",
      minRatio: 1,
    }),
    new CompressionWebpackPlugin({
      filename: "[path][base].br",
      algorithm: "brotliCompress",
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
        },
      } as BrotliOptions,
      minRatio: 1,
    }),
  ],
  optimization: {
    minimizer: ["...", new CssMinimizerWebpackPlugin()],
    moduleIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  output: {
    filename: "static/[name].[contenthash].js",
    assetModuleFilename: "static/[name][ext][query]",
    clean: true,
  },
});
