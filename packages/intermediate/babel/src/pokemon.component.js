import _ from "lodash";

export default (name, id) => {
  const pokemonRoot = document.createElement("div");
  pokemonRoot.classList.add("column");
  pokemonRoot.classList.add("is-2");
  pokemonRoot.classList.add("has-text-centered");

  const card = document.createElement("div");
  card.classList.add("card");

  const cardContent = document.createElement("div");
  card.classList.add("card-content");

  const image = document.createElement("img");
  image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  const p = document.createElement("p");
  p.innerHTML = _.capitalize(name);

  cardContent.appendChild(image);
  cardContent.appendChild(p);

  card.appendChild(cardContent);

  pokemonRoot.appendChild(card);

  return pokemonRoot;
};
