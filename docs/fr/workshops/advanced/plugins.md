# Votre premier plugin :heart:

> Pour démarrer cet exercice, sois sûr d'être dans le dossier `./packages/advanced/plugins`.
> Sois également sûr d'avoir [installé ce dépôt d'abord](../README.md#install)

## Introduction

Vous avez déjà vu et utilisé de nombreux plugins avec webpack.
Il donne à l'utilisateur la possibilité d'ajouter des fonctionnalités, d'optimiser les performances, etc...

Une API est ouverte pour vous permettre d'implémenter votre propre plugin webpack.

::: tip Petit conseil
Dans votre projet vous pouvez avoir besoin d'un plugin qui a déjà été créé par la communauté, n'hésitez pas à regarder [awesome-webpack](https://github.com/webpack-contrib/awesome-webpack#webpack-plugins).
:::

Vous devez également savoir que plus de 70% du code de base de webpack utilise sa propre API de plugin.
Le code webpack est un excellent exemple de _comment écrire un plugin ?_

## Hooks et Tapable

Un plugin webpack c'est:

- Une fonction JavaScript nommée.
- Définit la méthode `apply` dans son prototype.
- Spécifie un [event hook](https://webpack.js.org/api/compiler-hooks/) à utiliser.
- Manipule les données spécifiques aux instances internes du webpack.

Exemple ici:

```javascript
class MyExampleWebpackPlugin {
  apply(compiler) {
    // Spécifie sur quel hook s'accroche le plugin
    compiler.hooks.done.tapAsync(
      "MyExampleWebpackPlugin",
      (compilation, callback) => {
        console.log("This is an example plugin!");
        console.log(
          "Here’s the `compilation` object which represents a single build of assets:",
          compilation
        );

        // Manipulation des données internes de webpack
        compilation.addModule(/* ... */);

        callback();
      }
    );
  }
}
```

## Créons un plugin pour mesurer le temps de build

:::warning
Ce plugin existe déjà, vous pouvez déjà avoir cette info mais c'est un prétexte.
:::

Pour apprendre à écrire un plugin.

Essayez de définir un plugin qui prend les `stats` données pas le hook `done' et afficher le temps de build en millisecondes.

<details>
<summary>Solution</summary>

```javascript{7-15,64}
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
