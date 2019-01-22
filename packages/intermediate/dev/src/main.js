require("bulma/css/bulma.css");
const _ = require("lodash");

const PokemonComponent = require("./pokemon.component");
const { getPokemons } = require("./pokemon.service");

const pokemonList = document.querySelector("#pokemons");

getPokemons().then(response => {
  response.results.map(({ name }, index) => {
    pokemonList.appendChild(PokemonComponent(name, index + 1));
  });
});
