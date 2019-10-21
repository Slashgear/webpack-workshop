# Avoir du style :nail_care:

> Pour démarrer cet exercice, sois sûr d'être dans le dossier `./packages/intermediate/style`.
> Sois également sûr d'avoir [installé ce dépôt d'abord](../README.md#install)

## Introduction

Nous utilisons souvent un préprocesseur CSS dans notre projet pour nous aider à gérer les mixins CSS, les dépendances, la palette, la génération de classes.
Par chance, ces préprocesseurs ont leur propre loader spécifique pour aider webpack à construire leur arbre de dépendances.
Dans cet atelier, nous allons installer le chargeur `sass` pour aider à réduire la quantité de CSS générée par webpack.

::: tip
Nous utilisons la bibliothèque css [Bulma](https://bulma.io/) ici.
:::

## `sass-loader` charger Bulma

Essayez de charger d'abord le fichier scss de Bulma et modifiez votre configuration pour inclure le chargeur sass.
Le fichier nécessaire est `bulma/bulma.sass`.

La [documentation de sass-loader](https://github.com/webpack-contrib/sass-loader) peut vous aider pour faire cela.

<details>
<summary>Solution</summary>

```js{25-28}
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
        test: /\.sass$/,
        use: ["style-loader", "css-loader", "sass-loader"]
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

```js{1}
import "bulma/bulma.sass";
import PokemonComponent from "./pokemon.component";
import { getPokemons } from "./pokemon.service";

const pokemonList = document.querySelector("#pokemons");

getPokemons().then(response => {
  response.results.map(({ name }, index) => {
    pokemonList.appendChild(PokemonComponent(name, index + 1));
  });
});
```

</details>

::: warning
Avez-vous vu que la dépendance `node-sass` dev est obligatoire pour "sass-loader". Vous pouvez le voir dans le `package.json`.
:::

## Extraire le CSS dans des fichiers à part

Avoir votre CSS dans votre paquet est un gain rapide, mais il peut transformer votre bundle en fichiers énormes contenant tous vos fichiers CSS dont vous n'avez pas besoin pour faire le rendu de votre site.
Vous voudrez probablement séparer votre CSS du paquet JS et l'extraire en bundles `css`.

Essayer de configurer le [Mini CSS Extract Plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)

<details>
<summary>Solution</summary>

```js{3}{37-40}
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
        test: /\.sass$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]
};
```

</details>

:::tip
:bulb: La clé `use` d'une `rule` de webpack indique l'ordre d'application des loaders.
Ici, les loaders relatifs au CSS s'appliquent dans cet order `sass-loader`, `css-loader` puis `MiniCssExtractPlugin.loader`.
:::

## Utiliser un preprocesseur CSS

Si vous voulez cibler plusieurs navigateurs avec votre CSS, vous aurez besoin d'un post-processeur. Le plus communément utilisé est `PostCSS'.
Essayez de changer la configuration pour utiliser postCSS loader dans votre application afin de générer un CSS compatible avec tous les navigateurs.

[PostCSS Loader](https://github.com/postcss/postcss-loader) est déjà installé. :wink:
Vous aurez besoin de configurer que le [plugin autoprefixer](https://www.npmjs.com/package/autoprefixer).

<details>
<summary>Solution</summary>

```js{30-40}
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

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
        test: /\.sass$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                autoprefixer({
                  browsers: ["IE >= 10", "last 2 versions", "chrome >= 28"]
                })
              ]
            }
          },
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]
};
```

</details>
