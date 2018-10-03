import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vueCookie from "vue-cookie";
import BootstrapVue from "bootstrap-vue";

import "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(vueCookie);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
