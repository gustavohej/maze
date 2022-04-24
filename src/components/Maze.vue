<script setup lang="ts">
import { h } from "vue";
import { useMazeStore } from "../stores/maze";
import MazeLogo from "./MazeLogo.vue";

const { generate, maze } = useMazeStore();

generate(0, 0);

const render = () => {
  return h(
    "table",
    maze.map((row, i) => {
      return h(
        "tr",
        row.map((col, j) => {
          return h("td", {
            class: col,
            onClick: () => generate(i, j),
          });
        })
      );
    })
  );
};
</script>

<template>
  <div class="box">
    <MazeLogo />
  </div>
  <div class="box">
    <render />
  </div>
  <small>Prim's algorithm</small>
</template>

<style>
.box {
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
  cursor: pointer;
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
