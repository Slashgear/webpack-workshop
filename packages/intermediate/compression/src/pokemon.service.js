export function getPokemons() {
  return fetch("https://pokeapi.co/api/v2/pokemon/").then(response =>
    response.json()
  );
}

export function getPokemon(id) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(response =>
    response.json()
  );
}

export function getRandomPokemon() {
  return console.log("YEAH");
}
