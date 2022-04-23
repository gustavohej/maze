import { reactive, ref } from "vue";

const Cell = {
  visited: "visited",
  passage: "passage",
  wall: "wall",
} as const;

type Cell = typeof Cell[keyof typeof Cell];

const rows = 69;
const cols = 49;
const maze = reactive<Cell[][]>([]);
const ms = ref(2);
const load = ref(false);

const sleep = () => new Promise((r) => setTimeout(r, ms.value));

const reset = () => {
  for (let i = 0; i < rows; i++) {
    maze[i] = new Array<Cell>(cols).fill(Cell.wall);
  }
};

const isValid = (x: number, y: number) => {
  return x >= 0 && y >= 0 && x < rows && y < cols;
};

type Direction = [number, number];

const directions = (x: number, y: number, jump = 1): Direction[] => {
  return [
    [x + jump, y],
    [x - jump, y],
    [x, y + jump],
    [x, y - jump],
  ];
};

const generate = async (x: number, y: number) => {
  if (load.value) {
    return;
  }

  load.value = true;

  reset();

  const frontier = [];
  frontier.push([x, y]);
  maze[x][y] = Cell.passage;

  for (const direction of directions(x, y, 2)) {
    const [tx, ty] = direction;
    if (isValid(tx, ty)) {
      frontier.push([tx, ty]);
      maze[tx][ty] = Cell.visited;
    }
  }

  while (frontier.length) {
    const [x, y] = frontier.splice(
      Math.floor(Math.random() * frontier.length),
      1
    )[0];

    const list = [0, 1, 2, 3].sort(() => 0.5 - Math.random());

    for (const id of list) {
      const [tx, ty] = directions(x, y, 2)[id];
      if (isValid(tx, ty) && maze[tx][ty] == Cell.passage) {
        const [vx, vy] = directions(x, y)[id];
        maze[x][y] = maze[vx][vy] = Cell.passage;
        break;
      }
    }

    const aux = directions(x, y, 2);
    for (const direction of aux) {
      const [tx, ty] = direction;
      if (isValid(tx, ty) && maze[tx][ty] === Cell.wall) {
        frontier.push([tx, ty]);
        maze[tx][ty] = Cell.visited;
      }
    }

    await sleep();
  }

  load.value = false;
};

const text = ref([
  [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
]);

export { maze, text, generate };
