const fs = require('fs');

const input = fs.readFileSync('input', 'utf8');
const numberArray = input.split('\n').map(Number)
const result = numberArray.reduce((frequency, n) => frequency + n, 0);
console.log(result);
