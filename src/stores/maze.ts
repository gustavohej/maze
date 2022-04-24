import { defineStore } from "pinia";

export type Cell = "visited" | "passage" | "wall";

export const useMazeStore = defineStore("maze", {
  state: () => ({
    rows: 69,
    cols: 49,
    maze: [] as Cell[][],
    ms: 5,
    load: false,
  }),
  actions: {
    sleep() {
      return new Promise((r) => setTimeout(r, this.ms));
    },
    isValid(x: number, y: number) {
      return x >= 0 && y >= 0 && x < this.rows && y < this.cols;
    },
    directions(x: number, y: number, jump: 1 | 2 = 1) {
      return [
        [x + jump, y],
        [x - jump, y],
        [x, y + jump],
        [x, y - jump],
      ];
    },
    defaultMaze() {
      for (let i = 0; i < this.rows; i++) {
        this.maze[i] = new Array(this.cols).fill("wall");
      }
    },
    async generate(x: number, y: number) {
      if (this.load) {
        return;
      }

      this.load = true;

      this.defaultMaze();

      const frontier = [];
      frontier.push([x, y]);
      this.maze[x][y] = "passage";

      for (const direction of this.directions(x, y, 2)) {
        const [tx, ty] = direction;
        if (this.isValid(tx, ty)) {
          frontier.push([tx, ty]);
          this.maze[tx][ty] = "visited";
        }
      }

      while (frontier.length) {
        const [x, y] = frontier.splice(
          Math.floor(Math.random() * frontier.length),
          1
        )[0];

        const list = [0, 1, 2, 3].sort(() => 0.5 - Math.random());

        for (const id of list) {
          const [tx, ty] = this.directions(x, y, 2)[id];
          if (this.isValid(tx, ty) && this.maze[tx][ty] === "passage") {
            const [vx, vy] = this.directions(x, y)[id];
            this.maze[x][y] = this.maze[vx][vy] = "passage";
            break;
          }
        }

        const aux = this.directions(x, y, 2);
        for (const direction of aux) {
          const [tx, ty] = direction;
          if (this.isValid(tx, ty) && this.maze[tx][ty] === "wall") {
            frontier.push([tx, ty]);
            this.maze[tx][ty] = "visited";
          }
        }

        await this.sleep();
      }

      this.load = false;
    },
  },
});
