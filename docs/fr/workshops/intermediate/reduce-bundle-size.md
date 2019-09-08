# Découpons les bundles :scissors:

> Pour démarrer cet exercice, sois sûr d'être dans le dossier `./packages/intermediate/reduce-bundle-size`.
> Sois également sûr d'avoir [installé ce dépôt d'abord](../README.md#install)

## Introduction

Générer des gros bundle avec webpack va devenir un vrai problème, pour ces différents raisons :

- Votre application contient une énorme quantité de code
- Vous importez d'énormes dépendances
- Vous générez trop peu de bundles. Votre navigateur doit charger et analyser un énorme fichier avant de rendre votre application.

## L'application à améliorer

C'est une application de pokedex très simple faite avec vuejs.
Afin de simplifier la configuration de build, nous n'utiliserons pas `vue-loader` ici.
L'application possède deux pages :

- une page d'accueil affichant 20 pokémons
- une page de détail sur un pokémon avec une image spécifique.

Vous pouvez démarrer cette application avec :

```bash
yarn start
```

::: tip
Lorsque vous démarrez votre serveur, vous remarquerez des avertissements webpack dans la console.
webpack essaie de vous dire que votre pack d'applications est trop gros.

Essayons d'arranger ça ! :wink:
:::

## Analyser la taille et le contenu des bundles

Tout d'abord, essayons de nous concentrer sur ce qu'il y a dans notre paquet et vous verrez qu'il y a bien trop de choses.

Essayer de mettre en place [webpack Bundle Analyser](https://github.com/webpack-contrib/webpack-bundle-analyzer)

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

Normalement, vous devriez voir un unique bundle qui contient :

- tout le code de bulma
- toute la librairie lodash
- vue js
- tout le code de votre application

:::tip Autre conseil
Vous pouvez également générer un fichier `stats.json` associé à votre build afin de l'analyser.

En passant l'option `generateStatsFile: true` au _BundleAnalyzerPlugin_, vous pourrez ainsi utiliser des autres outils comme [https://webpack.github.io/](https://webpack.github.io/) pour analyser votre build.
:::

## le "Tree shaking"

Essayons d'abord de couper les branches de l'arbre des dépendances.

Nous importons tout le code bulma, essayons de réduire la taille des bundles en important seulement ce qui est nécessaire :

- columns
- heading
- card

Créez un fichier `app.sass` et ne chargez que des pièces bulma et remplacez l'importation bulma par cette importation de fichier.

```sass
@charset "utf-8"

@import "~bulma/sass/utilities/_all.sass"
@import "~bulma/sass/base/_all.sass"
@import "~bulma/sass/components/card.sass"
@import "~bulma/sass/elements/title.sass"
@import "~bulma/sass/grid/columns.sass"
```

Essayons de ne charger qu'une seule fonction de lodash au lieu de toute la librairie

```js
import _capitalize from "lodash/capitalize";
```

::: tip
Pour lodash vous pouvez aussi utiliser [babel plugin lodash](https://github.com/lodash/babel-plugin-lodash) si vous utilisez babel dans votre application.
:::

## Découper le code de son application: Code splitting

Maintenant l'application ne charge que les dépendances dont nous avons besoin.
Essayons de ne charger que le code de la page d'accueil sur la page d'accueil ! :smile:
Pour ce faire, nous aurons besoin de générer deux bundle : une pour la _homepage_, et une pour la page de détails.

Nous pourrions le faire en ajoutant une autre entrée dans la configuration de webpack **OU** nous pourrions utiliser les import dynamiques de webpack.

VueJS fonctionne par défaut avec le composant asynchrone :tada:

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

## Nommer vos "chunk" !

Ok les deux `chunk` contiennent votre code de page et c'est génial.
Vous pouvez essayer de charger votre application, le navigateur ne chargera que les JS dont vous avez besoin pour afficher la page.

On pourrait peut-être nommer ces chunks pour nous aider à comprendre ce qu'on vient de découper.

1. Changez le nom du fichier de sortie config en `[nom].bundle.js`.
2. Ajoutez un commentaire dans l'import dynamique pour nommer votre morceau (`import(/* webpackChunkName : "home" */ "./pages/home")`)

## Préchargez vos bundles !

Vous pouvez aussi dire à votre navigateur, **ok vous n'avez pas besoin de ce pack pour l'instant, mais essayez de le pré-rechercher si vous avez le temps, c'est bon pour vous.**
Ceci pourrait être fait avec un autre commentaire sur le webpack, regardez [doc associée](https://webpack.js.org/guides/code-splitting/#prefetchingpreloading-modules).
