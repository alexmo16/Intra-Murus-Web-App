<template>
  <div id="appHome">
    <filter-sports></filter-sports>
  </div>
</template>

<script>
// @ is an alias to /src
import FilterSports from "@/components/FilterSports.vue";

export default {
  name: "home",
  components: {
    FilterSports
  }
};
</script>

<style lang="less">
#appHome {
  margin-top: 35px;
}
</style>
