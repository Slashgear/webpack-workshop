# La compression de fichier 🗜️

> Pour démarrer cet exercice, sois sûr d'être dans le dossier `./packages/intermediate/compression`.
> Sois également sûr d'avoir [installé ce dépôt d'abord](../README.md#install)

## Pourquoi compresser vos fichiers ?

La compression Gzip permet d'économiser en moyenne 30% du volume de transfert Internet.
Vous pouvez laisser votre serveur web compresser votre paquet généré _à la volée_ à chaque demande mais pour les fichiers statiques, vous devriez vraiment essayer de le compresser dans la phase de la compilation.

Tout serveur web décent peut servir des fichiers pré-compressés si le navigateur le demande.

Bonne nouvelle, webpack a un plugin pour vous. :tada:

## Ajoutons la compression Gzip

Regardez la configuration de [compression-webpack-plugin](https://webpack.js.org/plugins/compression-webpack-plugin) et ajoutez-la à l'application.

:::tip
Ce package permet également de compresser vos fichier avec Brolti, n'hésitez pas à essayer.
:::

<details>
<summary>Solution</summary>

```js{5,53}
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const CompressionPlugin = require("compression-webpack-plugin");

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
    new CompressionPlugin()
  ]
};
```

</details>

::: tip
Cet [article](https://medium.com/@selvaganesh93/how-to-serve-webpack-gzipped-file-in-production-usinging-nginx-692eadbb9f1c) explique comment utiliser vos fichiers compressés dans une configuration Nginx.
:::

## :wink: Les images aussi peuvent être compressées

Il est considéré comme une très mauvaise pratique de laisser le navigateur charger une image non optimisée.
Pour éviter cette situation, il est conseillé de compresser les images avec divers outils.

Essayez de mettre en place [imagemin-webpack-plugin](https://www.npmjs.com/package/imagemin-webpack-plugin).

<details>
<summary>Solution</summary>

```js{6,55}
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;

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
    new ImageminPlugin()
  ]
};
```

</details>
