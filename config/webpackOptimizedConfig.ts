import CompressionWebpackPlugin from "compression-webpack-plugin";
import CssMinimizerWebpackPlugin from "css-minimizer-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import zlib, { BrotliOptions } from "node:zlib";
import { RuleSetUseItem, optimize } from "webpack";
import { merge } from "webpack-merge";
import { styleRuleSet, webpackCommonConfig } from "./webpackCommonConfig.js";

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
    new optimize.MinChunkSizePlugin({
      minChunkSize: 20 * 1024,
    }),
  ],
  optimization: {
    minimizer: ["...", new CssMinimizerWebpackPlugin()],
    // moduleIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      minSize: 16 * 1024,
      maxAsyncRequests: 20,
      maxInitialRequests: 20,
      // cacheGroups: {
      //   vendor: {
      //     test: /[\\/]node_modules[\\/]/,
      //     name: "vendors",
      //     chunks: "all",
      //   },
      // },
    },
  },
  performance: {
    maxAssetSize: 256 * 1024,
    maxEntrypointSize: 512 * 1024,
    assetFilter: (assetFilename: string) => !/\.(map|gz|br)$/.test(assetFilename),
  },
  output: {
    filename: "static/[name].[contenthash].js",
    assetModuleFilename: "static/[name].[contenthash][ext][query]",
    clean: true,
  },
});
