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
    proxy: [
      {
        context: ["/api/data"],
        target: process.env.PROXY_DATA_API_BASE_URL ?? "http://localhost:58081",
        pathRewrite: { "^/api/data": "" },
      },
      {
        context: ["/api/user"],
        target: process.env.PROXY_USER_API_BASE_URL ?? "http://localhost:58080",
        pathRewrite: { "^/api/user": "" },
      },
    ],
  },
});
