<template>
  <router-link :to="to" class="column is-2 has-text-centered">
    <div class="card card-content">
      <div>
        <img :src="url" />
        <p>{{ formatName }}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
import _capitalize from "lodash/capitalize";

export default {
  name: "Pokemon",

  props: ["id", "name"],
  computed: {
    url() {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        this.id
      }.png`;
    },
    to() {
      return `/details/${this.id}`;
    },
    formatName() {
      return _capitalize(this.name);
    }
  }
};
</script>
