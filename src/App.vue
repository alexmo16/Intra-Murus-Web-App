<template>
  <div id="app">
    <div class="navbarContainer">
      <navbar :firstname="username" v-if="['500', '404'].indexOf($route.name) == -1"></navbar>
    </div>
    <div class="mainContainer">
      <toolbar class="toolbar" v-if="['500', '404'].indexOf($route.name) == -1" ref="appToolbar"></toolbar>
      <div class="routerview" ref="routerview"><router-view/></div>
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
    position: fixed;
    z-index: 2;
    width: 100%;
  }

  .mainContainer {
    height: 100%;
    display: flex;

    .toolbar {
      width: 200px;
      margin-top: 60px;
      position: fixed;
      z-index: 1;
    }

    .routerview {
      flex: 1;
      margin-top: 60px;
      margin-left: 200px;
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
        .get("/bs/api/user")
        .then(response => {
          if (response && response.data) {
            // TODO: l'api doit changer pour retourner les informations du current user.
            // alors il faudra utiliser une nouvelle route.
            if (response.data.prenom && response.data.nom) {
              this.username = `${response.data.prenom} ${response.data.nom}`;
            }
          }
        })
        .catch(error => {
          Promise.reject(error);
        });
    }
  }
};
</script>
