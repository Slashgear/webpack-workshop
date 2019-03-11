import Vue from "vue";
import Router from "vue-router";
import Home from "./pages/home";
import Details from "./pages/details";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", component: Home },
    { path: "/details/:id", component: Details, props: true }
  ]
});
