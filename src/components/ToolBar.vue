<template>
  <div class="toolbar" :class="{ hide: showToolbar }">
    <toolbaritem name="Acceuil" route="/" class="item"></toolbaritem>
    <toolbaritem name="Équipes" route="/teams" class="item"></toolbaritem>
    <toolbaritem name="À propos" route="/about" class="item" ></toolbaritem>
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
</style>

<script>
import toolbaritem from "@/components/ToolBarItem.vue";

export default {
  name: "ToolBar",
  props: {
    msg: String
  },
  data: function() {
    return {
      showToolbar: {
        required: false,
        default: true
      }
    };
  },
  components: {
    toolbaritem
  }
};
</script>
