<template>
  <div class="filterContainer">
    <b-form-select v-model="selectedYear" :options="years" id="year" class="mb-3 combobox"/>
    <b-form-select v-model="selectedSeason" :options="seasons" id="saison" class="mb-3 combobox"/>
    <b-form-select v-model="selectedSport" :options="sports" id="sport" class="mb-3 combobox"/>
    <b-form-select v-model="selectedLeague" :options="leagues" id="ligue" class="mb-3 combobox"/>
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

@media screen and (max-width: 864px) {
  .combobox {
    max-width: 180px;
    min-width: 100px;
    margin-right: 8px;
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
  data: function() {
    return {
      selectedSport: "Soccer",
      selectedYear: "2018",
      selectedSeason: "Automne",
      selectedLeague: "AAA",
      sports: [
        { value: "Soccer", text: "Soccer" },
        { value: "Balle molle", text: "Balle molle" },
        { value: "Hockey sur Gazon", text: "Hockey sur gazon" }
      ],
      years: [
        { value: "2016", text: "2016" },
        { value: "2017", text: "2017" },
        { value: "2018", text: "2018" }
      ],
      seasons: [
        { value: "Automne", text: "Automne" },
        { value: "Hiver", text: "Hiver" },
        { value: "Été", text: "Été" }
      ],
      leagues: [
        { value: "AAA", text: "AAA" },
        { value: "AA", text: "AA" },
        { value: "A", text: "A" }
      ]
    };
  }
};
</script>
