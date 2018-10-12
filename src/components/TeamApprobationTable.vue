<template>
  <b-table :items="items" :fields="fields" class="tableContainer">
    <template slot="approbations" slot-scope="row">
      <div class="rowContainer" @click.stop="row.toggleDetails">
      <div class="labelContainer">
        <span>{{ row.item.teamName }}</span>
      </div>
      <div class="expandContainer">
        <img :class="{ open: row.detailsShowing }" src="../assets/down-arrow.svg" @click.stop="row.toggleDetails" class="buttonExpand"/>
      </div>
      </div>
    </template>
    <template slot="row-details" slot-scope="row">
      <b-card>
        <b-row v-for="player in row.item.teamMembers" :key="player" class="player">
          <b-col>{{ player }}</b-col>
        </b-row>
      </b-card>
    </template>
  </b-table>
</template>

<style scoped lang="less">
@import (reference) "../GlobalStyles.less";

.tableContainer {
  width: 60%;
  margin: auto;
}

.rowContainer {
  width: 100%;
  height: auto;
  display: table;

  * {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  &:hover {
    cursor: pointer;
  }

  .labelContainer {
    width: 50%;
    display: table-cell;
    text-align: left;
    span {
      color: @textHover;
      font-weight: 500;
      font-size: 18px;
    }
  }

  .expandContainer {
    width: 50%;
    display: table-cell;
    text-align: right;

    .buttonExpand {
      width: 15px;
      height: 15px;
      transform: rotate(-90deg);
      transition: transform 0.1s linear;

      &.open {
        transform: rotate(0deg);
        transition: transform 0.1s linear;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }
}

.player {
  text-align: left;
  color: @secondaryDark;
}
</style>


<script>
export default {
  name: "TeamApprobationTable",
  data: function() {
    return {
      fields: ["approbations"],
      items: [
        {
          teamLength: 12,
          teamName: "Scrumtus Soccer",
          teamMembers: [
            "Alexis Morel",
            "Patrick Bealieu",
            "Walid Madaoui",
            "Yanik Gobeil",
            "Mathieu Favreau"
          ],
          _showDetails: false
        },
        {
          teamLength: 1,
          teamName: "Roy's team",
          teamMembers: ["Félix Roy"],
          _showDetails: false
        }
      ]
    };
  }
};
</script>
