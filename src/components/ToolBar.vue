<template>
    
    <div class="sidebar">
      <toolbaritem name="Acceuil" route="/" class="item"></toolbaritem>
      <toolbaritem name="À propos" route="/about" class="item" ></toolbaritem>
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
    position: absolute;
    height: 100%;
    overflow: auto;
  }

</style>

<script>
import toolbaritem from "@/components/ToolBarItem.vue";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  components: {
    toolbaritem
  }
};
</script>
