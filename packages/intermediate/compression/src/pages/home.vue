<template>
  <main>
    <div class="columns is-multiline">
      <Pokemon
        v-for="(pokemon, id) in pokemons.results"
        :key="id"
        :id="id + 1"
        :name="pokemon.name"
      />
    </div>
  </main>
</template>

<script>
import { getPokemons } from "../pokemon.service";
import Pokemon from "../components/pokemon.vue";

export default {
  name: "Home",
  components: {
    Pokemon
  },
  data() {
    return {
      pokemons: []
    };
  },
  async created() {
    this.pokemons = await getPokemons();
  }
};
</script>
