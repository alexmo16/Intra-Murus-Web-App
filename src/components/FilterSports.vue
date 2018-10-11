<template>
  <div>
    <b-form-select v-model="selectedYear" :options="years" id="year" class="mb-3 combobox"/>
    <b-form-select v-model="selectedSeason" :options="seasons" id="saison" class="mb-3 combobox"/>
    <b-form-select v-model="selectedSport" :options="sports" id="sport" class="mb-3 combobox"/>
    <b-form-select v-model="selectedLeague" :options="leagues" id="ligue" class="mb-3 combobox"/>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import (reference) "../GlobalStyles.less";

.combobox {
  max-width: 200px;
  min-width: 100px;
  margin-right: 25px;
  &:focus {
    border-color: @themDark;
    box-shadow: 0 0 0.2rem @theme-box-shadow;
    -webkit-box-shadow: 0 0 0.2rem @theme-box-shadow;
  }
}
</style>

<script>
import BFormSelect from "bootstrap-vue/es/components/form-select/form-select";

export default {
  name: "FilterSports",
  components: {
    BFormSelect
  },
  data: function() {
    return {
      selectedSport: "Soccer",
      selectedYear: "2018",
      selectedSeason: "Automne",
      selectedLeague: "AAA",
      sports: [
        { value: "Soccer", text: "Soccer" },
        { value: "Balle molle", text: "Balle molle" },
        { value: "Hockey sur Gazon", text: "Hockey sur Gazon" }
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
