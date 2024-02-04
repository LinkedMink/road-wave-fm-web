import "webpack-dev-server";
import { merge } from "webpack-merge";
import { webpackFastConfig } from "./webpackFastConfig";

export default merge(webpackFastConfig, {
  devtool: "eval-source-map",
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
    liveReload: false,
    client: {
      progress: true,
    },
  },
});
