# Handling :nail_care: assets

> To start this exercise, be sure to be in `./packages/novice/code-assets` folder.
> Be sure you have [installed this repository first](../README.md#install)

## Introduction

A web application is not only JS and HTML, you need CSS to pimp it!
In this workshop we will try to load `style` in our application.

```
title.js
      <- color.js
             <- node_modules/lodash
      <- main.css
```

If you're not familiar with _Loaders_, you should do [static assets workshop](./static-assets.md) first.

## More loaders !

We added two loaders for you `css-loaders`, `style-loader` in dependencies.
A very tiny stylesheet has been defined too.

Try to define the configuration for loading your style with webpack and import `main.css` file in the entry module.

<details>
<summary>Solution</summary>

```js{24-27}
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
```

```js{2}
const { getRandomColor } = require("./color.js");
require("../assets/main.css");

let changeCount = 0;

const el = document.querySelector("h1");

setInterval(() => {
  changeCount++;
  el.innerHTML = `This title will change ! ${changeCount}`;
  el.style.color = getRandomColor();
}, 1000);
```

:::tip
You should look at the generated bundle. There is no generated CSS file. The CSS should be in the JS bundle.
:::

</details>

## Loader magic !

This time we will try to add a dependency in our css file by including this code:

```css
body {
  background: url("./landscape.jpg") center center;
}
```

:::tip
Boum ! webpack loader can add files in the dependency graph.
That's why your file is correctly resolved.
:::
