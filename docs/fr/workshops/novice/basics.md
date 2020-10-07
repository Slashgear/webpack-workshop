# Les bases

> Pour démarrer cet exercice, sois sûr d'être dans le dossier `./packages/novice/basic`.
> Sois également sûr d'avoir [installé ce dépôt d'abord](../README.md#install)

## Introduction

Ce premier exemple a pour but de vous aider à comprendre pourquoi webpack existe et son usage basique.

Dans cette application, nous avons défini deux modules CommonJS (modules utilisés [sur NodeJS](https://nodejs.org/docs/latest/api/modules.html)).
Ils sont tous les deux chargés dans `index.html`.

Si vous n'êtes pas familiés avec les capacités des navigateurs, sachez que les modules CommonJS n'y sont pas fonctionnels.
Un navigateur ne peut pas gérer l'import direct de dépendance NodeJS.

Ici le graphe de dépendance de l'application ressemble à:

```
title.js
      <- color.js
             <- node_modules/lodash
```

## La solution webpack

webpack est un package NodeJS qui génère un _bundle_ (concaténation de modules), basé sur la résolution d'un arbre de dépendances.

### Étape 1: Mise en place d'une configuration simple

Pour configurer webpack, vous devez créer un fichier nommé `webpack.config.js` à la racine de votre projet. Dans ce fichier, exporter un module.
Couplé avec un outil comme `webpack-cli`, vous pourrez alors facilement lancer un _build_.

```js
const path = require("path");

module.exports = {
  entry: "./src/title.js", // Le module racine de l'arbre de dépendance.
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  }
};
```

Après avoir lancé la commande `yarn webpack`, un nouveau fichier `main.js` devrait être généré dans le dossier `dist`.

### Étape 2: Changer les cibles des scripts d'index.html

Pour l'instant, `index.html` ne référence pas le fichier _output_, nous devons donc changer cela.
Il suffit de changer le tag `<script/>` de votre `index.html` pour référencer le fichier généré par webpack

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

### Étape 3: Définir un script pour lancer webpack

Grâce à un `npm script`, vous allez définir une commande pour lancer le build de webpack.

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

Maintenant lancez le `build` et ouvrez le fichier `index.html` dans un navigateur.

```bash
yarn build
```

Regardez le _bundle_ généré et testez l'application.

### Que s'est-il passé ?

ici webpack, grâce à son fichier de configuration, a construit un arbre de dépendance en se basant sur l'entry `title.js`.
Une fois cet arbre résolu, en suivant sa configuration de "sortie", il a généré un fichier `main.js` contenant l'ensemble des modules de l'arbre de dépendances sous la forme de chunks.

N'hésitez pas à jeter un coup d'oeil à ce qui est contenu dans ce fichier généré.
