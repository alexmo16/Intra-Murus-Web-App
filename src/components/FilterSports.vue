<template>
  <div class="filterContainer">
    <b-form-select v-model="selectedYear" :options="years" id="year" v-if="filters.indexOf('years') !== -1" class="mb-3 combobox"/>
    <b-form-select v-model="selectedSeason" :options="seasons" id="saison" v-if="filters.indexOf('seasons') !== -1" class="mb-3 combobox"/>
    <b-form-select v-model="selectedSport" :options="sports" id="sport" v-if="filters.indexOf('sports') !== -1" class="mb-3 combobox"/>
    <b-form-select v-model="selectedLeague" :options="leagues" id="ligue" v-if="filters.indexOf('leagues') !== -1" :disabled="selectedSport === ''" class="mb-3 combobox"/>
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
import BFormSelect from "bootstrap-vue/es/components/form-select/form-select";

import axios from "axios";

export default {
  name: "FilterSports",

  components: {
    BFormSelect
  },

  props: {
    filters: {
      required: false,
      default: function() {
        return ["years", "seasons", "leagues", "sports"];
      }
    },
    defaultSport: {
      required: false,
      default: function() {
        return { value: "", text: "Tous les sports" };
      }
    },
    defaultLeague: {
      required: false,
      default: function() {
        return { value: "", text: "Toutes les ligues" };
      }
    }
  },

  data: function() {
    let that = this;
    return {
      selectedSport: "",
      selectedYear: new Date().getFullYear(),
      selectedSeason: "AUTOMNE",
      selectedLeague: "",
      sports: [that.defaultSport],
      leagues: [that.defaultLeague],
      seasons: [
        { value: "AUTOMNE", text: "Automne" },
        { value: "HIVER", text: "Hiver" },
        { value: "ETE", text: "Été" }
      ],
      years: [
        { value: "2016", text: "2016" },
        { value: "2017", text: "2017" },
        { value: "2018", text: "2018" }
      ]
    };
  },

  created: function() {
    let that = this;
    this.getSportsValues(function(error) {
      if (error) {
        return error;
      }

      error = that.getLeaguesValues(function(error) {
        if (error) {
          return error;
        }
      });

      if (error) {
        return error;
      }
    });
  },

  methods: {
    getSportsValues: function(callback) {
      let options = {};

      axios
        .get("/bs/api/filtres/sports", options)
        .then(response => {
          let error;
          if (response && response.data) {
            this.updateSportsValues(response.data);
          } else {
            throw new Error("Unable to get sports values");
          }

          callback(error);
        })
        .catch(error => {
          callback(error);
          Promise.reject(error);
        });
    },

    getLeaguesValues: function(callback) {
      let options = {
        params: {
          sport: this.selectedSport
        }
      };

      axios
        .get("/bs/api/filtres/ligues", options)
        .then(response => {
          let error;
          if (response && response.data) {
            this.updateLeaguesValues(response.data);
          } else {
            throw new Error("Unable to get leagues values");
          }

          callback(error);
        })
        .catch(error => {
          callback(error);
          Promise.reject(error);
        });
    },

    updateSportsValues: function(sportsValues) {
      let that = this;
      this.sports = [this.defaultSport];
      sportsValues.forEach(function(sportValue) {
        let sportText = sportValue.replace(/_+/g, " ").toLowerCase();
        sportText = sportText[0].toUpperCase() + sportText.slice(1);
        that.sports.push({ value: sportValue, text: sportText });
      });
    },

    updateLeaguesValues: function(leaguesValues) {
      let that = this;
      this.leagues = [this.defaultLeague];
      leaguesValues.forEach(function(leagueValue) {
        let leagueText = leagueValue.replace(/_+/g, " ");
        leagueText = leagueText[0].toUpperCase() + leagueText.slice(1);
        that.leagues.push({ value: leagueValue, text: leagueText });
      });
    }
  },

  watch: {
    selectedSport: function() {
      this.selectedLeague = "";
      this.getLeaguesValues(function(error) {
        if (error) {
          return error;
        }
      });
    },

    selectedSeason: function() {
      this.selectedSport = "";
      this.getSportsValues(function(error) {
        if (error) {
          return error;
        }
      });
    }
  }
};
</script>
