# Les alias :alien:

> Pour démarrer cet exercice, sois sûr d'être dans le dossier `./packages/intermediate/alias`.
> Sois également sûr d'avoir [installé ce dépôt d'abord](../README.md#install)

## Le problème

Structurer un projet web peut être compliqué.
La structure de dossier peut vite devenir capilotractée.

Exemple ici avec le fichier `main.js`:

```js{2}
import PokemonComponent from "./pokemon.component";
import { getPokemons } from "./my/own/strange/way/to/structrure/my/project/services/pokemon.service";

const pokemonList = document.querySelector("#pokemons");

getPokemons().then(response => {
  response.results.map(({ name }, index) => {
    pokemonList.appendChild(PokemonComponent(name, index + 1));
  });
});
```

Ici, l'import vers le fichier `pokemon.service` est extrêmement long et compliqué.
Il n'est ni pratique à l'usage ni à la lecture.

Parfois, le fichier est très "haut" dans l'arborescence, votre _path_ va ressemblé à `../../../../../../../../../../../`.

## La solution proposée par webpack

Sur votre machine, vous auriez mis en place un lien symbolique.
Mais utiliser des liens symbolique dans un projet géré par NPM peut créer des problèmes avec l'usage des `link`.

Il est plutôt recommandé d'utilisé un `alias` de résolution.

Dans l'exemple, essayer de mettre en place un alias de résolution qui vous permettra de transformer

```js
import { getPokemons } from "./my/own/strange/way/to/structrure/my/project/services/pokemon.service";
```

en

```js
import { getPokemons } from "services/pokemon.service";
```

N'hésitez pas à vous aider de la [doc de webpack sur les alias](https://webpack.js.org/configuration/resolve/).

<details>
<summary>Solution</summary>

```js{11-15}
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.js", // The source module of our dependency graph
  output: {
    // Configuration of what we tell webpack to generate (here, a ./dist/main.js file)
    filename: "main.bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    alias: {
      services: path.resolve(
        __dirname,
        "src/my/own/strange/way/to/structrure/my/project/services"
      )
    }
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
