# Le faire avec style :nail_care:

> Pour démarrer cet exercice, sois sûr d'être dans le dossier `./packages/novice/code-assets`.
> Sois également sûr d'avoir [installé ce dépôt d'abord](../README.md#install)

Si vous n'êtes pas familiés avec _Loaders_, vous devriez faire [static assets workshop](./static-assets.md) en premier.

## Plus de loaders !

Nous avons ajouté deux loaders pour vous `css-loaders`, `style-loader` dans les dépendances.
Une très petite feuille de style a également été définie.

Essayez de définir la configuration pour charger votre style avec webpack et importez le fichier `main.css` dans le module d'entrée.

[Doc de CSS Loader](https://github.com/webpack-contrib/css-loader)

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

</details>

:::tip
Vous devriez regarder le bundle généré. Il n'y a pas de fichier CSS généré. Le CSS doit être dans le bundle JS.
:::

## La magie des Loaders !

Cette fois, nous allons essayer d'ajouter une dépendance dans notre fichier css en incluant ce code :

```css
body {
  background: url("./landscape.jpg") center center;
}
```

:::tip
Et la ça marche !

webpack peut, grâce à des loaders, détecter d'autres dépendances et les ajouter dans son graphe.

```
title.js
      <- color.js
             <- node_modules/lodash
      <- main.css
             <- landscape.jpg
```

:::
