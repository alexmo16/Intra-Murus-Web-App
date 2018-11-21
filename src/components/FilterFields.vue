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

  created: function() {
    this.getFieldsValues(function() {});
  },

  methods: {
    getFieldsValues: function(callback) {
      let options = {};

      axios
        .get("/bs/api/terrains/getAllTerrains", options)
        .then(response => {
          let error;
          if (response && response.data) {
            this.updateFieldsValues(response.data);
          } else {
            throw new Error("Unable to get fields values");
          }

          callback(error);
        })
        .catch(error => {
          callback(error);
          Promise.reject(error);
        });
    },

    updateFieldsValues: function(fieldsValues) {
      let that = this;
      this.fields = [];
      fieldsValues.forEach(function(fieldValue) {
        let fieldText = fieldValue.replace(/_+/g, " ").toLowerCase();
        fieldText = fieldText[0].toUpperCase() + fieldText.slice(1);
        that.fields.push({ value: fieldValue, text: fieldText });
      });
    }
  }
};
</script>
