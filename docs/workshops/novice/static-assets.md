# Handling static assets

> To start this exercise, be sure to be in `./packages/novice/static-assets` folder.
> Be sure you have [installed this repository first](../README.md#install)

## Introduction

Now that we know how to use _CommonJS_ modules power in the browser thanks to webpack resolution process,
we clearly want to be able to use other files types that a webapp needs.

Let's start simply with a static file like an image

<img src="../img/elias-arnar-1309173-unsplash.jpg" width="300px" height="auto" alt="example of asset"/>

We will start with the same app that is the [basic example](./basics.md).
But this time we will try to add a picture after the title.

```
title.js
      <- color.js
             <- node_modules/lodash
      <- landscape.jpg
```

## Import all the things !

Let's try to load our image like it was a JS module and try to run the `yarn build` command.

<details>
<summary>Solution</summary>

```js{2}
const { getRandomColor } = require("./color.js");
const image = require("../assets/landscape.jpg");

let changeCount = 0;

const el = document.querySelector("h1");

setInterval(() => {
  changeCount++;
  el.innerHTML = `This title will change ! ${changeCount}`;
  el.style.color = getRandomColor();
}, 1000);
```

</details>

You will normally see a pretty short error message in your console

```log
ERROR in ./assets/landscape.jpg 1:0
Module parse failed: Unexpected character '�' (1:0)
You may need an appropriate loader to handle this file type.
(Source code omitted for this binary file)
 @ ./src/title.js 2:14-48
```

It simply means that webpack failed to load your image file.
By default, Webpack could only handle JS module files.
If you want to load another file type, you definitely need a Webpack **Loader**.

If you look at the `package.json` file, you will fine a new dependency: `file-loader`.
This loader have been created for those king of need.

## Setup file loader

In [basic](./basics.md) example we saw two webpack configuration objects:

- entry
- output

Now we need the `module` to configure other kind of modules resolving/compiling rules.
Let's try to add a rule for `.jpg` files.

<details>
<summary>Solution</summary>

```js{10-19}
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
      // Here we can define/override module loading rules
      {
        test: /\.jpg$/,
        use: ["file-loader"]
      }
    ]
  }
};
```

</details>

You can also check that if you add another `.jpg` image in the folder and don't use it in your module, webpack won't load it.

## Let's use our loaded image

Webpack seems to have now the power to load a `.jpg` file. Let's look at what it puts in the `const image` we created above.

Normally you will see a `<strange-generated-hash>.jpg` in your console. This message matches the file webpack created in the `dist` folder.

If you use this simple trick, you can try to use your generated image in your app

```js{10-13}
const { getRandomColor } = require("./color.js");
const image = require("../assets/landscape.jpg");

console.log(image);

let changeCount = 0;

const el = document.querySelector("h1");

const img = document.createElement("img");
img.src = image;

el.parentNode.insertBefore(img, el.nextSibling);

setInterval(() => {
  changeCount++;
  el.innerHTML = `This title will change ! ${changeCount}`;
  el.style.color = getRandomColor();
}, 1000);
```

Rebuild and open your app, you will normally see that your image is broken.
Your browser in not looking in the good directory.

### Change the path

We told webpack that the output path is the `dist` folder. That's exactly where it creates the loaded image.

Let's try to configure two things:

- make webpack create an `assets` folder for those kind of files (_outputPath_)
- make the generated path from loaded module ok for the browser (_publicPath_)

<details>
<summary>Solution</summary>

```js{13-22}
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
      }
    ]
  }
};
```

</details>

::: tip
Now your image should be displayed without errors!! 👏👏👏
:::
