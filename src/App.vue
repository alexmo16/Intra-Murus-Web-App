<template>
  <div id="app">
    <navbar :firstname="username" v-if="['500', '404'].indexOf($route.name) == -1"></navbar>
    <toolbar></toolbar>
    <div class="routerView">
      <router-view/>  
    </div>
  </div>
</template>

<style lang="less">
@import "./GlobalStyles.less";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  div.routerView {
    margin-left: 200px;
    height: 100%;
  }

  @media screen and (max-width: 700px) {
    div.routerView {margin-left: 0;}
  }

}
</style>

<script>
import navbar from "@/components/NavBar.vue";
import toolbar from "@/components/ToolBar.vue";
import axios from "axios";

export default {
  name: "App",
  data: function() {
    return {
      username: ""
    };
  },
  components: {
    navbar,
    toolbar
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
