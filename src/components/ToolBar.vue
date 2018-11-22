<template>
  <div class="toolbar" :class="{ hide: !showToolbar }">
    <div class="item">
      <router-link to="/" class="text">Acceuil</router-link>
    </div>

    <div v-on:click="toggleTeam()" class="item"> 
      <p v-if="expandTeam" class="text-toggle">Équipe ▼</p>
      <p v-else class="text">Équipe ▶</p>
    </div>

  <div class="item" :class="{ hide: !expandTeam }">
    <router-link to="/team/approbation" class="text-dropdown">Approbation</router-link>
  </div>

  <div class="item" :class="{ hide: !expandTeam }">
    <router-link to="/team/list" class="text-dropdown">Liste</router-link>
  </div>

  <div class="item">
    <router-link to="/schedule" class="text">Horaires</router-link>
  </div>

  <div class="item">
    <router-link to="/about" class="text">À propos</router-link>
  </div>
    
  </div>
</template>

<style scoped lang="less">
@import (reference) "../GlobalStyles.less";

.hide {
  display: none;
}

.toolbar {
  background-color: @secondaryLight;
  height: 100%;
  width: 100%;
}

.item {
  user-select: none;
  &:hover {
    cursor: pointer;
  }
}

.item .text {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
  margin-bottom: 0px;
}

.item .text.router-link-exact-active {
  background-color: @secondaryDark;
  color: @theme;
}

.item .text:hover:not(.active) {
  background-color: @secondary;
  color: @text;
}

.item .text-dropdown {
  display: block;
  color: black;
  padding: 10px;
  text-decoration: none;
  margin-bottom: 0px;
  background-color: @dropdownOpen;
}

.item .text-dropdown.router-link-exact-active {
  background-color: @secondaryDark;
  color: @theme;
}

.item .text-dropdown:hover:not(.active) {
  background-color: @secondaryDark;
  color: @text;
}

.item .text-toggle {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
  margin-bottom: 0px;
  background-color: @dropdownOpen;
}

.item .text-toggle.router-link-exact-active {
  background-color: @secondaryDark;
  color: @theme;
}

.item .text-toggle:hover:not(.active) {
  background-color: @secondary;
  color: @text;
}
</style>

<script>
export default {
  name: "ToolBar",

  props: {
    msg: String
  },

  data: function() {
    return {
      showToolbar: {
        required: false,
        type: Boolean,
        default: true
      },
      expandTeam: {
        required: false,
        type: Boolean,
        default: false
      }
    };
  },

  mounted: function() {
    this.expandTeam = false;
  },

  methods: {
    toggleTeam: function() {
      this.expandTeam = !this.expandTeam;
    }
  }
};
</script>
