import Vue from "vue";
import Router from "vue-router";
import Landing from "./components/Landing.vue";
import Mens from "./views/Mens.vue";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "main",
      component: Landing
    },
    {
      path: "/admin",
      name: "admin",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Admin.vue")
    },
    {
      path: "/mens",
      name: "mens",
      component: Mens
    },
    {
      path: "/womens",
      name: "womens"//,
      //component: null
    },
    {
      path: "/about",
      name: "about"//,
      //component: null
    },
    {
      path: "/all",
      name: "all"//,
      //component: null
    }
  ]
});
