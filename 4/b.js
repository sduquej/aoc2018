const fs = require("fs");

const input = fs.readFileSync("input", "utf8");
const records = input.split("\n");

const guardSleepTimes = {};
const recordRegexp = /(\d{2})] ([\w #]+)/;
let currentGuard;
let currentShift;
let lastSlept;
for (let record of records) {
  const matches = record.match(recordRegexp);
  const minute = Number(matches[1]);
  const action = matches[2];

  switch (action) {
    case 'falls asleep':
      lastSlept = minute;
      break;
    case 'wakes up':
      for (let i = lastSlept; i < minute; i++) {
        currentShift[i] = 'z';
        guardSleepTimes[currentGuard].sleepMinutes++;
      }
      break;
    default:
      currentGuard = Number(action.match(/\d+/)[0]);
      currentShift = [];
      lastSlept = undefined;

      if (!guardSleepTimes[currentGuard]) {
        guardSleepTimes[currentGuard] = {
          shifts: [],
          sleepMinutes: 0,
        };
      }
      guardSleepTimes[currentGuard].shifts.push(currentShift);
      break;
  }
}

const sleepiestGuards = Object.entries(guardSleepTimes);
findSleepiestMinute(sleepiestGuards);

function findSleepiestMinute(sleepiestGuards) {
  let sleepiestGuard;
  let sleepiestMinute;
  let sleepiestMinuteCount = -1;
  for (let sleepyGuard of sleepiestGuards) {
    for (let i = 0; i < 60; i++) {
      let currentCount = 0;
      for (let shift of sleepyGuard[1].shifts) {
        if (shift[i]) {
          currentCount++;
        }
      }
      if (currentCount > sleepiestMinuteCount) {
        sleepiestMinuteCount = currentCount;
        sleepiestMinute = i;
        sleepiestGuard = sleepyGuard[0];
      }
    }
  }
  console.log(sleepiestGuard * sleepiestMinute);
}