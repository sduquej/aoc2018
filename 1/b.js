const fs = require('fs');

const input = fs.readFileSync('input', 'utf8');
const numberArray = input.split('\n').map(Number);
let repeatedFrequency;
let currentFrequency = 0;
const frequencies = {
  currentFrequency: 1,
};

while (repeatedFrequency === undefined) {
  for (n of numberArray) {
    currentFrequency += n;
    if (frequencies[currentFrequency]) {
      repeatedFrequency = currentFrequency;
      break;
    }
    frequencies[currentFrequency] = 1;
  }
}
console.log(repeatedFrequency);
