<template>
  <th class="container">
    <span class="day">{{day}}</span>
    <span class="long">{{long}}</span>
    <span class="short">{{short}}</span>
  </th>
</template>

<style scoped lang="less">
@import (reference) "../GlobalStyles.less";

.container {
  padding: 10px;
  border: 2px solid @secondaryLight;
  min-height: 50px;
  min-width: 100px;
}

.day {
  display: block;
}

.short {
  display: none;
}

@media (max-width: 27em) {
  .day {
    display: block;
    padding: 5px;
  }
}

@media (max-width: 60em) {
  .long {
    display: none;
  }

  .short {
    display: block;
  }
}
</style>



<script>
export default {
  name: "schedulegridheader",

  props: {
    day: {
      type: Number,
      required: true,
      default: null
    },

    long: {
      type: String,
      required: true,
      default: ""
    },

    short: {
      type: String,
      required: true,
      default: ""
    }
  }
};
</script>
