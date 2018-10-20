<template>
  <span class="item">
    <router-link :to="route" class="text">
        {{ name }}
    </router-link>
  </span>
</template>

<style scoped lang="less">
@import (reference) "../GlobalStyles.less";

.item .text {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
}

.item .text.active {
  background-color: @secondaryDark;
  color: @theme;
}

.item .text:hover:not(.active) {
  background-color: @secondary;
  color: @text;
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
