<template>
  <div id="appTeams">
    <filter-sports :filters="['sports', 'leagues']" ref="filter"></filter-sports>
    <team-approbation-table></team-approbation-table>
  </div>
</template>

<script>
// @ is an alias to /src
import FilterSports from "@/components/FilterSports.vue";
import TeamApprobationTable from "@/components/TeamApprobationTable.vue";

export default {
  name: "Approbation",
  data: function() {
    return {
      selectedLeague: "",
      selectedSport: ""
    };
  },
  components: {
    FilterSports,
    TeamApprobationTable
  }
};
</script>

<style lang="less">
#appTeams {
  margin-top: 35px;
}
</style>
