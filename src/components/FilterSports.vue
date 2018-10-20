<template>
  <div class="filterContainer">
    <b-form-select v-model="selectedYear" :options="years" id="year" v-if="filters.indexOf('years') != -1" class="mb-3 combobox"/>
    <b-form-select v-model="selectedSeason" :options="seasons" id="saison" v-if="filters.indexOf('seasons') != -1" class="mb-3 combobox"/>
    <b-form-select v-model="selectedSport" :options="sports" id="sport" v-if="filters.indexOf('sports') != -1" class="mb-3 combobox"/>
    <b-form-select v-model="selectedLeague" :options="leagues" id="ligue" v-if="filters.indexOf('leagues') != -1" class="mb-3 combobox"/>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import (reference) "../GlobalStyles.less";

.filterContainer {
  display: inline;
}

.combobox {
  max-width: 180px;
  min-width: 100px;
  margin-right: 25px;
  &:focus {
    border-color: @themDark;
    box-shadow: 0 0 0.2rem @theme-box-shadow;
    -webkit-box-shadow: 0 0 0.2rem @theme-box-shadow;
  }
}
@media screen and (max-width: 1150px) {
  .combobox {
    max-width: 100px;
    margin-right: 8px;
  }
}

@media screen and (max-width: 1450px) {
  .combobox {
    max-width: 150px;
  }
}

.filterContainer * {
  &:hover {
    cursor: pointer;
  }
}
</style>

<script>
export default {
  name: "FilterSports",
  props: {
    filters: {
      required: false,
      default: ["years", "seasons", "leagues", "sports"]
    }
  },
  data: function() {
    return {
      selectedSport: "default",
      selectedYear: "2018",
      selectedSeason: "AUTOMNE",
      selectedLeague: "default",
      sports: [
        { value: "default", text: "Tous les sports" },
        { value: "SOCCER", text: "Soccer" },
        { value: "BASKETBALL", text: "Basketball" },
        { value: "HOCKEY", text: "Hockey" }
      ],
      years: [
        { value: "2016", text: "2016" },
        { value: "2017", text: "2017" },
        { value: "2018", text: "2018" }
      ],
      seasons: [
        { value: "AUTOMNE", text: "Automne" },
        { value: "HIVER", text: "Hiver" },
        { value: "ETE", text: "Été" }
      ],
      leagues: [
        { value: "default", text: "Toutes les ligues" },
        { value: "AA", text: "AA" }
      ]
    };
  }
};
</script>
