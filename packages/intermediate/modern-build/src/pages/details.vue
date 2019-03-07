<template>
  <main class="banner">
    <router-link to="/">Home</router-link>
    <div class="columns is-multiline">
      <Pokemon :id="$route.params.id" :name="pokemon.name" />
    </div>
    <img :src="banner" />
  </main>
</template>

<script>
import { getPokemon } from "../pokemon.service";
import Pokemon from "../components/pokemon.vue";

import banner from "../assets/banner.jpg";

export default {
  name: "Details",
  components: {
    Pokemon
  },
  data() {
    return {
      pokemon: {},
      banner
    };
  },
  async created() {
    this.pokemon = await getPokemon(this.$route.params.id);
  }
};
</script>
