<template>
  <div class="filterContainer">
    <b-form-select v-model="selectedField" :options="fields" id="terrain" class="mb-3 combobox">
      <template slot="first">
        <option :value="null" disabled>Choisir un terrain</option>
      </template>
    </b-form-select>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import (reference) "../GlobalStyles.less";

.filterContainer {
  display: flex;
}

.combobox {
  max-width: 180px;
  min-width: 100px;
  &:focus {
    border-color: @themDark;
    box-shadow: 0 0 0.2rem @theme-box-shadow;
    -webkit-box-shadow: 0 0 0.2rem @theme-box-shadow;
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
  name: "FilterFields",

  components: {
    BFormSelect
  },

  data: function() {
    return {
      selectedField: null,
      fields: []
    };
  },

  created: function() {},

  methods: {
    getSportsValues: function(callback) {
      let options = {
        params: {
          annee: this.selectedYear,
          periode: this.selectedSeason
        }
      };

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

    updateSportsValues: function(sportsValues) {
      let that = this;
      this.sports = [this.defaultSport];
      sportsValues.forEach(function(sportValue) {
        let sportText = sportValue.replace(/_+/g, " ").toLowerCase();
        sportText = sportText[0].toUpperCase() + sportText.slice(1);
        that.sports.push({ value: sportValue, text: sportText });
      });
    }
  }
};
</script>
