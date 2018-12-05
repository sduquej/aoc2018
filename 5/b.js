const fs = require("fs");

let polymer = fs.readFileSync("input", "utf8");
let minPolymerLength = Number.MAX_SAFE_INTEGER;

for (let i = 97; i <= 122; i++) {
  let regexp = new RegExp(String.fromCharCode(i), "gi");
  let newPolymer = polymer.replace(regexp, "").split("");
  let reducedNewPolymerLength = reactPolymer(newPolymer).length;
  if (reducedNewPolymerLength < minPolymerLength) {
    minPolymerLength = reducedNewPolymerLength;
  }
}
console.log(minPolymerLength);

function reactPolymer(polymer) {
  let newPolymer;
  do {
    newPolymer = [];
    for (let i = 0; i < polymer.length; i++) {
      if (
        polymer[i + 1] &&
        polymer[i] !== polymer[i + 1] &&
        polymer[i].toLowerCase() === polymer[i + 1].toLowerCase()
      ) {
        i++;
      } else {
        newPolymer.push(polymer[i]);
      }
    }
    if (polymer.length === newPolymer.length) {
      break;
    }
    polymer = newPolymer;
  } while (true);
  return newPolymer;
}
