import CopyWebpackPlugin from "copy-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "node:path";
import postcssPresetEnv from "postcss-preset-env";
import type * as tsLoader from "ts-loader";
import type { Simplify, TsConfigJson } from "type-fest";
import { Configuration, NormalModuleReplacementPlugin, RuleSetRule, RuleSetUseItem } from "webpack";

type TsLoaderOptions = Simplify<
  Omit<Partial<tsLoader.Options>, "compilerOptions"> & {
    compilerOptions?: TsConfigJson["compilerOptions"];
  }
>;
type RuleSetRuleUseList = Omit<RuleSetRule, "use"> & { use: Exclude<RuleSetUseItem, string>[] };
type RuleSetRuleUseTsLoader = Omit<RuleSetRule, "use"> & {
  use: [
    {
      loader: "ts-loader";
      options: TsLoaderOptions;
    },
  ];
};

const environmentConfig = `Config.${process.env.TARGET_ENV ?? "production"}.ts`;
console.log(`Using target environment config: ${environmentConfig}`);

export const styleRuleSet: RuleSetRuleUseList = {
  test: /\.s?css$/i,
  use: [
    { loader: "css-loader" },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [postcssPresetEnv({})],
        },
      },
    },
  ],
};

export const tsRuleSet: RuleSetRuleUseTsLoader = {
  test: /\.([cm]?ts|tsx)$/,
  exclude: /node_modules/,
  use: [
    {
      loader: "ts-loader",
      options: {
        configFile: path.resolve(__dirname, "../src/tsconfig.json"),
      },
    },
  ],
};

export const webpackCommonConfig: Configuration = {
  entry: {
    index: path.resolve(__dirname, "../src/index.tsx"),
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],
    // Add support for TypeScripts fully qualified ESM imports.
    extensionAlias: {
      ".jsx": [".jsx", ".tsx"],
      ".js": [".js", ".ts"],
      ".cjs": [".cjs", ".cts"],
      ".mjs": [".mjs", ".mts"],
    },
    alias: {
      "@adraffy/ens-normalize": path.resolve(
        __dirname,
        "../node_modules/@adraffy/ens-normalize/dist/index.cjs",
      ),
    },
  },
  /**
   * @see https://webpack.js.org/configuration/devtool/
   */
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(jpg|jpeg|png|gif|webp|svg)$/i,
        type: "asset",
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.ejs"),
      title: "Road Wave FM",
      favicon: path.resolve(__dirname, "../src/assets/favicon.ico"),
      base: "/",
      meta: {
        viewport: "width=device-width, initial-scale=1",
        "theme-color": "#000000",
        description:
          "Get information about local radio stations as you travel across the United States",
      },
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(__dirname, "../src/tsconfig.json"),
      },
    }),
    new NormalModuleReplacementPlugin(/src[\\/]environments[\\/]Config\.ts/, environmentConfig),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.join(__dirname, "../src/assets"), to: path.join(__dirname, "../dist") },
      ],
    }),
  ],
  watchOptions: {
    ignored: /node_modules/,
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
  },
};
