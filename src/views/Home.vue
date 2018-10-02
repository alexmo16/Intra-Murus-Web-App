<template>
  <div id="appHome">
    <HelloWorld msg="Waddup Peeps"></HelloWorld>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>

<style lang="less">
#appHome {
  margin-top: 100px;
}
</style>
