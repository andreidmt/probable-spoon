/* eslint-env node */

const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const Dotenv = require("dotenv-webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyPlugin = require("copy-webpack-plugin")

const IS_PROD = process.env.NODE_ENV === "production"

const config = {
  entry: "./src/index.tsx",

  output: {
    publicPath: "/probable-spoon/",
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[contenthash].js",
  },

  // Control how source maps are generated
  devtool: IS_PROD ? false : "inline-source-map",

  module: {
    rules: [
      {
        test: /\.(ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: "url-loader",
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
    ],
  },

  devServer: IS_PROD
    ? {}
    : {
        historyApiFallback: true,
        contentBase: "./dist",
        hot: true,
        watchOptions: {
          aggregateTimeout: 300,
          ignored: /node_modules/,
        },
      },

  plugins: [
    new HtmlWebPackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),

    new CopyPlugin({
      patterns: [{ from: "src/robots.txt", to: "robots.txt" }],
    }),

    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
    }),

    new Dotenv({
      path: "./.env",
    }),
  ],

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "react-dom": "@hot-loader/react-dom",
      "core.ui": path.resolve(__dirname, "src/core.ui/"),
    },
  },

  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[/\\]node_modules[/\\]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
}

module.exports = (env, argv) => {
  if (argv.hot) {
    // Cannot use 'contenthash' when hot reloading is enabled.
    config.output.filename = "js/[name].[fullhash].js"
  }

  return config
}
