# Use Babel

> To start this exercise, be sure to be in `./packages/intermediate/babel` folder.
> Be sure you have [installed this repository first](../README.md#install)

## Introduction

> "Use next generation JavaScript, today." - Babel

::: tip
If for you Babel role is not clear, don't hesitate to take a look at it's [documentation](https://babeljs.io/docs/en/index.html).
:::

If you try to load your current application with an old browser which does not support latest features of EcmaScript.
You will have some issues. :sob:
When you encounter those issues, you often want to generate ES5 javascript in order to let your code run on every browser.
That's where babel can help a lot.

_Does webpack babelify your code automagically ?_

**No**

The simplest way to do so is to use a specific loader for `.js` files which will babelify every Javascript files in the dependency graph.

## Setup _babel-loader_

The current application is very simple, your webpack configuration is working well but it does not use babel.
Setup _babel-loader_ for every `.js` files.

</details>

<details>
<summary>Solution</summary>

```js{29-39}
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.js", // The source module of our dependency graph
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
              publicPath: "dist/assets"
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            cacheDirectory: true
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]
};
```

</details>
