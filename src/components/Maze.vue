<script setup lang="ts">
import { maze, text, generate } from "../composables/maze";
generate(0, 0);
</script>

<template>
  <!-- logo -->
  <div class="maze">
    <table>
      <tr v-for="(row, i) in text" :key="i">
        <td
          v-for="(col, j) in row"
          :key="`${i}${j}`"
          :class="[col === 0 ? 'passage' : 'wall']"
        ></td>
      </tr>
    </table>
  </div>
  <!-- maze -->
  <div class="maze">
    <div>
      <table>
        <tr v-for="(row, i) in maze" :key="i">
          <td
            v-for="(col, j) in row"
            :key="`${i}${j}`"
            :class="col"
            @click="generate(i, j)"
          ></td>
        </tr>
      </table>
    </div>
  </div>
  <small>CLICK TO GENERATE</small>
</template>

<style>
.maze {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}
table {
  border-collapse: collapse;
}
td {
  width: 5px;
  height: 5px;
}
td:hover {
  background-color: #da216e;
}
.visited {
  background-color: #633974;
}
.wall {
  background-color: #282c34;
}
.passage {
  background-color: #7bd18e;
}
</style>
