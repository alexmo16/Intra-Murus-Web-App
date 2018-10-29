<template>
  <div id="app">
    <div class="navbarContainer">
      <navbar :firstname="username" v-if="['500', '404'].indexOf($route.name) == -1"></navbar>
    </div>
    <div class="mainContainer">
      <toolbar class="toolbar" v-if="['500', '404'].indexOf($route.name) == -1" ref="appToolbar"></toolbar>
      <div class="routerview"><router-view/></div>
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
  height: 100%;
  display: flex;
  flex-flow: column;

  .navbarContainer {
    height: 60px;
  }

  .mainContainer {
    height: 100%;
    display: flex;

    .toolbar {
      width: 200px;
    }

    .routerview {
      flex: 1;
    }
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
