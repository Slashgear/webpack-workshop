import PokemonComponent from "./pokemon.component";
import { getPokemons } from "./my/own/strange/way/to/structrure/my/project/services/pokemon.service";

const pokemonList = document.querySelector("#pokemons");

getPokemons().then(response => {
  response.results.map(({ name }, index) => {
    pokemonList.appendChild(PokemonComponent(name, index + 1));
  });
});
