<template>
  <div id="appSchedule">
    <div id="calendarHeader">
      <filter-fields class="filter" ref="filter"></filter-fields>
      <div class="lastWeekContainer">
        <img id="lastWeek" src="../assets/down-arrow.svg" @click.stop="changeWeek($event)"/>
      </div>
      <div id="weekLabelContainer">
        <span>Semaine du </span>
        <span id="weekFirstDay">{{ weekLabel }}</span>
      </div>
      <div class="nextWeekContainer">
        <img id="nextWeek" src="../assets/down-arrow.svg" @click.stop="changeWeek($event)"/>
      </div>
    </div>
    <vue-tuicalendar ref="calendar" :options="options" :schedules="schedules">
    </vue-tuicalendar>

    <b-modal centered ref="updateMatchModal" title="Match" @ok="updateSchedule">
      <b-input-group size="sm" prepend="Sport" class="matchInput">
        <b-form-input :disabled="true" :value="selectedSchedule.title" v-model="selectedSchedule.title"></b-form-input>
      </b-input-group>
      <b-input-group size="sm" prepend="Ligue" class="matchInput">
        <b-form-input :disabled="true" :value="selectedSchedule.raw.league" v-model="selectedSchedule.raw.league"></b-form-input>
      </b-input-group>
      <b-input-group size="sm" prepend="Equipe Receveur" class="matchInput">
        <b-form-input :disabled="true" :value="selectedSchedule.raw.home.name" v-model="selectedSchedule.raw.home.name"></b-form-input>
      </b-input-group>
      <b-input-group size="sm" prepend="Equipe Visiteur" class="matchInput">
        <b-form-input :disabled="true" :value="selectedSchedule.raw.away.name" v-model="selectedSchedule.raw.away.name"></b-form-input>
      </b-input-group>

      <div slot="modal-footer" class="w-100">
         <b-btn class="float-right okButton" @click="updateSchedule">
           OK
         </b-btn>
         <b-btn class="float-right deleteButton" @click="deleteSchedule">
           Effacer
         </b-btn>
         <b-btn class="float-right cancelButton" @click="$refs.updateMatchModal.hide()">
           Annuler
         </b-btn>
       </div>      
    </b-modal>

    <b-modal centered ref="createMatchModal" title="Creation d'un Match">
      <b-form-select v-model="selectedSport" :options="sports" id="sport" class="mb-3 combobox">
        <template slot="first">
          <option :value="null" disabled>Sport</option>
        </template>
      </b-form-select>
      <b-form-select v-model="selectedLeague" :options="leagues" id="ligue" :disabled="selectedSport === null" class="mb-3 combobox">
        <template slot="first">
          <option :value="null" disabled>Ligue</option>
        </template>
      </b-form-select>
      <b-form-select v-model="selectedHomeTeam" :options="teams" id="equipeReceveur" :disabled="selectedLeague === null" class="mb-3 combobox">
        <template slot="first">
          <option :value="null" disabled>Receveur</option>
        </template>
      </b-form-select>      
      <b-form-select v-model="selectedAwayTeam" :options="teams" id="equipeVisiteur" :disabled="selectedLeague === null" class="mb-3 combobox">
        <template slot="first">
          <option :value="null" disabled>Visiteur</option>
        </template>
      </b-form-select>        

      <div slot="modal-footer" class="w-100">
         <b-btn class="float-right okButton" @click="addSchedule">
           OK
         </b-btn>        
         <b-btn class="float-right cancelButton" @click="$refs.createMatchModal.hide()">
           Annuler
         </b-btn>
       </div>
    </b-modal>
  </div>
</template>

<script>
import { VueTuicalendar } from "@lkmadushan/vue-tuicalendar";
import "tui-calendar/dist/tui-calendar.min.css";
import BModal from "bootstrap-vue/es/components/modal/modal";
import InputGroup from "bootstrap-vue/es/components/input-group/input-group";
import axios from "axios";

import FilterFields from "@/components/FilterFields";

