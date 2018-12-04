const fs = require("fs");

const input = fs.readFileSync("input", "utf8");
const claimArray = input.split("\n").map(claim => {
  let matches = claim.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/).map(Number);
  return {
    id: matches[1],
    x: matches[2],
    y: matches[3],
    w: matches[4],
    h: matches[5]
  };
});

let grid = [];
for (let claim of claimArray) {
  let { id, x, y, w, h } = claim;
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      if (!grid[x + i]) {
        grid[x + i] = [];
      }
      grid[x + i][y + j] = grid[x + i][y + j] ? "X" : id;
    }
  }
}
for (let claim of claimArray) {
  let { id, x, y, w, h } = claim;
  let gridHasSameId = true;
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      if (grid[x + i][y + j] !== id) {
        gridHasSameId = false;
        break;
      }
    }
    if (!gridHasSameId) {
      break;
    }
  }
  if (gridHasSameId) {
    console.log(id);
  }
}
