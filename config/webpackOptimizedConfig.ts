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

// type BrotliCompressionOpts = ConstructorParameters<typeof CompressionWebpackPlugin<BrotliOptions>>[0]
// const brotliCompressionOptions: BrotliCompressionOpts = {
//   filename: "[path][base].br",
//   algorithm: "brotliCompress",
//   compressionOptions: {
//     params: {
//       [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
//     },
//   },
//   minRatio: 1,
// }

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
      minRatio: 0.9,
      compressionOptions: {
        windowBits: zlib.constants.Z_MAX_WINDOWBITS,
        level: zlib.constants.Z_MAX_LEVEL,
        memLevel: zlib.constants.Z_MAX_MEMLEVEL,
      },
    }),
    new CompressionWebpackPlugin<BrotliOptions>({
      filename: "[path][base].br",
      algorithm: "brotliCompress",
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
          // [zlib.constants.BROTLI_PARAM_LGWIN]: zlib.constants.BROTLI_MAX_WINDOW_BITS,
          // [zlib.constants.BROTLI_PARAM_LGBLOCK]: zlib.constants.BROTLI_MAX_INPUT_BLOCK_BITS
        },
      },
      minRatio: 0.9,
    }),
    // new CompressionWebpackPlugin({
    //   test: /\.(css|html|js|json|map|svg|txt)$/i,
    //   ...brotliCompressionOptions,
    //   compressionOptions: {
    //     params: {
    //       ...brotliCompressionOptions.compressionOptions?.params,
    //       [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
    //     }
    //   }
    // }),
    // new CompressionWebpackPlugin({
    //   test: /\.(woff2)$/i,
    //   ...brotliCompressionOptions,
    //   compressionOptions: {
    //     params: {
    //       ...brotliCompressionOptions.compressionOptions?.params,
    //       [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_FONT,
    //     }
    //   }
    // }),
    // new CompressionWebpackPlugin({
    //   test: /\.(?!(css|html|js|json|map|svg|txt|woff2))$/i,
    //   ...brotliCompressionOptions,
    //   compressionOptions: {
    //     params: {
    //       ...brotliCompressionOptions.compressionOptions?.params,
    //       [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
    //     }
    //   }
    // }),
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
