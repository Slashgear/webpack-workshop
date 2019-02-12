import _ from "lodash";

export const getPokemons = () =>
  fetch("https://pokeapi.co/api/v2/pokemon/").then(response => response.json());

export const getPokemon = id =>
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(response =>
    response.json()
  );

export const getRandomPokemon = getPokemons().then(pokemons =>
  _.sample(pokemons)
);
