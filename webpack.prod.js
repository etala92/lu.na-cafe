const { merge } = require("webpack-merge");
const path = require("path");

const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { EnvironmentPlugin } = require("webpack");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",

  output: {
    filename: "[name].[hash:5].js",
    chunkFilename: "[id].[hash:5].css",
    path: path.resolve(__dirname, "dist"),
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          sourceMap: true,
        },
        exclude: /\/node_modules\//,
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[hash:5].css",
        chunkFilename: "[id].[hash:5].css",
      }),
      new CssMinimizerPlugin(),
    ],
  },

  plugins: [
    new EnvironmentPlugin({
      CMS_BRANCH: process.env.BRANCH || null,
      CMS_CONF: {
        config: {
          backend: {
            name: "git-gateway",
            branch: process.env.BRANCH || process.env.CMS_BRANCH || "main",
          },
        },
      },
    }),
  ],
});
