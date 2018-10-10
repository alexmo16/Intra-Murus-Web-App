<!-- Navigation Bar Layout
  _____________________________________
  | Brand                    Dropdown |
  ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯
  Brand : Contains the logo of the website and is linked to the home page.
  Dropdown - About : Redirect to the about page.
-->
<template>
  <b-navbar toggleable="md" type="dark" variant="info">
    <!-- Brand -->
    <div>
      <b-navbar variant="faded" type="light">
        <b-navbar-brand to="/">
          <img src="../assets/centre_sportif_logo_brand.png" class="d-inline-block align-center" alt="BV">
          Intra-MurUS
        </b-navbar-brand>
      </b-navbar>
    </div>

    <!-- Right aligned nav items -->
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav class="ml-auto">
        <!-- Drop down -->
        <b-nav-item-dropdown right>
          <template slot="button-content">
            <em>{{ firstname }}</em>
          </template>
          <b-dropdown-item to="/about">À propos</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
    
  </b-navbar>
</template>

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
