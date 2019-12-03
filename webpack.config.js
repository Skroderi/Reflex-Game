const fs = require("fs");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");

const isProduction =
  process.argv.indexOf("-p") >= 0 || process.env.NODE_ENV === "production";
const entryFile = fs.existsSync("./src/index.ts")
  ? "./src/index.ts"
  : "./src/index.js";

module.exports = {
  entry: ["@babel/polyfill", entryFile],
  devtool: "inline-source-map",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  mode: isProduction ? "production" : "development",
  resolve: {
    extensions: [".ts", ".js"]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000,
    overlay: true,
    openPage: "http://localhost:9000",
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          },
          "ts-loader"
        ]
      }
    ]
  },
  plugins: [
    new WriteFilePlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: "./src/static/index.html" }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    })
    // new CopyWebpackPlugin([
    //   {
    //     from: path.join(__dirname, "src/static"),
    //     to: path.join(__dirname, "dist")
    //   }
    // ])
  ],
  performance: {
    hints: false
  }
};
