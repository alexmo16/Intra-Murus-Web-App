<template>
  <div>
    <b-table :items="items" :fields="fields" class="tableContainer" show-empty empty-text="Il n'y a pas de demandes pour l'instant">
    <template slot="approbations" slot-scope="row">
      <div class="rowContainer" @click.stop="row.toggleDetails">
      <div class="labelContainer">
        <span>{{ row.item.teamTitle }}</span>
      </div>
      <div class="approbationContainer">
        <img id="acceptButton" :class="{ hide: !row.detailsShowing }" src="../assets/green-check.svg" @click.stop="showModal($event, row)"/>
        <img id="refuseButton" :class="{ hide: !row.detailsShowing }" src="../assets/red-cancel.svg" @click.stop="showModal($event,  row)"/>
      </div>
      <div class="expandContainer">
        <img :class="{ open: row.detailsShowing }" src="../assets/down-arrow.svg" class="buttonExpand"/>
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
  <b-modal centered ref="confirmationModal" title="Confirmation" @ok="sendDecision" @cancel="resetAttributes">
    <span v-if="this.isAcceptClicked">Êtes-vous sûr de vouloir approuver cette équipe?</span>
    <span v-if="this.isRefuseClicked">Êtes-vous sûr de vouloir refuser cette équipe?</span>
  </b-modal>
  </div>
</template>

<style scoped lang="less">
@import (reference) "../GlobalStyles.less";

.hide {
  display: none;
}

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

  .approbationContainer {
    display: table-cell;
    width: 50%;
    text-align: right;
    padding-right: 20px;

    img {
      margin-right: 8px;
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
import BModal from "bootstrap-vue/es/components/modal/modal";
import BTable from "bootstrap-vue/es/components/table/table";
import BCard from "bootstrap-vue/es/components/card/card";

import axios from "axios";

export default {
  name: "TeamApprobationTable",
  components: {
    BModal,
    BTable,
    BCard
  },
  data: function() {
    return {
      isRefuseClicked: false,
      isAcceptClicked: false,
      selectedRow: {},

      fields: ["approbations"],
      items: []
    };
  },
  created: function() {
    this._getFilteredApprobations();
  },
  methods: {
    resetAttributes: function() {
      this.isAcceptClicked = false;
      this.isRefuseClicked = false;
      this.selectedRow = {};
    },

    showModal: function(event, row) {
      this.isRefuseClicked = event.currentTarget.id === "refuseButton";
      this.isAcceptClicked = !this.isRefuseClicked;
      this.selectedRow = row;
      this.$refs.confirmationModal.show();
    },

    hideModal: function() {
      this.resetAttributes();
      this.$refs.confirmationModal.hide();
    },

    sendDecision: function(event) {
      event.preventDefault();
      let statut = this.isRefuseClicked ? "REFUSE" : "APPROUVE";
      let that = this;
      this.updateStatutApprobation(statut, function(error) {
        if (error) {
          return error;
        }
        that.hideModal();
        that._removeRowFromTable();
      });
    },

    updateStatutApprobation: function(statut, callback) {
      let options = {
        idEquipe: this.selectedRow.item.teamId,
        statutApprobation: statut
      };

      axios
        .put("/bs/api/equipes/updateStatutApprobation", options)
        .then(response => {
          if (response && response.status == 200) {
            callback();
          } else {
            return new Error();
          }
        })
        .catch(error => {
          Promise.reject(error);
        });
    },

    _removeRowFromTable: function() {
      this.items.splice(this.selectedRow.index, 1);
    },

    _getFilteredApprobations: function() {
      let options = {
        params: {
          annee: this.$parent.$refs.filter.selectedYear,
          periode: this.$parent.$refs.filter.selectedSeason,
          sport: this.$parent.$refs.filter.selectedSport,
          nomLigue: this.$parent.$refs.filter.selectedLeague,
          statutApprobation: "PRET_A_APPROUVER"
        }
      };

      axios
        .get("/bs/api/equipes/getEquipeApprobationView", options)
        .then(response => {
          if (response && response.data) {
            this._updateContent(response.data);
          }
        })
        .catch(error => {
          Promise.reject(error);
        });
    },

    _updateContent: function(players) {
      if (players && players.length > 0) {
        players.forEach(player => {
          let playerTeamIndex = this.items.findIndex(
            item => item.teamName === player.nomEquipe
          );

          let teamMemberName = `${player.prenom} ${player.nom}`;
          if (player.cip === player.cipCapitaine) {
            teamMemberName += ` (Capitaine)`;
          }

          if (playerTeamIndex === -1) {
            let teamTitle = player.nomEquipe;
            if (this.$parent.$refs.filter.selectedSport === "") {
              let sport = player.sport.replace(/_+/g, " ").toLowerCase();
              teamTitle += ` (${sport} ${player.nomLigue})`;
            }

            this.items.push({
              teamId: player.idEquipe,
              teamTitle: teamTitle,
              teamName: player.nomEquipe,
              teamMembers: [teamMemberName],
              _showDetails: false
            });
          } else {
            let isPlayerPresent =
              this.items[playerTeamIndex].teamMembers.indexOf(teamMemberName) !=
              -1;
            if (!isPlayerPresent) {
              this.items[playerTeamIndex].teamMembers.push(teamMemberName);
            }
          }
        });
      } else {
        this.items = [];
      }
    }
  },

  watch: {
    "$parent.$refs.filter.selectedSeason": function() {
      this.items = [];
      this._getFilteredApprobations();
    },
    "$parent.$refs.filter.selectedSport": function() {
      this.items = [];
      this._getFilteredApprobations();
    },
    "$parent.$refs.filter.selectedLeague": function() {
      this.items = [];
      this._getFilteredApprobations();
    }
  }
};
</script>
