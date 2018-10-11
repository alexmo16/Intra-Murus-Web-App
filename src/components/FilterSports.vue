<template>
  <div>
    <b-form-select v-model="selectedSeason" :options="seasons" id="saison" class="mb-3 combobox"/>
    <b-form-select v-model="selectedSport" :options="sports" id="sport" class="mb-3 combobox"/>
    <b-form-select v-model="selectedLeague" :options="leagues" id="ligue" class="mb-3 combobox"/>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.combobox {
  max-width: 250px;
  min-width: 100px;
  margin-right: 25px;
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
      selectedSeason: "A18",
      selectedLeague: "AAA",
      sports: [
        { value: "Soccer", text: "Soccer" },
        { value: "Balle molle", text: "Balle molle" },
        { value: "Hockey sur Gazon", text: "Hockey sur Gazon" }
      ],
      seasons: [
        { value: "A18", text: "A18" },
        { value: "H19", text: "H19" },
        { value: "E19", text: "E19" }
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
