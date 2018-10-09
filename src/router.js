import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Error404 from "./views/Error404.vue";
import Error500 from "./views/Error500.vue";

import axios from "axios";
import vueCookies from "vue-cookies";

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
      path: "/login",
      redirect: { name: "home" }
    },
    {
      path: "/internal-error",
      name: "500",
      component: Error500
    },
    {
      path: "*",
      name: "404",
      component: Error404
    }
  ]
});

let __redirectLogin = function(backurl, next) {
  let loginRoute = `/bs/login?backurl=${backurl}`;
  axios
    .get(loginRoute)
    .then(response => {
      if (response) {
        let isCASRedirection = response.request.responseURL.includes(
          "https://cas.usherbrooke.ca"
        );
        if (isCASRedirection) {
          window.location = response.request.responseURL;
        }
      } else {
        throw new Error();
      }

      next();
    })
    .catch(() => {
      next("/internal-error");
    });
};

/*
** to: Route Object being navigated to.
** from: Current route being navigated away from.
** next: function must be called to resolve the hook, used for redirect/error/move on next
*/
router.beforeEach((to, from, next) => {
  let isJwt = vueCookies.isKey("jwt");
  if (!isJwt && to.path != "/internal-error") {
    __redirectLogin("http%3a%2f%2flocalhost:8081%2f", next);
  } else {
    next();
  }
});

axios.interceptors.request.use(
  function(config) {
    let jwt = vueCookies.get("jwt");
    if (jwt) {
      config.headers.jwt = jwt;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    if (error.response && error.response.status == 403) {
      let keys = vueCookies.keys();
      keys.forEach(key => {
        vueCookies.remove(key);
      });
      __redirectLogin("http%3a%2f%2flocalhost:8081%2f", function() {});
    } else if (error.response && error.response.status == 500) {
      router.push("/internal-error");
    } else {
      Promise.reject(error);
    }
  }
);

export default router;
