<template>
  <div class="toolbar">
    <toolbaritem name="Acceuil" route="/" class="item"></toolbaritem>
    <toolbaritem name="À propos" route="/about" class="item" ></toolbaritem>
  </div>
</template>

<style scoped lang="less">
@import (reference) "../GlobalStyles.less";

.toolbar {
  background-color: @secondaryLight;
  height: 100%;
  width: 100%;
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
