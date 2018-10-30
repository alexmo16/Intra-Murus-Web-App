<template>
  <div class="ScheduleCalendar">
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
    <div id="grid"></div>
  </div>
</template>

<style scoped lang="less">
@import (reference) "../GlobalStyles.less";

.ScheduleCalendar {
  width: 75%;
  height: 45px;
  margin: 0 auto;
  color: @secondary;
  @buttonswidth: 25px;

  #calendarHeader {
    width: 100%;
    display: flex;

    * {
      margin: 0 auto;
    }

    #weekLabelContainer {
      vertical-align: middle;
      text-align: center;
    }

    .nextWeekContainer {
      margin-left: -@buttonswidth - 15px;
    }
    .lastWeekContainer {
      margin-right: -@buttonswidth - 15px;
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
      }
      #nextWeek {
        transform: rotate(-90deg);
      }

      #lastWeek {
        transform: rotate(90deg);
      }
    }
  }

  #grid {
    width: 100%;
  }
}
</style>

<script>
export default {
  name: "ScheduleCalendar",

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

  data: function() {
    return {
      weekLabel: "",
      currentDate: new Date()
    };
  },

  created: function() {
    this.changeWeekLabel();
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
    }
  }
};
</script>
