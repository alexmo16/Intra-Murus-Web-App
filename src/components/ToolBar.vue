<template>
    <div class="sidebar">
      <a href="/">Acceuil</a>
      <a href="/about">À propos</a>
    </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import (reference) "../GlobalStyles.less";

.sidebar {
    margin: 0;
    padding: 0;
    width: 200px;
    background-color: @secondaryLight;
    position: fixed;
    height: 100%;
    overflow: auto;
  }

  .sidebar a {
    display: block;
    color: black;
    padding: 16px;
    text-decoration: none;
    cursor: pointer;
  }

  .sidebar a.active {
    background-color: @secondaryDark;
    color: @theme;
  }

  .sidebar a:hover:not(.active) {
    background-color: @secondary;
    color: @theme;
  }

    @media screen and (max-width: 700px) {
    .sidebar {
      width: 100%;
      height: auto;
      position: relative;
    }
    .sidebar a {float: left;}
    // div.content {margin-left: 0;}
  }

  @media screen and (max-width: 400px) {
    .sidebar a {
      text-align: center;
      float: none;
    }
  }
</style>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>
