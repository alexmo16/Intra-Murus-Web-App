<template>
  <div id="appHome">
    <filter-sports></filter-sports>
    <team-approbation-table></team-approbation-table>
  </div>
</template>

<script>
// @ is an alias to /src
import FilterSports from "@/components/FilterSports.vue";
import TeamApprobationTable from "@/components/TeamApprobationTable.vue";

export default {
  name: "home",
  components: {
    FilterSports,
    TeamApprobationTable
  }
};
</script>

<style lang="less">
#appHome {
  margin-top: 35px;
}
</style>
