const fs = require("fs");

const input = fs.readFileSync("input", "utf8");
let id = 0;
let periphery = {
  minX: Number.MAX_SAFE_INTEGER,
  minY: Number.MAX_SAFE_INTEGER,
  maxX: 0,
  maxY: 0
};

const coordinateArray = input.split("\n").map(c => {
  let matches = c.split(", ");
  let coord = {
    id,
    x: Number(matches[0]),
    y: Number(matches[1]),
    area: 0
  };
  id++;
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

for (let i = periphery.minX; i < periphery.maxX; i++) {
  for (let j = periphery.minY; j < periphery.maxY; j++) {
    let point = {
      x: i,
      y: j,
      minD: Number.MAX_SAFE_INTEGER
    };
    for (let coord of coordinateArray) {
      let d = calculateDistance(point, coord);
      if (d < point.minD) {
        point.minD = d;
        point.minCoordId = coord.id;
      }
    }
    coordinateArray[point.minCoordId].area++;
  }
}

let maxCoord;
let maxArea = 0;
for (let coord of coordinateArray) {
  if (coordHasFiniteArea(coord, periphery) && coord.area > maxArea) {
    maxCoord = coord;
    maxArea = coord.area;
  }
}
console.log(maxCoord.area);

function coordHasFiniteArea(coord, periphery) {
  return (
    coord.x > periphery.minX &&
    coord.x < periphery.maxX &&
    coord.y > periphery.minY &&
    coord.y < periphery.maxY
  );
}

function calculateDistance(p1, p2) {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}
