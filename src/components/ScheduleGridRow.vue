<template>
  <tbody class="container">
    <tr>
      <td id="hour" rowspan="2"><span>{{hour}}</span></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr> 
  </tbody>
</template>

<style scoped lang="less">
@import (reference) "../GlobalStyles.less";

.container {
  padding: 10px;
}

#hour {
  height: 50px;
}

td {
  border: 2px solid @secondaryLight;
}
</style>



<script>
export default {
  name: "schedulegridrow",

  props: {
    hour: {
      type: String,
      required: true,
      default: ""
    }
  }
};
</script>
