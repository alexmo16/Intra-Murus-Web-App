<template>
  <div class="container">
    <div class="item1">16</div>
    <div class="item2">17</div>
    <div class="item3">18</div>  
    <div class="item4">19</div>
    <div class="item5">20</div>
    <div class="item6">21</div>
    <div class="item7">22</div>
    <div class="item8">23</div>
  </div>
</template>

<style scoped lang="less">
@import (reference) "../GlobalStyles.less";

.container {
  display: grid;
  grid-template-columns: auto;

  div {
    border: 2px solid @secondaryLight;
    text-align: center;
    font-size: 30px;
  }
}
</style>



<script>
export default {
  name: "schedulegridtimeblock",

  props: {
    hour: {
      type: String,
      required: true,
      default: ""
    }
  }
};
</script>
