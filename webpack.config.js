const webpack = require("webpack");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

module.exports = {
  entry: "./src/app.ts",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    port: 9000,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.KEY": JSON.stringify(process.env.KEY),
    }),
    new webpack.EnvironmentPlugin(["KEY"]),
  ],
};
