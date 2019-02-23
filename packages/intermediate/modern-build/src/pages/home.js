import { getPokemons } from "../pokemon.service";
import Pokemon from "../components/pokemon";

export default {
  name: "Home",
  components: {
    Pokemon
  },
  template: `
        <main>
            <div class="columns is-multiline">
                  <Pokemon v-for="(pokemon, id) in pokemons.results" :key="id" :id="id + 1" :name="pokemon.name"/>
            </div>
        </main>
    `,
  data() {
    return {
      pokemons: []
    };
  },
  created() {
    getPokemons().then(pokemons => (this.pokemons = pokemons));
  }
};
