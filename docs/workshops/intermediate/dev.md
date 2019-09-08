# Development Tricks :rocket:

> To start this exercise, be sure to be in `./packages/intermediate/dev` folder.
> Be sure you have [installed this repository first](../README.md#install)

## Introduction

When you want to develop a web application, you need to change your code often.
That's why you don't want to lose time doing repetitive actions to see the result in your browser.

```
You change your code => you build your code with webpack => your reload your browser
```

webpack introduce also the concept of `bundle`.
That means the code your browser runs is not exactly the same than the code you write.
All dependencies have been resolved and merged together.

For this two painful new problems, webpack offers solutions.

## Source maps

When your generated JS code is not humanly readable because it has been minified or bundle you need [source maps](https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map).
In this exercise, the app is displaying pokemons.

Run:

```bash
yarn build
```

Try to open the generated bundle in the browser devtools, this should be very complex JS module.

To generate your source maps:

- toggle development [mode](https://webpack.js.org/concepts/mode) of your build
- define devtools to `inline-source-map`

:::tip
You can change your webpack configuration or `webpack`.
:::

<details>
<summary>Solution A</summary>

```js{5,6}
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
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

<details>
<summary>Solution B</summary>

```json{20}
{
  "name": "@intermediate/dev",
  "version": "1.0.0",
  "license": "MIT",
  "private": true,
  "dependencies": {
    "bulma": "^0.7.2",
    "lodash": "^4.17.11"
  },
  "devDependencies": {
    "webpack": "^4.28.4",
    "file-loader": "^3.0.1",
    "css-loader": "^2.1.0",
    "style-loader": "^0.23.1",
    "html-webpack-plugin": "^3.2.0",
    "clean-webpack-plugin": "^1.0.0"
  },
  "scripts": {
    "build": "webpack --progress --mode development --devtool inline-source-map"
  }
}
```

</details>

On Chrome, open your devtools panel named _Source_, try to open file `pokemon.service.js`.
You should be able to read the same file you wrote. :tada:
You can now put **breakpoints** in the browser to help you debug your code.

## Watch mode

> "Could you please explain me how to auto rebuild my application when I do a modification ?" - You

The most _naive_ approach to auto trigger build your app on code change could be done with the [`watch` mode of webpack](https://webpack.js.org/configuration/watch/).

<details>
<summary>Solution</summary>

```json{20}
{
  "name": "@intermediate/dev",
  "version": "1.0.0",
  "license": "MIT",
  "private": true,
  "dependencies": {
    "bulma": "^0.7.2",
    "lodash": "^4.17.11"
  },
  "devDependencies": {
    "webpack": "^4.28.4",
    "file-loader": "^3.0.1",
    "css-loader": "^2.1.0",
    "style-loader": "^0.23.1",
    "html-webpack-plugin": "^3.2.0",
    "clean-webpack-plugin": "^1.0.0"
  },
  "scripts": {
    "build": "webpack --progress --mode development --devtool inline-source-map --watch"
  }
}
```

</details>

## webpack Dev. Server

> "Is there a solution to start an http server to serve my generated file ?" - You

The solution is `webpack-dev-server`, it's a community nodeJS package that can start a web server based on webpack configuration.

- Add a `npm script` named `start` that uses `webpack-dev-server` on your webpack configuration
- Add a `devServer` key in your configuration to override `contentBase` key to target your output directory.

<details>
<summary>Solution</summary>

```js{5-7}
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devServer: {
    contentBase: "./dist"
  },
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
