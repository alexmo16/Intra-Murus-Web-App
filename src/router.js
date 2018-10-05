import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Error404 from "./views/Error404.vue";
import axios from "axios";

Vue.use(VueRouter);

const router = new VueRouter({
  saveScrollPosition: true,
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "*",
      name: "404",
      component: Error404
    }
  ]
});

/*
** to: Route Object being navigated to.
** from: Current route being navigated away from.
** next: function must be called to resolve the hook, used for redirect/error/move on next
*/
router.beforeEach((to, from, next) => {
  axios
    .get("/api")
    .then(response => {
      if (response.request.responseURL.includes("https://cas.usherbrooke.ca")) {
        window.location = response.request.responseURL;
      }
      next();
    })
    .catch(error => {
      console.log(error);
      next();
    });
});

export default router;
