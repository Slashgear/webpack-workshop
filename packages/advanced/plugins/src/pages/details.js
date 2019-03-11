import { getPokemon } from "../pokemon.service";
import Pokemon from "../components/pokemon";

import banner from "../assets/banner.jpg";

export default {
  name: "Details",
  components: {
    Pokemon
  },
  template: `
        <main class="banner">
            <router-link to="/">Home</router-link>
            <div class="columns is-multiline">
                  <Pokemon :id="$route.params.id" :name="pokemon.name"/>
            </div>
            <img :src="banner">
        </main>
    `,
  data() {
    return {
      pokemon: {},
      banner
    };
  },
  created() {
    getPokemon(this.$route.params.id).then(pokemon => (this.pokemon = pokemon));
  }
};
