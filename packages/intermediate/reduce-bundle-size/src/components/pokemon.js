import _ from "lodash";

export default {
  name: "Pokemon",
  template: `
        <router-link :to="to" class="column is-2 has-text-centered">
            <div class="card card-content">
                <div>
                    <img :src="url">
                    <p>{{formatName}}</p>
                </div>
            </div>
        </router-link>
    `,
  props: ["id", "name"],
  computed: {
    url() {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.id}.png`;
    },
    to() {
      return `/details/${this.id}`;
    },
    formatName() {
      return _.capitalize(this.name);
    }
  }
};
