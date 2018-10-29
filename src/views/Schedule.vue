<template>
  <div id="appSchedule">
    <schedule-calender></schedule-calender>
  </div>
</template>

<script>
// @ is an alias to /src
import ScheduleCalender from "@/components/ScheduleCalender.vue";

export default {
  name: "Schedule",
  data: function() {
    return {};
  },
  components: {
    ScheduleCalender
  }
};
</script>

<style lang="less">
#appSchedule {
  margin-top: 35px;
}
</style>
