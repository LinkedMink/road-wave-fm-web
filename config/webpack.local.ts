import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { merge } from "webpack-merge";
import { webpackFastConfig } from "./webpackFastConfig";

export default merge(webpackFastConfig, {
  profile: true,
  plugins: [new BundleAnalyzerPlugin({ analyzerMode: "json", generateStatsFile: true })],
  output: {
    clean: true,
  },
});
