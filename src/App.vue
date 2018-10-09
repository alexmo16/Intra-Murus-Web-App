<template>
  <div id="app">
    <navbar :firstname="username" v-if="['500', '404'].indexOf($route.name) == -1"></navbar>
    <router-view/>
  </div>
</template>

<script>
import navbar from "@/components/NavBar.vue";
import axios from "axios";

export default {
  name: "App",
  data: function() {
    return {
      username: ""
    };
  },
  components: {
    navbar
  },
  beforeCreate() {
    if (["500", "404"].indexOf(this.$route.name) == -1) {
      axios
        .get("/bs/api/membres")
        .then(response => {
          if (response && response.data && response.data.length > 0) {
            // TODO: l'api doit changer pour retourner les informations du current user.
            // alors il faudra utiliser une nouvelle route.
            this.username = response.data[0].prenom;
          }
        })
        .catch(error => {
          Promise.reject(error);
        });
    }
  }
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
