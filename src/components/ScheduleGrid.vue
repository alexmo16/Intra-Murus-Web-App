<template>
<table>
  <span class="day">{{sunday}}</span>
  <thead>
    <tr>
      <th></th>
      <th>
        <span class="day">{{sunday}}</span>
        <span class="long">Dimanche</span>
        <span class="short">Dim</span>
      </th>
      <th>
        <span class="day">{{}</span>
        <span class="long">Lundi</span>
        <span class="short">Lun</span>
      </th>
      <th>
        <span class="day">{{startOfWeekDayNumber + 2}}</span>
        <span class="long">Mardi</span>
        <span class="short">Mar</span>
      </th>
      <th>
        <span class="day">{{startOfWeekDayNumber + 3}}</span>
        <span class="long">Mercredi</span>
        <span class="short">Mer</span>
      </th>
      <th>
        <span class="day active">{{startOfWeekDayNumber + 4}}</span>
        <span class="long">Jeudi</span>
        <span class="short">Jeu</span>
      </th>
      <th>
        <span class="day">{{startOfWeekDayNumber + 5}}</span>
        <span class="long">Vendredi</span>
        <span class="short">Ven</span>
      </th>
      <th>
        <span class="day">{{startOfWeekDayNumber % 31}}</span>
        <span class="long">Samedi</span>
        <span class="short">Sam</span>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="hour" rowspan="4"><span>1:00</span></td>
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
    <tr>
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
    <tr>
      <td class="hour" rowspan="4"><span>2:00</span></td>
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
    <tr>
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
    
    <tr>
      <td class="hour" rowspan="4"><span>3:00</span></td>
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
    <tr>
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
    <tr>
      <td class="hour" rowspan="4"><span>4:00</span></td>
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
    <tr>
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
    <tr>
      <td class="hour" rowspan="4"><span>5:00</span></td>
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
    <tr>
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
    <tr>
      <td class="hour" rowspan="4"><span>6:00</span></td>
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
    <tr>
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
    <tr>
      <td class="hour" rowspan="4"><span>7:00</span></td>
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
    <tr>
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
    <tr>
      <td class="hour" rowspan="4"><span>8:00</span></td>
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
    <tr>
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
</table>
</template>

<style lang="less">
@import (reference) "../GlobalStyles.less";

.timeline {
  border: 2px solid @secondaryLight;
}
@blue: #626e7e;
@light: lighten(@blue, 40%);
@light2: darken(@light, 3%);

table {
  font-family: sans-serif;
  width: 100%;
  border-spacing: 0;
  border-collapse: separate;
  table-layout: fixed;
  margin-bottom: 50px;

  thead {
    tr {
      th {
        background: @blue;
        color: @light;
        padding: 0.5em;
        overflow: hidden;

        &:first-child {
          border-radius: 3px 0 0 0;
        }
        &:last-child {
          border-radius: 0 3px 0 0;
        }

        .day {
          display: block;
          font-size: 1.2em;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          margin: 0 auto 5px;
          padding: 5px;
          line-height: 1.8;

          &.active {
            background: @light;
            color: @blue;
          }
        }

        .short {
          display: none;
        }

        i {
          vertical-align: middle;
          font-size: 2em;
        }
      }
    }
  }
  tbody {
    tr {
      background: @light;

      &:nth-child(odd) {
        background: @light2;
      }
      &:nth-child(4n + 0) {
        td {
          border-bottom: 1px solid @blue;
        }
      }
      td {
        text-align: center;
        vertical-align: middle;
        border-left: 1px solid @blue;
        position: relative;
        height: 32px;
        cursor: pointer;

        &:last-child {
          border-right: 1px solid @blue;
        }
        &.hour {
          font-size: 2em;
          padding: 0;
          color: @blue;
          background: #fff;
          border-bottom: 1px solid @blue;
          border-collapse: separate;
          min-width: 100px;
          cursor: default;

          span {
            display: block;
          }
        }
      }
    }
  }

  @media (max-width: 60em) {
    thead {
      tr {
        th {
          .long {
            display: none;
          }

          .short {
            display: block;
          }
        }
      }
    }

    tbody {
      tr {
        td {
          &.hour {
            span {
              transform: rotate(270deg);
              -webkit-transform: rotate(270deg);
              -moz-transform: rotate(270deg);
            }
          }
        }
      }
    }
  }

  @media (max-width: 27em) {
    thead {
      tr {
        th {
          font-size: 65%;
          .day {
            display: block;
            font-size: 1.2em;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            margin: 0 auto 5px;
            padding: 5px;

            &.active {
              background: @light;
              color: @blue;
            }
          }
        }
      }
    }
    tbody {
      tr {
        td {
          &.hour {
            font-size: 1.7em;
            span {
              transform: translateY(16px) rotate(270deg);
              -webkit-transform: translateY(16px) rotate(270deg);
              -moz-transform: translateY(16px) rotate(270deg);
            }
          }
        }
      }
    }
  }
}
</style>

<script>
export default {
  name: "schedulegrid",

  props: {
    sunday: new Date()
  },

  components: {},
  methods: {
    getDayNumber: function() {
      return this.sunday.getDay();
    }
  }
};
</script>
