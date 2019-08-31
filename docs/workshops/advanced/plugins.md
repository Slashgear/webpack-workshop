# Your first webpack plugin :heart:

> To start this exercise, be sure to be in `./packages/advanced/plugins` folder.
> Be sure you have [installed this repository first](../README.md#install)

## Introduction

You already saw and used many plugins with webpack.
It gives user possibility to add features, optimize performance, etc...

An API is open to let you implement your own webpack plugin.

::: tip
In your project you may need a plugin that already have been created by the community, don't hesitate to look at [awesome-webpack](https://github.com/webpack-contrib/awesome-webpack#webpack-plugins).
:::

You should also know that more than 70% of webpack core code is using it's own plugin API. webpack code is a great example of _how to write a plugin ?_

## Hooks and tapable

Creating a Plugin
A plugin for webpack consists of

- A named JavaScript function.
- Defines apply method in its prototype.
- Specifies an [event hook](https://webpack.js.org/api/compiler-hooks/) to tap into.
- Manipulates webpack internal instance specific data.
- Invokes webpack provided callback after functionality is complete.

```javascript
class MyExampleWebpackPlugin {
  // Define `apply` as its prototype method which is supplied with compiler as its argument
  apply(compiler) {
    // Specify the event hook to attach to
    compiler.hooks.done.tapAsync(
      "MyExampleWebpackPlugin",
      (compilation, callback) => {
        console.log("This is an example plugin!");
        console.log(
          "Here’s the `compilation` object which represents a single build of assets:",
          compilation
        );

        // Manipulate the build using the plugin API provided by webpack
        compilation.addModule(/* ... */);

        callback();
      }
    );
  }
}
```

## Create a BuildTime

In order to learn to how to write a plugin. Try to define a plugin that take `stats` from `done` hooks and log build time in milliseconds.

<details>
<summary>Solution</summary>

```javascript{8-16,65}
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const CompressionPlugin = require("compression-webpack-plugin");

class BuildTime {
  apply(compiler) {
    compiler.hooks.done.tapAsync("StatsFilePlugin", stats => {
      console.log(
        `Build took ${stats.endTime - stats.startTime} milliseconds!`
      );
    });
  }
}

module.exports = {
  mode: "production",
  entry: "./src/main.js", // The source module of our dependency graph
  devServer: {
    contentBase: "./dist"
  },
  output: {
    // Configuration of what we tell webpack to generate (here, a ./dist/main.js file)
    filename: "[name].bundle.[hash].js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
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
      },
      {
        test: /\.vue$/,
        use: "vue-loader"
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin("dist"),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new CompressionPlugin(),
    new BuildTime()
  ]
};
```

</details>
