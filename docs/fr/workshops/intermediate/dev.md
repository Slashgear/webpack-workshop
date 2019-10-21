# Les astuces pour un environnement de dev :rocket:

> Pour démarrer cet exercice, sois sûr d'être dans le dossier `./packages/intermediate/dev`.
> Sois également sûr d'avoir [installé ce dépôt d'abord](../README.md#install)

## Introduction

Mettre en place un processus de _build_ avec webpack ne doit pas empêcher ou gêner le développement.

Au contraire, webpack peut apporter des solutions pratiques pour vous aider.

## Les Source maps

Le javascript généré par webpack n'est pas vraiment lisible humainement.
Pour que vous puissez les lire dans les devtools de votre navigateur, il vous faut des [source maps](https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map).

Lancer l'application de cet exercice avec:

```bash
yarn build
```

Essayez d'ouvrir le bundle dans les devtools de votre navigateur. Vous devriez avoir du mal à comprendre ce que fait ce javascript.

Pour générer les source maps:

- activez le [mode](https://webpack.js.org/configuration/mode) developpement
- definissez la clé `devtool: 'inline-source-map'`

:::tip
Vous pouvez également changer le mode de webpack grâce à des `flags` webpack-cli.
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
    "webpack-cli": "^3.2.1",
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

Sur Chrome, ouvrez votre panneau devtools nommé _Source_, essayez d'ouvrir le fichier `pokemon.service.js`.
Vous devriez pouvoir lire le même fichier que vous avez écrit. :tada:
Vous pouvez maintenant mettre des **breakpoints** dans le navigateur pour vous aider à déboguer votre code.

## Le mode watch

_Est-il possible de ne pas avoir a relancer un build à chaque fois que j'apporte une modification ?_

La solution la plus simple est d'activer la fonction [`watch`](https://webpack.js.org/configuration/watch/) de webpack.

Essayez de le faire :muscle:

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
    "webpack-cli": "^3.2.1",
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

## Le serveur de développement

_Est-il possible de démarrer un server web à partir de ce qui est généré par webpack ?_

La solution est `webpack-dev-server`, c'est un package qui peut démarrer un serveur web basé sur une configuration webpack.

- Ajoutez un script `npm` nommé `start` qui utilise `webpack-dev-server` sur votre configuration webpack
- Ajoutez une clé `devServer` dans votre configuration pour remplacer la clé `contentBase` pour cibler votre répertoire de sortie.

Vous trouverez la doc de [webpack-dev-server ici](https://webpack.js.org/configuration/dev-server/)

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
