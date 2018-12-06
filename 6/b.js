const fs = require("fs");
const easyInput = false;
const inputFile = easyInput ? "easy_input" : "input";
const input = fs.readFileSync(inputFile, "utf8");
let periphery = {
  minX: Number.MAX_SAFE_INTEGER,
  minY: Number.MAX_SAFE_INTEGER,
  maxX: 0,
  maxY: 0
};

const coordinateArray = input.split("\n").map(c => {
  let matches = c.split(", ");
  let coord = {
    x: Number(matches[0]),
    y: Number(matches[1])
  };
  if (coord.x > periphery.maxX) {
    periphery.maxX = coord.x;
  }
  if (coord.x < periphery.minX) {
    periphery.minX = coord.x;
  }
  if (coord.y > periphery.maxY) {
    periphery.maxY = coord.y;
  }
  if (coord.y < periphery.minY) {
    periphery.minY = coord.y;
  }
  return coord;
});

const SAFE_DISTANCE = easyInput ? 32 : 10000;
let safePoints = 0;
for (let i = periphery.minX; i < periphery.maxX; i++) {
  for (let j = periphery.minY; j < periphery.maxY; j++) {
    let point = {
      x: i,
      y: j,
      aggregateDistance: 0
    };
    for (let coord of coordinateArray) {
      let d = calculateDistance(point, coord);
      point.aggregateDistance += d;
    }
    if (point.aggregateDistance < SAFE_DISTANCE) {
      safePoints++;
    }
  }
}

console.log(safePoints);

function calculateDistance(p1, p2) {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}
