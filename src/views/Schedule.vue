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
  </div>
</template>

<script>
import { VueTuicalendar } from "@lkmadushan/vue-tuicalendar";
import "tui-calendar/dist/tui-calendar.min.css";
import BPopover from "bootstrap-vue/es/components/popover/popover";

export default {
  name: "Schedule",

  components: {
    VueTuicalendar,
    BPopover
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
    hours: {
      required: false,
      default: function() {
        return [
          { value: 0, text: "8:00" },
          { value: 1, text: "9:00" },
          { value: 2, text: "10:00" },
          { value: 3, text: "11:00" },
          { value: 4, text: "12:00" },
          { value: 5, text: "13:00" },
          { value: 6, text: "14:00" },
          { value: 7, text: "15:00" },
          { value: 8, text: "16:00" },
          { value: 9, text: "17:00" },
          { value: 10, text: "18:00" },
          { value: 11, text: "19:00" },
          { value: 12, text: "20:00" },
          { value: 13, text: "21:00" },
          { value: 14, text: "22:00" },
          { value: 15, text: "23:00" },
          { value: 16, text: "00:00" }
        ];
      }
    }
  },

  data() {
    return {
      weekLabel: "",
      currentDate: new Date(),

      schedules: [
        {
          id: "1",
          calendarId: "1",
          title: "VolleyBall",
          location: "Centre sportif",
          attendees: ["Bleu", "Rouge"],
          category: "time",
          dueDateClass: "",
          start: "2018-11-19T17:30:00",
          end: "2018-11-19T19:30:00"
        }
      ],

      options: {
        calendarId: "1",
        defaultView: "week",
        taskView: false,
        useCreationPopup: true,
        useDetailPopup: true,
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
        }
      }
    };
  },

  created: function() {
    this.changeWeekLabel();
  },

  mounted: function() {
    let that = this;
    // defined callback when a schedule is delete.
    this.$refs.calendar.registerEvent("beforeDeleteSchedule", function(event) {
      that.$refs.calendar.fireMethod(
        "deleteSchedule",
        event.schedule.id,
        event.schedule.calendarId
      );
    });
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
      that.schedules.push({
        id: lastScheduleId + 1,
        calendarId: "1",
        title: event.title,
        location: event.raw.location,
        category: "time",
        dueDateClass: "",
        start: event.start,
        end: event.end
      });
      1;
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
