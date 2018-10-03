import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import vueCookie from "vue-cookie";

Vue.use(BootstrapVue);
Vue.use(vueCookie);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
