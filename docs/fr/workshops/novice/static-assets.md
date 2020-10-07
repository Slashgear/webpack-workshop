# Les fichiers statiques

> Pour démarrer cet exercice, sois sûr d'être dans le dossier `./packages/novice/static-assets`.
> Sois également sûr d'avoir [installé ce dépôt d'abord](../README.md#install)

## Introduction

Maintenant que nous savons comment utiliser la puissance des modules _CommonJS_ dans le navigateur grâce au processus de résolution webpack,
nous voulons pouvoir utiliser d'autres types de fichiers dont une application web a besoin.

Commençons simplement par un fichier statique comme une image.

<img src="../img/elias-arnar-1309173-unsplash.jpg" width="300px" height="auto" alt="example of asset"/>

Cette fois, nous allons essayer d'ajouter une image après le titre.

```
title.js
      <- color.js
             <- node_modules/lodash
      <- landscape.jpg
```

Title va avoir color.js et landscape.jpg en dépendance.

## Essayons de l'importer !

Essayons de charger notre image comme s'il s'agissait d'un module JS et d'exécuter la commande `yarn build`.

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

Vous verrez normalement un message d'erreur assez court dans votre console.

```log
ERROR in ./assets/landscape.jpg 1:0
Module parse failed: Unexpected character '�' (1:0)
You may need an appropriate loader to handle this file type.
(Source code omitted for this binary file)
 @ ./src/title.js 2:14-48
```

Cela signifie simplement que le webpack n'a pas réussi à charger votre fichier image.
Par défaut, webpack ne peut gérer que les fichiers du module JS.
Si vous voulez charger un autre type de fichier, vous avez absolument besoin d'un webpack **Loader**.

Le **Loader** est une brique optionnelle de webpack qui permet de gérer d'autres format de fichier comme des fichiers JPG.

Si vous regardez le fichier `package.json`, vous trouverez une nouvelle dépendance :`file-loader`.
Ce Loader a été créé pour ce genre de besoin.

## Mettre en place le Loader

Dans l'exemple [basic](./basics.md) nous avons vu deux objets de configuration webpack :

- entry
- output

Maintenant nous avons besoin du `module` pour configurer d'autres types de règles de résolution/compilation de modules.

Essayons d'ajouter une règle pour les fichiers `.jpg`.

```js{9-18}
const path = require("path");

module.exports = {
  entry: "./src/title.js",
  output: {
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

## Essayons d'utiliser notre image chargée

webpack semble maintenant avoir le pouvoir de charger un fichier `.jpg`. Regardons ce qu'il met dans l'image "constante" que nous avons créée ci-dessus.

Normalement, vous verrez un `<strange-generated-hash>.jpg` dans votre console. Ce message correspond au fichier webpack créé dans le dossier `dist`.

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

`yarn build` et ouvrez votre application, vous verrez normalement que votre image est cassée.

Votre navigateur ne regarde pas dans le bon répertoire, le chemin vers le fichier de l'image n'est pas le bon.

### Changer le chemin

Nous avons dit à webpack que le chemin de sortie est le dossier `dist`. C'est exactement là qu'il crée l'image chargée.

Essayons de configurer deux choses :

- faire que webpack crée un dossier `assets` pour ce type de fichiers (_outputPath_)
- rendre le chemin généré à partir du module chargé correct pour le navigateur (_publicPath_)

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

::: tip
Maintenant, votre image devrait s'afficher sans erreur ! 👏👏👏
:::
