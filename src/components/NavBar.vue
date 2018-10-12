<!-- Navigation Bar Layout
  _____________________________________
  | Brand                       User  |
  ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯
  Brand : Contains the logo of the website and is linked to the home page.
  User - About : Redirect to the about page.
-->
<template>
  <b-navbar class="main" toggleable="md">
    <!-- Brand -->
    
      <b-navbar>
        <b-navbar-brand id="imurusBrand" to="/">
          <img src="../assets/centre_sportif_logo_brand.png" class="d-inline-block align-center" alt="BV">
          Intra-MurUS
        </b-navbar-brand>
      </b-navbar>

    <!-- Right aligned nav items -->
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav class="ml-auto">
        <!-- User -->
        <b-nav-item-dropdown right class="user">
          <template slot="button-content">
            <em>{{ firstname }}</em>
          </template>
          <b-dropdown-item to="/about" class="dropdownElement">À propos</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
    
  </b-navbar>
</template>

<style lang="less">
@import (reference) "../GlobalStyles.less";

/* Main frame of the navigation bar */
.main {
  background-color: @theme;
  color: @text;
  height: 100%;
}

.user {
  .dropdownElement {
    &:active {
      background-color: @theme;
    }

    &.active,
    &.active:active {
      background-color: @theme;
    }
  }
}

/* Brand */
.main {
  #imurusBrand {
    color: @text;
    position: absolute;
  }
}

/* User */
.main .ml-auto .user .nav-link {
  color: @text;
  &:hover,
  &:focus {
    color: @textHover;
  }
}
</style>

<script>
import bNavbar from "bootstrap-vue/es/components/navbar/navbar";
import bNavbarNav from "bootstrap-vue/es/components/navbar/navbar-nav";
import bNavbarBrand from "bootstrap-vue/es/components/navbar/navbar-brand";
import bNavbarToggle from "bootstrap-vue/es/components/navbar/navbar-toggle";

export default {
  name: "navbar",
  props: {
    firstname: {
      type: String,
      required: true,
      default: ""
    }
  },
  components: {
    bNavbar,
    bNavbarNav,
    bNavbarBrand,
    bNavbarToggle
  }
};
</script>
