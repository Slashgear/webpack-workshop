# Bundle size hunting :scissors:

> To start this exercise, be sure to be in `./packages/intermediate/reduce-bundle-size` folder.
> Be sure you have [installed this repository first](../README.md#install)

## Introduction

Having a tool like webpack to generate code "bundles" is great to let it handle code dependencies.
However it would be quite difficult to keep those generate bundle under a critic size.

Main causes are:

- Your app contains a huge quantity of code
- You import huge dependencies
- You are generating too few bundles. Your browser need to load and parse a huge file before rendering your all app.

## Example App

This is a really simple pokedex app made with vuejs.
In order to simplify build configuration, we won't use `vue-loader` here.
The app have two pages :

- home page displaying 20 pokemons
- pokemon detail page with a specific image.

You can start this application with:

```bash
yarn start
```

::: tip
When you start your server, you will notice webpack warnings in the console.
Webpack is trying to tell you that your app bundle is too fat.

Let's try to fix that ! :wink:
:::

## Analysing bundle size and content

First thing first, let's try to focus on what is in our bundle and you it is too fat.

We will use [Webpack Bundle Analyser](https://github.com/webpack-contrib/webpack-bundle-analyzer)

<details>
<summary>Solution</summary>

```js
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  plugins: [new BundleAnalyzerPlugin()]
};
```

</details>

You should normally see a lonely bundle containing:

- all bulma code
- all lodash lib
- vue js
- all your app code

## Tree shaking your code

Let's try to cut tree by the big branches first: the dependencies.

We are importing all bulma code, let's try to reduce bundle size by importing only whta is needed:

- columns
- headings
- card

<details>
<summary>Solution</summary>

Create a file `app.sass` and only load bulma parts.

```sass
@charset "utf-8";

@import "~bulma/sass/utilities/_all.sass"
@import "~bulma/sass/base/_all.sass"
@import "~bulma/sass/components/card.sass"
@import "~bulma/sass/elements/title.sass"
@import "~bulma/sass/grid/columns.sass"
```

</details>

Let's try to load just one function of lodash instead of all the lib

<details>
<summary>Solution</summary>

```js
import _capitalize from "lodash/capitalize";
```

</details>

::: tip
For lodash you could also use [babel plugin lodash](https://github.com/lodash/babel-plugin-lodash) if your are using babel in your app.
:::

We only cut the trees we don't grew directly, this was our dependencies.
Let's focus on app code, if you look at `pokemon.service.js` you will see that a method is not use in our application.
Webpack can detect it and removes it from the bundle.

::: warning
Webpack is not automagically tree shaking dead code. :sob:
:::

To do so, we have to tell Webpack:

> "ok my code is safe, it does not contain modules creating side effects on the app you could try to optimize it" - You

Just try to add `"sideEffects": false` in your package.json file.
Webpack will load this configuration and will optimize bundles to eliminate dead code.

Your app should be broken by now, all the CSS should be missing.
CSS module are by nature creating side-effects.

Let's try with `"sideEffects": ["*.sass"]` :tada:!

You can verify, no lodash in your bundle at all !

## Code splitting

Now the app is loading only the dependencies we need.
Let's try to load only home page code on home page ! :smile:

To do so we will need to generate two bundles: one for home, and one for details page.

We could do that by adding another entry in Webpack configuration **OR** we could use webpack dynamic imports.

VueJS is ok by default with async component :tada: , let's try to import our page in router with dynamic import.

It will generate 1 bundle for each page.

<details>
<summary>Solution</summary>

```js
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", component: () => import("./pages/home") },
    {
      path: "/details/:id",
      component: () => import("./pages/details"),
      props: true
    }
  ]
});
```

</details>

## Name your chunks !

Ok the two `chunk` contains your page code and that's great.
You could try to load your app, the browser will only load the JS you need to display the page.

Maybe we could name those chunk to help us understand what we just split.

1. Change the output filename config to `[name].bundle.js`
2. Add a comment in the dynamic import to name your chunk (`import(/* webpackChunkName: "home" */ "./pages/home")`)

## Prefetch your bundles !

You can also tell your browser, ok you don't need that bundle for now, but try to prefetch it if you have time, it is good for you.
This could be done with another webpack comment, look at [related doc](https://webpack.js.org/guides/code-splitting/#prefetchingpreloading-modules)
