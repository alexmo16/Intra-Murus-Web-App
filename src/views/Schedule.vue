<template>
  <div id="appSchedule">
    <div id="calendarHeader">
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
      <span>Êtes-vous sûr de vouloir approuver cette équipe?</span>
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
      <span>Êtes-vous sûr de vouloir approuver cette équipe?</span>
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

export default {
  name: "Schedule",

  components: {
    VueTuicalendar,
    BModal
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
    }
  },

  data() {
    return {
      weekLabel: "",
      currentDate: new Date(),
      textColor: "#ffffff",
      backgroundColor: "#00a759",
      dragBackgroundColor: "#016735",

      selectedSchedule: {},

      schedules: [
        {
          id: "1",
          calendarId: "1",
          title: "VolleyBall",
          location: "Centre sportif gym A1",
          attendees: ["Bleu", "Rouge"],
          category: "time",
          dueDateClass: "",
          start: "2018-11-19T17:30:00",
          end: "2018-11-19T18:30:00",
          color: "#ffffff",
          bgColor: "#00a759",
          dragBgColor: "#016735"
        }
      ],

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
            }<br><span style="font-size:12px;font-weight:1;">equipes: ${
              schedule.attendees[0]
            } vs ${schedule.attendees[1]}</span>`;
          }
        }
      }
    };
  },

  created: function() {
    this.changeWeekLabel();
  },

  mounted: function() {
    let that = this;
    // defined callback when a schedule is update.
    this.$refs.calendar.registerEvent("beforeUpdateSchedule", function(event) {
      event.schedule.start = event.start;
      event.schedule.end = event.end;
      that.$refs.calendar.fireMethod(
        "updateSchedule",
        event.schedule.id,
        "1",
        event.schedule
      );
    });
    // defined callback when a schedule is create.
    this.$refs.calendar.registerEvent("beforeCreateSchedule", function(event) {
      let lastScheduleId =
        that.schedules.length != []
          ? that.schedules[that.schedules.length - 1].id
          : -1;
      that.selectedSchedule = {
        id: (parseInt(lastScheduleId) + 1).toString(),
        calendarId: "1",
        title: "",
        location: "",
        attendees: ["", ""],
        category: "time",
        dueDateClass: "",
        start: event.start,
        end: event.end,
        color: that.textColor,
        bgColor: that.backgroundColor,
        dragBgColor: that.dragBackgroundColor
      };
      that.$refs.createMatchModal.show();
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
    },

    updateSchedule: function() {
      this.$refs.updateMatchModal.hide();
    },

    addSchedule: function() {
      this.schedules.push(this.selectedSchedule);
      this.$refs.createMatchModal.hide();
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
      this.$refs.updateMatchModal.hide();
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
