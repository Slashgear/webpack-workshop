# Elle est Babel la vie ?

> Pour démarrer cet exercice, sois sûr d'être dans le dossier `./packages/intermediate/babel`.
> Sois également sûr d'avoir [installé ce dépôt d'abord](../README.md#install)

## Introduction

> "Utiliser le Javascript de demain, aujourd'hui" - Babel

::: tip
Si pour vous le rôle de Babel n'est pas clair, n'hésitez pas à consulter sa [documentation](https://babeljs.io/docs/en/index.html).:::
:::

Si vous essayez de charger votre application actuelle avec un ancien navigateur qui ne supporte pas les dernières fonctionnalités d'EcmaScript.
Tu auras des problèmes. :sob:
Lorsque vous rencontrez ces problèmes, vous voulez souvent générer du javascript ES5 afin de laisser tourner votre code sur chaque navigateur.
C'est là que Babel peut beaucoup aider.

_Est-ce que webpack babelify votre code automatiquement ?_

**Non**

La façon la plus simple de le faire est d'utiliser un chargeur spécifique pour les fichiers `.js` qui va babélifier tous les fichiers Javascript de l'arbre de dépendance.

## Initialiser le _babel-loader_

L'application actuelle est très simple, votre configuration webpack fonctionne bien mais n'utilise pas babel.
Configurez _babel-loader_ pour chaque fichier `.js`.

- Essayer de mettre en place le _babel-loader_ en suivant la [documentation](https://github.com/babel/babel-loader)
- Essayer d'accèder à votre application avec un navigateur moins à jour que Firefox ou Chrome.

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
