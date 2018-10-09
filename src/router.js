import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Error404 from "./views/Error404.vue";
import axios from "axios";
import vueCookie from "vue-cookie";

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
      path: "*",
      name: "404",
      component: Error404
    }
  ]
});

let __redirectLogin = function(backurl, callback) {
  let loginRoute = `/bs/login?backurl=${backurl}`;
  axios
    .get(loginRoute)
    .then(response => {
      let isCASRedirection = response.request.responseURL.includes(
        "https://cas.usherbrooke.ca"
      );
      if (isCASRedirection) {
        window.location = response.request.responseURL;
      }
      callback();
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

/*
** to: Route Object being navigated to.
** from: Current route being navigated away from.
** next: function must be called to resolve the hook, used for redirect/error/move on next
*/
router.beforeEach((to, from, next) => {
  let jwt = vueCookie.get("jwt");
  if (jwt == null) {
    __redirectLogin("http%3a%2f%2flocalhost:8081%2f", next);
  } else {
    next();
  }
});

axios.interceptors.request.use(
  function(config) {
    let jwt = vueCookie.get("jwt");
    config.headers.jwt = jwt;
    return config;
  },
  function(error) {
    // Do something with request error
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
      __redirectLogin("http%3a%2f%2flocalhost:8081%2f", function() {});
    }
    return Promise.reject(error);
  }
);

export default router;
