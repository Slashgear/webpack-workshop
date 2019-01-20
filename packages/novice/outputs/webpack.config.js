const path = require("path");

module.exports = {
  entry: "./src/title.js", // The source module of our dependency graph
  output: {
    // Configuration of what we tell webpack to generate (here, a ./dist/main.js file)
    filename: "main.js",
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
              publicPath: "dist/assets"
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
