const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ThemesGeneratorPlugin = require("themes-switch/ThemesGeneratorPlugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  stats: {
    children: true,
  },
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash:8].js",
    sourceMapFilename: "[name].[hash:8].map",
    chunkFilename: "[id].[hash:8].js",
  },
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.html$/i,
        use: {
          loader: "html-loader",
          options: { interpolate: true },
        },
      },
      {
        test: /\.(png|jp(e*)g|svg|gif|webp)$/,
        use: "file-loader",
        exclude: /node_modules/,
      },

      {
        test: /\.json$/,
        use: {
          loader: "cson-loader",
        },
      },
      {
        test: /\.css$/i,
        use: [
          // MiniCssExtractPlugin.loader,
          // "style-loader",
          // "css-to-mui-loader",
          // "postcss-loader",
          "css-loader",
        ],
      },

      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.js"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
  },
};
