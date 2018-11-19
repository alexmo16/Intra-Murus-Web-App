<template>
  <div id="appSchedule">
    <vue-tuicalendar
    ref="calendar"
    :options="options"
    :schedules="schedules"
    @after-render-schedule="handler"
    @before-render-schedule="handler"
    @click-schedule="handler">
  </vue-tuicalendar>
  </div>
</template>

<script>
// @ is an alias to /src\
import { VueTuicalendar } from "@lkmadushan/vue-tuicalendar";
import "tui-calendar/dist/tui-calendar.min.css";

export default {
  name: "Schedule",

  components: {
    VueTuicalendar
  },

  data() {
    return {
      schedules: [
        {
          id: "1",
          calendarId: "1",
          title: "Bleu vs Rouge",
          location: "Centre sportif",
          attendees: ["roy", "favreau"],
          category: "time",
          dueDateClass: "",
          start: "2018-11-19T17:30:00",
          end: "2018-11-19T19:30:00",
          isReadOnly: true
        }
      ],

      options: {
        defaultView: "week",
        taskView: false,
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

  created: function() {},

  mounted: function() {
    this.$refs.calendar.registerEvent("beforeDeleteSchedule", function(event) {
      // do stuff here
      console.log(event);
    });
  },

  methods: {}
};
</script>

<style lang="less">
#appSchedule {
  margin-top: 35px;
}
</style>
