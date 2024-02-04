import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { merge } from "webpack-merge";
import { webpackOptimizedConfig } from "./webpackOptimizedConfig";

export default merge(webpackOptimizedConfig, {
  profile: true,
  plugins: [new BundleAnalyzerPlugin({ analyzerMode: "json", generateStatsFile: true })],
});
