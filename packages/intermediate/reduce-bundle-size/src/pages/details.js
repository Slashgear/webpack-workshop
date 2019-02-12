import { getPokemon } from "../pokemon.service";
import Pokemon from "../components/pokemon";

export default {
  name: "Details",
  components: {
    Pokemon
  },
  template: `
        <main>
            <router-link to="/">Home</router-link>
            <div class="columns is-multiline">
                  <Pokemon :id="$route.params.id" :name="pokemon.name"/>
            </div>
        </main>
    `,
  data() {
    return {
      pokemon: {}
    };
  },
  created() {
    getPokemon(this.$route.params.id).then(pokemon => (this.pokemon = pokemon));
  }
};
