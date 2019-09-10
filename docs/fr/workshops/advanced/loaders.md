---
title: Les loaders webpack
meta:
  - name: description
    content: Comment et pourquoi créer un loader webpack ? Comment charger des formats de fichiers différents avec webpack ? Un exemple simple.
---

# Chargeons de nouveaux formats :truck:

> Pour démarrer cet exercice, sois sûr d'être dans le dossier `./packages/advanced/loaders`.
> Sois également sûr d'avoir [installé ce dépôt d'abord](../README.md#install)

## Un peu de contexte

Vous le savez surement, mais webpack ne sais gérer par défaut que des module JS (Esm, ou CJS).
Si vous souhaitez charger d'autres formats de fichier, vous devez passer par ce qu'on appelle un loader.

Il en existe déjà de nombreux, vous pouvez trouver une longue liste sur la page [Awesome de webpack](https://github.com/webpack-contrib/awesome-webpack#loaders).

## Quand créer un loader

Il est rare de devoir definir un loader pour webpack, ceux de la communauté couvrent 99% des besoins _mais_ dans vos projets, il est possible que vous ayez à charger un format de fichier qui vous est privé.

Essayons de créer un loader sur un cas simple :bulb: pour comprendre l'API.

Imaginons un fichier qui contiennent des info sur un _Pokemon_ dont l'extension serait `.pokemon`.

Ce fichier contiendrait comme contenu un JSON représentant le pokemon.

```json
{
  "abilities": [
    {
      "ability": {
        "name": "chlorophyll",
        "url": "https://pokeapi.co/api/v2/ability/34/"
      },
      "is_hidden": true,
      "slot": 3
    },
    {
      "ability": {
        "name": "overgrow",
        "url": "https://pokeapi.co/api/v2/ability/65/"
      },
      "is_hidden": false,
      "slot": 1
    }
  ],
  "base_experience": 64,
  "forms": [
    { "name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon-form/1/" }
  ],
  "height": 7,
  "held_items": [],
  "id": 1,
  "is_default": true,
  "location_area_encounters": "https://pokeapi.co/api/v2/pokemon/1/encounters",
  "name": "bulbasaur",
  "order": 1,
  "species": {
    "name": "bulbasaur",
    "url": "https://pokeapi.co/api/v2/pokemon-species/1/"
  },
  "sprites": {
    "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
    "back_female": null,
    "back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
    "back_shiny_female": null,
    "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    "front_female": null,
    "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
    "front_shiny_female": null
  },
  "stats": [
    {
      "base_stat": 45,
      "effort": 0,
      "stat": { "name": "speed", "url": "https://pokeapi.co/api/v2/stat/6/" }
    },
    {
      "base_stat": 65,
      "effort": 0,
      "stat": {
        "name": "special-defense",
        "url": "https://pokeapi.co/api/v2/stat/5/"
      }
    },
    {
      "base_stat": 65,
      "effort": 1,
      "stat": {
        "name": "special-attack",
        "url": "https://pokeapi.co/api/v2/stat/4/"
      }
    },
    {
      "base_stat": 49,
      "effort": 0,
      "stat": { "name": "defense", "url": "https://pokeapi.co/api/v2/stat/3/" }
    },
    {
      "base_stat": 49,
      "effort": 0,
      "stat": { "name": "attack", "url": "https://pokeapi.co/api/v2/stat/2/" }
    },
    {
      "base_stat": 45,
      "effort": 0,
      "stat": { "name": "hp", "url": "https://pokeapi.co/api/v2/stat/1/" }
    }
  ],
  "types": [
    {
      "slot": 2,
      "type": { "name": "poison", "url": "https://pokeapi.co/api/v2/type/4/" }
    },
    {
      "slot": 1,
      "type": { "name": "grass", "url": "https://pokeapi.co/api/v2/type/12/" }
    }
  ],
  "weight": 69
}
```

## Importons un fichier pokemon avec webpack

Dans l'application en place, essayer de faire `yarn build`.

Vous devriez avoir l'erreur suivante:

```
ERROR in ./src/bulbasaur.pokemon 2:13
Module parse failed: Unexpected token (2:13)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
| {
>   "abilities": [
|     {
|       "ability": {
 @ ./src/app.js 1:0-44 15:6-15
 @ ./src/main.js
```

Cette erreur indique que le format du fichier n'est pas reconnu par webpack.

Essayons d'écrire le loader qui va permettre cela.

Dans le fichier `pokemon.loader.js` définissons cette fonction:

```js
module.exports = function getPokemon(source) {
  // Une fonction qui prend une string du fichier chargé
  return `export default ${JSON.stringify(source)}`; // On retourne un module CJS compréhensible par webpack.
};
```

Ce loader permet de charger n'importe quel pokemon qui respecte le format JSON.
Il transforme le JSON en module CommonJS.

Essayons de l'appliquer à notre application:

```js{29-36}
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/main.js", // The source module of our dependency graph
  devServer: {
    contentBase: "./dist"
  },
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
              publicPath: "assets"
            }
          }
        ]
      },
      {
        test: /\.(pokemon)$/,
        use: [
          {
            loader: path.resolve(__dirname, "pokemon.loader.js")
          }
        ]
      },
      {
        test: /\.(sass|css)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  resolve: {
    alias: {
      vue: "vue/dist/vue.js"
    }
  },
  plugins: [
    new CleanWebpackPlugin("dist"),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]
};
```

Rebuilder le projet, et ouvrer le fichier `dist/index.html`, l'application devrait fonctionner.

Vous pouvez trouvez [d'autres informations sur la création de loader dans la doc de webpack](https://webpack.js.org/contribute/writing-a-loader/).
