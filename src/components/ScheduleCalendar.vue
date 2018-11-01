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
    <div id="grid">
      <table>
        <thead>
          <schedulegridheader></schedulegridheader>
          <schedulegridheader :day="sunday" long="Dimanche" short="Dim"></schedulegridheader>
          <schedulegridheader :day="monday" long="Lundi" short="Lun"></schedulegridheader>
          <schedulegridheader :day="tuesday" long="Mardi" short="Mar"></schedulegridheader>
          <schedulegridheader :day="wednesday" long="Mercredi" short="Mer"></schedulegridheader>
          <schedulegridheader :day="thursday " long="Jeudi" short="Jeu"></schedulegridheader>
          <schedulegridheader :day="friday" long="Vendredi" short="Ven"></schedulegridheader>
          <schedulegridheader :day="saturday" long="Samedi" short="Sam"></schedulegridheader>
        </thead>
        <schedulegridrow hour="8:00"></schedulegridrow>
        <schedulegridrow hour="9:00"></schedulegridrow>
        <schedulegridrow hour="10:00"></schedulegridrow>
        <schedulegridrow hour="11:00"></schedulegridrow>
        <schedulegridrow hour="12:00"></schedulegridrow>
        <schedulegridrow hour="13:00"></schedulegridrow>
        <schedulegridrow hour="14:00"></schedulegridrow>
        <schedulegridrow hour="15:00"></schedulegridrow>
        <schedulegridrow hour="16:00"></schedulegridrow>
        <schedulegridrow hour="17:00"></schedulegridrow>
        <schedulegridrow hour="18:00"></schedulegridrow>
        <schedulegridrow hour="19:00"></schedulegridrow>
        <schedulegridrow hour="20:00"></schedulegridrow>
        <schedulegridrow hour="21:00"></schedulegridrow>
        <schedulegridrow hour="22:00"></schedulegridrow>
        <schedulegridrow hour="23:00"></schedulegridrow>
      </table>
    </div>
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
    display: flex;
    margin: 0 auto;
    * {
      margin: 0 auto;
    }

    #weekLabelContainer {
      vertical-align: middle;
      text-align: center;
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

  #grid {
    margin-top: 20px;
  }
}
</style>

<script>
import schedulegridheader from "@/components/ScheduleGridHeader.vue";
import schedulegridrow from "@/components/ScheduleGridRow.vue";

export default {
  name: "ScheduleCalendar",

  components: {
    schedulegridheader,
    schedulegridrow
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

  data: function() {
    return {
      weekLabel: "",
      currentDate: new Date(),
      sunday: "",
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: ""
    };
  },

  created: function() {
    this.changeWeekLabel();
    this.changeWeekDays();
  },

  methods: {
    getSunday: function(d) {
      let currentDate = new Date(d);
      let day = currentDate.getDay();
      let diff = currentDate.getDate() - day;
      let sundayDate = new Date(currentDate.setDate(diff));
      return sundayDate;
    },

    changeWeekDays: function() {
      let tempDate = this.getSunday(this.currentDate);
      this.sunday = tempDate.getDate();

      tempDate.setDate(tempDate.getDate() + 1);
      this.monday = tempDate.getDate();

      tempDate.setDate(tempDate.getDate() + 1);
      this.tuesday = tempDate.getDate();

      tempDate.setDate(tempDate.getDate() + 1);
      this.wednesday = tempDate.getDate();

      tempDate.setDate(tempDate.getDate() + 1);
      this.thursday = tempDate.getDate();

      tempDate.setDate(tempDate.getDate() + 1);
      this.friday = tempDate.getDate();

      tempDate.setDate(tempDate.getDate() + 1);
      this.saturday = tempDate.getDate();
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
      this.changeWeekDays();
    }
  }
};
</script>
