import Bulbasaur from "./bulbasaur.pokemon";

export default {
  name: "App",
  template: `
        <div id="app">
            <h1 class="title">Pokedex</h1>
            
            {{ Bulbasaur }}
        </div>  
    `,
  data() {
    return {
      Bulbasaur
    };
  }
};
