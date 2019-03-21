# Pour commencer

Ce dépôt contient une liste d'ateliers sur Webpack afin d'apprendre des concepts, l'API et les bonnes pratiques.
L'objectif de ce dépôt est de rassembler des ateliers à destination des novices ou des expérimentés.

::: tip
Ce projet est libre. Si vous trouvez des typos où si vous voulez contribuer, vous êtes libre d'envoyer une PR.
:::

## Besoins

- Installez NodeJS `> 10.0.0`
- Installez Yarn
- Avoir un navigateur web à jour comme Chrome ou Firefox.

```bash
npm i -g yarn
```

## Installation

Tous les ateliers sont listés dans le dossier `packages` groupés par difficulté.
Grâce à la fonctionnalité des workspaces de `yarn`, toutes les dépendances pour tous les ateliers sont téléchargés d'un seul coup.

Clonez le dépôt:

```bash
git clone http://github.com/Slashgear/webpack-workshop.git
```

puis:

```bash
yarn install
```

## Où commencer ?

Tout dépend de vos compétences avec `webpack`.

Si pour vous webpack est très nouveau, vous devriez commencer par [l'étape pour les débutants :baby:](novice/basics.md)

Si vous pensez maîtriser les concepts de base de Webpack, vous pouvez commencer directement pas [l'étape pour les confirmés](intermediate/dev.md).
