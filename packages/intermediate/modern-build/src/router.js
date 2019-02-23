import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", component: () => import("./pages/home") },
    {
      path: "/details/:id",
      component: () => import("./pages/details"),
      props: true
    }
  ]
});
