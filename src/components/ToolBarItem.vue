<template>
  <span class="item">
    <router-link :to="route" class="text">
        <em>{{ name }}</em>
    </router-link>
  </span>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import (reference) "../GlobalStyles.less";

.item .text {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
  cursor: pointer;
}

.item .text.active {
  background-color: @secondaryDark;
  color: @theme;
}

.item .text:hover:not(.active) {
  background-color: @secondary;
  color: @theme;
}
</style>

<script>
export default {
  name: "toolbaritem",
  props: {
    name: {
      type: String,
      required: true,
      default: ""
    },
    route: {
      type: String,
      required: true,
      default: ""
    }
  }
};
</script>
