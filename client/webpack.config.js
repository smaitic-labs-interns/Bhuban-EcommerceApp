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
      // {
      //   test: /\.?js|.json$/,
      //   exclude: [/node_modules/],
      //   use: {
      //     loader: "babel-loader",
      //     options: {
      //       presets: ["@babel/preset-env", "@babel/preset-react"],
      //     },
      //   },
      // },
      // {
      //   "no-restricted-imports": [
      //     "error",
      //     {
      //       patterns: ["@material-ui/*/*/*"],
      //     },
      //   ],
      // },
      {
        test: /\.html$/i,
        use: [
          {
            loader: "html-loader",
            options: { interpolate: true },
          },
        ],
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
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
          "style-loader",
          { loader: "css-loader", options: { esModule: false } },
          // "css-to-mui-loader",
          // "postcss-loader",
        ],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif|webp)$/,
        use: ["file-loader", "image-webpack-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  plugins: [
    // new ThemesGeneratorPlugin({
    //   srcDir: "src",
    //   // themesDir: "src/utils",
    //   // outputDir: "dist/static/css",
    //   defaultStyleName: "default.less",
    // }),
    // new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.js"),
    }),
    // new webpack.ProgressPlugin(),
    // new webpack.DefinePlugin({
    //   PRODUCTION: JSON.stringify(true),
    // }),
    // new webpack.LoaderOptionsPlugin({
    //   minimize: true,
    // }),
    // new webpack.ProvidePlugin({
    //   L: "leaflet",
    // }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
  },
};
