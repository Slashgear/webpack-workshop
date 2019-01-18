# Basics

> To start this exercise, be sure to be in `./packages/novice/basic` folder.
> Be sure you have [installed this repository first](./README.md#install)

## Introduction

This first example is here to help you why Webpack exist and his basic usage.

Here is define two CommonJS module (commonly used [in a NodeJS env](https://nodejs.org/docs/latest/api/modules.html)).
They are both loaded in the html file.

If you're not familiar enough with the browser env, it won't be able to load CommonJS bundle.
A browser can't handles NodeJS-like dependencies.

Here is the dependency graph of those modules:

```
title.js
      <- color.js
             <- node_modules/lodash
```

## Old way

If we were few years ago, we would have load all those files in the browser without the `require` syntax and by keeping the dependency order.
For `lodash` library we would have used a cdn to load it.

This way works perfectly... But for a long time project, it would generate a lot of `<script/>` loading.
Keeping the order would have been humanly difficult.

## Webpack solution

Webpack is a tool to generate a bundle base on module dependencies graph resolution.
It's a NodeJS package made for Web developer to do the packaging.

### Step 1: Setup simple configuration

Webpack configuration is a CommonJS module with default name `webpack.config.js`.
Coupled with `webpack-cli` dev dependency, you can easily trigger a webpack _build_ on this small app.
This is where all the webpack configuration will be defined

```js
const path = require("path");

module.exports = {
  entry: "./src/title.js", // The source module of our dependency graph
  output: {
    // Configuration of what we tell webpack to generate (here, a ./dist/main.js file)
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  }
};
```

### Step 2: Change index.html script target

Our `index.html` file won't use our modules directly now. It will use directly webpack _output_.
To do so, just change the `<script/>`

```html{10}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Simple JS file</title>
    <meta name="description" content="Simple JS file" />
  </head>
  <body>
    <h1>This title will change !</h1>
    <script src="dist/main.js"></script>
  </body>
</html>
```

### Step 3: Script the build with webpack-cli

For the scripting part, we just have to add a `scripts` part in `package.json` file.

```json{13,14,15}
{
  "name": "@novice/basic",
  "version": "1.0.0",
  "license": "MIT",
  "private": true,
  "dependencies": {
    "lodash": "^4.17.11"
  },
  "devDependencies": {
    "webpack": "^4.28.4",
    "webpack-cli": "^3.2.1"
  },
  "scripts": {
    "build": "webpack"
  }
}
```

Now run and open it on your browser:

```bash
yarn build
```

Look at the generated _bundle_
