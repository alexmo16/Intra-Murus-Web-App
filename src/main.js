import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vueCookies from "vue-cookies";
import BootstrapVue from "bootstrap-vue";
import axios from "axios";

import "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(vueCookies);
Vue.use(axios);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
