<template>
  <div id="appSchedule">
    <schedule-calendar></schedule-calendar>
  </div>
</template>

<script>
// @ is an alias to /src
import ScheduleCalendar from "@/components/ScheduleCalendar.vue";

export default {
  name: "Schedule",
  data: function() {
    return {};
  },
  components: {
    ScheduleCalendar
  }
};
</script>

<style lang="less">
#appSchedule {
  margin-top: 35px;
}
</style>
