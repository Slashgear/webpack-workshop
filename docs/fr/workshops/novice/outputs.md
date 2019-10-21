# Jouons avec les outputs

> Pour démarrer cet exercice, sois sûr d'être dans le dossier `./packages/novice/outputs`.
> Sois également sûr d'avoir [installé ce dépôt d'abord](../README.md#install)

## Ajoutons une entry

Maintenant, nous allons forcer la création d'une `output` en ajoutant une autre `entry`.
C'est l'arborescence des dépendances actuelles de cette petite application.

```
title.js
      <- color.js
             <- node_modules/lodash
      <- main.css
             <- landscape.jpg
```

Essayez d'ajouter le fichier `color.js` comme entrée.

[Doc sur la gestion des entrypoints de webpack](https://webpack.js.org/concepts/entry-points/)

Puis regardez le dossier dist.

::: warning
Vous aurez probablement une erreur lorsque vous essayerez d'ajouter une autre `entry`.
:::

<details>
<summary>Solution</summary>

```js{4-10}
const path = require("path");

module.exports = {
  entry: {
    main: "./src/title.js",
    color: "./src/color.js"
  }, // The source module of our dependency graph
  output: {
    // Configuration of what we tell webpack to generate (here, a ./dist/main.js file)
    filename: "[name].js",
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

</details>

:::tip
Lors qu'on ajoute des `entry` a une configuration webpack, celui-ci va construire plusieurs arbres de dépendances.
Il faut cependant noter qu'il faut alors configurer un nom d'output dynamique.
On peut parler ici de code splitting mais si vous observez le contenu des deux bundles vous verrez de la redondance.
:::

## Générer votre fichier index.html

Actuellement, si vous regarder votre fichier `index.html`, le chargement du fichier `main.js` est géré manuellement.
Si votre bundle change de nom, vous risquez de devoir aller changer votre fichier html.

Essayons d'automatiser cela grâce à [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/).

<details>
<summary>Solution</summary>

```js{2,34-38}
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/title.js",
    color: "./src/color.js"
  }, // The source module of our dependency graph
  output: {
    // Configuration of what we tell webpack to generate (here, a ./dist/main.js file)
    filename: "[name].js",
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
      template: "./index.html"
    })
  ]
};
```

</details>

:::tip
:bulb: Vous pouvez également tenter d'utiliser un template `handlebar` pour structurer votre page.
:::

## Nettoyer le dossier dist

Comme vous l'avez peut-être remarqué au cours des guides et des exemples de code précédents, notre dossier `/dist` est devenu très encombré.
webpack va générer les fichiers et les mettre dans le dossier `/dist` pour vous, mais il ne garde pas la trace des fichiers réellement utilisés par votre projet.

En général, il est recommandé de nettoyer le dossier `/dist` avant chaque compilation, afin que seuls les fichiers utilisés soient générés. On va s'occuper de ça.

Un plugin populaire pour y parvenir est le [clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin), alors installons-le et configurons-le.

:::tip
Le plugin est déjà installé.
:::

<details>
<summary>Solution</summary>

```js
new CleanWebpackPlugin(),
```

</details>
