const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/main.js", // The source module of our dependency graph
  devServer: {
    contentBase: "./dist"
  },
  output: {
    // Configuration of what we tell webpack to generate (here, a ./dist/main.js file)
    filename: "main.bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.jpg$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets",
              publicPath: "assets"
            }
          }
        ]
      },
      {
        test: /\.(sass|css)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  resolve: {
    alias: {
      vue: "vue/dist/vue.js"
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]
};
