<!-- Navigation Bar Layout
  _____________________________________
  | Brand                       User  |
  ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯
  Brand : Contains the logo of the website and is linked to the home page.
  User - About : Redirect to the about page.
-->
<template>
  <div class="main">
    <div id="hambourgeois" v-on:click="toggleToolBar()">☰</div>
    <router-link class="brand" :to="'/'">
      <img src="../assets/centre_sportif_logo_brand.png">
      Intra-MurUS
    </router-link>
    <div class="user">{{firstname}}</div>
  </div>
</template>

<style lang="less">
@import (reference) "../GlobalStyles.less";

/* Main frame of the navigation bar */
.main {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  background-color: @theme;
  color: @text;
  height: 100%;
  display: flex;
  user-select: none;

  #hambourgeois {
    align-self: center;
    font-size: 20px;
    margin-left: 10px;
    margin-right: 10px;
    &:hover {
      cursor: pointer;
    }
  }

  .brand {
    text-decoration: none;
    align-self: center;
    color: @text;
    &:hover {
      cursor: pointer;
    }
  }

  .user {
    text-decoration: none;
    align-self: center;
    position: absolute;
    right: 10px;
  }
}
</style>

<script>
export default {
  name: "navbar",
  props: {
    firstname: String
  },
  methods: {
    toggleToolBar: function() {
      if (this.$parent && this.$parent.$refs.appToolbar) {
        this.$parent.$refs.appToolbar.showToolbar = !this.$parent.$refs
          .appToolbar.showToolbar;
        if (this.$parent.$refs.appToolbar.showToolbar) {
          this.$parent.$refs.routerview.setAttribute(
            "style",
            "margin-left: 200px;"
          );
        } else {
          this.$parent.$refs.routerview.setAttribute(
            "style",
            "margin-left: 0px;"
          );
        }
      }
    }
  }
};
</script>