export default {
  name: "Schedule",

  components: {
    VueTuicalendar,
    BModal,
    InputGroup,
    FilterFields
  },

  props: {
    months: {
      required: false,
      default: function() {
        return [
          "Janvier",
          "Fevrier",
          "Mars",
          "Avril",
          "Mai",
          "Juin",
          "Juillet",
          "Aout",
          "Septembre",
          "Octobre",
          "Novembre",
          "Decembre"
        ];
      }
    },
    isReadOnly: true
  },

  data() {
    return {
      selectedSport: null,
      selectedField: null,
      selectedLeague: null,
      selectedHomeTeam: null,
      selectedAwayTeam: null,
      sports: [],
      leagues: [],
      teams: [],

      weekLabel: "",
      currentDate: new Date(),
      sundayDate: null,
      startWeekEpoch: 0,
      stopWeekEpoch: 0,

      textColor: "#ffffff",
      backgroundColor: "#00a759",
      dragBackgroundColor: "#016735",

      selectedSchedule: {
        raw: {
          home: {
            name: "",
            id: 0
          },
          away: {
            name: "",
            id: 0
          },
          league: "",
          idMatch: 0,
          startEpoch: 0,
          stopEpoch: 0,
          arbitre: ""
        }
      },
      schedules: [],

      options: {
        calendarId: "1",
        defaultView: "week",
        taskView: false,
        useCreationPopup: false,
        useDetailPopup: false,
        scheduleView: ["time"],
        week: {
          daynames: [
            "Dimanche",
            "Lundi",
            "Mardi",
            "Mercredi",
            "Jeudi",
            "Vendredi",
            "Samedi"
          ],
          startDayOfWeek: 0,
          narrowWeekend: false,
          hourStart: 15,
          hourStop: 24
        },
        theme: {
          "week.timegridOneHour.height": "90px",
          "week.timegridHalfHour.height": "45px"
        },
        template: {
          time: function(schedule) {
            return `${
              schedule.title
            }<br><span style="font-size:12px;font-weight:1;">Ligue: ${
              schedule.raw.league
            }<br>equipes: ${schedule.raw.home.name} vs ${
              schedule.raw.away.name
            }</span>`;
          }
        }
      }
    };
  },

  created: function() {
    this.changeWeekLabel();
    this.getSportsValues(function(error) {
      if (error) {
        return error;
      }
    });
  },

  mounted: function() {
    let that = this;
    // defined callback when a schedule is update.
    this.$refs.calendar.registerEvent("beforeUpdateSchedule", function(event) {
      event.schedule.start = event.start;
      event.schedule.end = event.end;
      let index = that.schedules.findIndex(
        schedule => schedule.id === event.schedule.id
      );
      event.schedule.raw.startEpoch = Math.floor(event.start.getTime() / 1000);
      event.schedule.raw.stopEpoch = Math.floor(event.end.getTime() / 1000);

      that.schedules[index] = event.schedule;

      let options = {
        idMatch: that.schedules[index].raw.idMatch,
        dateDebut: that.schedules[index].raw.startEpoch,
        dateFin: that.schedules[index].raw.stopEpoch
      };
      axios
        .put("/bs/api/matchs/updateMatch", options)
        .then(response => {
          if (response && response.data) {
            that.$refs.calendar.fireMethod(
              "updateSchedule",
              event.schedule.id,
              "1",
              event.schedule
            );
          } else {
            throw new Error("Unable to get matchs");
          }
        })
        .catch(error => {
          Promise.reject(error);
        });
    });
    // defined callback when a schedule is create.
    this.$refs.calendar.registerEvent("beforeCreateSchedule", function(event) {
      if (that.$refs.filter && that.$refs.filter.selectedField != null) {
        let lastScheduleId =
          that.schedules.length != []
            ? that.schedules[that.schedules.length - 1].id
            : -1;
        that.selectedSchedule = {
          id: (parseInt(lastScheduleId) + 1).toString(),
          calendarId: "1",
          title: "",
          location: that.$refs.filter.selectedField,
          category: "time",
          dueDateClass: "",
          start: event.start,
          end: event.end,
          color: that.textColor,
          bgColor: that.backgroundColor,
          dragBgColor: that.dragBackgroundColor,
          raw: {
            home: {
              name: "",
              id: 0
            },
            away: {
              name: "",
              id: 0
            },
            league: "",
            startEpoch: Math.floor(event.start.getTime() / 1000),
            stopEpoch: Math.floor(event.end.getTime() / 1000)
          }
        };
        that.$refs.createMatchModal.show();
      }
    });

    this.$refs.calendar.registerEvent("clickSchedule", function(event) {
      that.selectedSchedule = event.schedule;
      that.$refs.updateMatchModal.show();
    });
  },

  methods: {
    getSunday: function(d) {
      let currentDate = new Date(d);
      let day = currentDate.getDay();
      let diff = currentDate.getDate() - day;
      let sundayDate = new Date(currentDate.setDate(diff));
      return sundayDate;
    },

    changeWeekLabel: function() {
      let sunday = this.getSunday(this.currentDate);
      this.sundayDate = sunday;
      this.sundayDate.setHours(0, 0, 0);
      this.startWeekEpoch = Math.floor(this.sundayDate.getTime() / 1000);
      let tempDate = new Date(this.sundayDate);
      this.stopWeekEpoch =
        new Date(tempDate.setDate(tempDate.getDate() + 7)).getTime() / 1000;
      this.stopWeekEpoch = Math.floor(this.stopWeekEpoch);

      this.weekLabel = `${sunday.getDate()} ${
        this.months[sunday.getMonth()]
      } ${this.currentDate.getFullYear()}`;
    },

    changeWeek: function(event) {
      let incrementer = event.target.id === "nextWeek" ? 7 : -7;
      this.currentDate.setDate(this.currentDate.getDate() + incrementer);
      this.changeWeekLabel();

      if (incrementer > 0) {
        this.$refs.calendar.fireMethod("next");
      } else {
        this.$refs.calendar.fireMethod("prev");
      }
      if (this.selectedField != null) {
        this.getSchedules(function() {});
      }
    },

    updateSchedule: function() {
      let index = this.schedules.findIndex(
        schedule => schedule.id === this.selectedSchedule.id
      );
      this.schedules[index] = this.selectedSchedule;
      this.$refs.updateMatchModal.hide();
      this.$refs.calendar.fireMethod(
        "updateSchedule",
        this.selectedSchedule.id,
        "1",
        this.selectedSchedule
      );
    },

    addSchedule: function() {
      let options = {
        arbitre: "test1234",
        dateDebut: this.selectedSchedule.raw.startEpoch,
        dateFin: this.selectedSchedule.raw.stopEpoch,
        nomLigue: this.selectedLeague,
        sport: this.selectedSport,
        terrain: this.selectedField,
        idEquipeAway: this.selectedAwayTeam,
        idEquipeHome: this.selectedHomeTeam
      };
      let sportIndex = this.sports.findIndex(
        sport => sport.value === this.selectedSport
      );
      let homeIndex = this.teams.findIndex(
        team => team.value === this.selectedHomeTeam
      );
      let awayIndex = this.teams.findIndex(
        team => team.value === this.selectedAwayTeam
      );

      this.selectedSchedule.title = this.sports[sportIndex].text;
      this.selectedSchedule.raw.league = this.selectedLeague;
      this.selectedSchedule.raw.home = {
        name: this.teams[homeIndex].text
      };
      this.selectedSchedule.raw.away = {
        name: this.teams[awayIndex].text
      };
      let that = this;
      axios
        .post("/bs/api/matchs/createMatch", options)
        .then(response => {
          if (response) {
            that.$refs.createMatchModal.hide();
            that.schedules.push(that.selectedSchedule);
            that.$refs.calendar.fireMethod(
              "updateSchedule",
              that.selectedSchedule.id,
              "1",
              that.selectedSchedule
            );
          } else {
            throw new Error("Unable to create matchs");
          }
        })
        .catch(error => {
          Promise.reject(error);
        });
    },

    deleteSchedule: function() {
      let scheduleIndex = this.schedules.findIndex(
        schedule => schedule.id === this.selectedSchedule.id
      );
      if (scheduleIndex != -1) {
        this.schedules.splice(scheduleIndex, 1);
        this.$refs.calendar.fireMethod(
          "deleteSchedule",
          this.selectedSchedule.id,
          this.selectedSchedule.calendarId
        );
      }

      let options = {
        params: {
          idMatch: this.selectedSchedule.raw.idMatch
        }
      };
      axios
        .delete("/bs/api/matchs/deleteMatch", options)
        .then(response => {
          if (response) {
            this.$refs.updateMatchModal.hide();
          } else {
            throw new Error("Unable to get matchs");
          }
        })
        .catch(error => {
          Promise.reject(error);
        });
    },

    getSchedules: function(callback) {
      let options = {
        params: {
          terrain: this.$refs.filter.selectedField,
          startDate: this.startWeekEpoch,
          endDate: this.stopWeekEpoch
        }
      };

      axios
        .get("/bs/api/matchs/getMatchsByTerrain", options)
        .then(response => {
          let error;
          if (response && response.data) {
            let teams = response.data;
            let that = this;
            teams.forEach(function(team) {
              let nomEquipe =
                team.nomEquipe.charAt(0).toUpperCase() +
                team.nomEquipe.substr(1).toLowerCase();

              if (
                that.schedules.findIndex(
                  schedule => schedule.raw.idMatch === team.idMatch
                ) === -1
              ) {
                let lastScheduleId =
                  that.schedules.length != []
                    ? that.schedules[that.schedules.length - 1].id
                    : -1;

                let startDate = new Date();
                startDate.setTime(team.dateDebut);
                let stopDate = new Date();
                stopDate.setTime(team.dateFin);

                let newSchedule = {
                  id: (parseInt(lastScheduleId) + 1).toString(),
                  calendarId: "1",
                  title: team.sport.replace(/_+/g, " ").toLowerCase(),
                  location: that.$refs.filter.selectedField,
                  category: "time",
                  dueDateClass: "",
                  start: startDate,
                  end: stopDate,
                  color: that.textColor,
                  bgColor: that.backgroundColor,
                  dragBgColor: that.dragBackgroundColor,
                  raw: {
                    home: {
                      name: team.cote === "HOME" ? nomEquipe : "",
                      id: team.idEquipe
                    },
                    away: {
                      name: team.cote === "AWAY" ? nomEquipe : "",
                      id: team.idEquipe
                    },
                    league: team.nomLigue,
                    idMatch: team.idMatch,
                    startEpoch: team.dateDebut,
                    stopEpoch: team.dateFin,
                    arbitre: team.arbitre
                  }
                };

                that.schedules.push(newSchedule);
              } else {
                let scheduleIndex = that.schedules.findIndex(
                  schedule => schedule.raw.idMatch === team.idMatch
                );
                if (team.cote === "HOME") {
                  that.schedules[scheduleIndex].raw.home = {
                    name: nomEquipe,
                    id: team.idEquipe
                  };
                } else {
                  that.schedules[scheduleIndex].raw.away = {
                    name: nomEquipe,
                    id: team.idEquipe
                  };
                }
              }
            });
          } else {
            throw new Error("Unable to get matchs");
          }

          callback(error);
        })
        .catch(error => {
          callback(error);
          Promise.reject(error);
        });
    },

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

    getTeams: function() {
      let options = {
        params: {
          sport: this.selectedSport,
          nomLigue: this.selectedLeague,
          statutApprobation: "APPROUVE"
        }
      };

      axios
        .get("/bs/api/equipes/getEquipeApprobationView", options)
        .then(response => {
          if (response && response.data) {
            this.updateTeamsValues(response.data);
          }
        })
        .catch(error => {
          Promise.reject(error);
        });
    },

    updateSportsValues: function(sportsValues) {
      let that = this;
      this.sports = [];
      sportsValues.forEach(function(sportValue) {
        let sportText = sportValue.replace(/_+/g, " ").toLowerCase();
        sportText = sportText[0].toUpperCase() + sportText.slice(1);
        that.sports.push({ value: sportValue, text: sportText });
      });
    },

    updateLeaguesValues: function(leaguesValues) {
      let that = this;
      this.leagues = [];
      leaguesValues.forEach(function(leagueValue) {
        let leagueText = leagueValue.replace(/_+/g, " ");
        leagueText = leagueText[0].toUpperCase() + leagueText.slice(1);
        that.leagues.push({ value: leagueValue, text: leagueText });
      });
    },

    updateTeamsValues: function(players) {
      let that = this;
      this.teams = [];
      players.forEach(function(player) {
        if (
          that.teams.findIndex(team => team.value === player.idEquipe) === -1
        ) {
          that.teams.push({
            value: player.idEquipe,
            text: player.nomEquipe.toLowerCase()
          });
        }
      });
    }
  },

  watch: {
    selectedField: function() {
      if (this.selectedField != null) {
        this.schedules = [];
        this.getSchedules(function() {});
      }
    },

    selectedSport: function() {
      this.selectedLeague = null;
      this.getLeaguesValues(function(error) {
        if (error) {
          return error;
        }
      });
    },

    selectedLeague: function() {
      this.selectedHomeTeam = null;
      this.selectedAwayTeam = null;
      this.getTeams(function(error) {
        if (error) {
          return error;
        }
      });
    }
  }
};
</script>

<style lang="less">
@import (reference) "../GlobalStyles.less";

#appSchedule {
  margin-top: 35px;
  height: 45px;
  color: @secondary;
  @buttonswidth: 25px;

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

  .filter {
    margin-top: -7px;
    padding-right: 20px;
  }

  .cancelButton {
    margin-right: 10px;
  }

  .deleteButton {
    margin-right: 10px;
    background-color: red;
    border-color: red;
  }

  .okButton {
    background-color: @theme;
    border-color: @theme;
  }

  .matchInput {
    width: 300px;
    margin-bottom: 10px;
  }

  #calendarHeader {
    display: inline-flex;
    margin: 0 auto;
    margin-bottom: 10px;

    #weekLabelContainer {
      vertical-align: middle;
      text-align: center;
      padding-right: 25px;
      padding-left: 25px;
    }

    .nextWeekContainer,
    .lastWeekContainer {
      width: @buttonswidth;
      vertical-align: middle;
      #nextWeek,
      #lastWeek {
        vertical-align: middle;
        width: @buttonswidth;
        height: @buttonswidth;
        cursor: pointer;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      #nextWeek {
        transform: rotate(-90deg);
      }

      #lastWeek {
        transform: rotate(90deg);
      }
    }
  }
}
</style>
