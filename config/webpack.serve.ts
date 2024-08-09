import "webpack-dev-server";
import { merge } from "webpack-merge";
import { webpackFastConfig } from "./webpackFastConfig.js";

export default merge(webpackFastConfig, {
  devtool: "eval-source-map",
  devServer: {
    port: 8080,
    historyApiFallback: true,
    hot: true,
    liveReload: false,
    client: {
      progress: true,
    },
  },
});
