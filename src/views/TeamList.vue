<template>
  <div id="appTeams">
    <filter-sports :filters="['sports', 'leagues']" ref="filter"></filter-sports>
    <team-table></team-table>
  </div>
</template>

<script>
// @ is an alias to /src
import FilterSports from "@/components/FilterSports.vue";
import TeamTable from "@/components/TeamTable.vue";

export default {
  name: "TeamList",
  data: function() {
    return {
      selectedLeague: "",
      selectedSport: ""
    };
  },
  components: {
    FilterSports,
    TeamTable
  }
};
</script>

<style lang="less">
#appTeams {
  margin-top: 35px;
}
</style>
