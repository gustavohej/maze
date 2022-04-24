<script setup lang="ts">
import { h } from "vue";

const text = [
  [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
];

const render = () => {
  return h(
    "table",
    text.map((row) => {
      return h(
        "tr",
        row.map((col) => {
          return h("td", {
            class: col === 0 ? "passage" : "wall",
          });
        })
      );
    })
  );
};
</script>

<template>
  <render />
</template>
