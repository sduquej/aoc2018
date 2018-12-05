const fs = require("fs");

let polymer = fs.readFileSync("input", "utf8").split("");
console.log(reactPolymer(polymer).length);

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
