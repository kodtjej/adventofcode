import { promises as fs } from 'fs';
const input = await fs.readFile('input', 'utf-8');
const inputData = input.split('\n');

function removeLetters(data) {
  const reg = /[^\d]/g;
  return data.map((d) => d.replace(reg, ''));
}

function getFirstAndLastNumbers(data) {
  return data.map((d) => `${d[0]}${d[d.length - 1]}`);
}

function summarize(data) {
  return data.reduce((d, v) => d + parseInt(v), 0);
}

async function part1() {
  let data = removeLetters(inputData);
  data = getFirstAndLastNumbers(data);
  data = summarize(data);

  console.log('part 1: ', data);
}

part1();

const words = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9 };

function getFirstNumber(word) {
  let result;

  outer: while (true) {
    const num = parseInt(word.substring(0, 1));
    if (!isNaN(num)) {
      result = num;
      break outer;
    }
    for (const [number, value] of Object.entries(words)) {
      const reg = `^${number}`;
      const r = new RegExp(reg);
      if (r.test(word)) {
        result = value;
        break outer;
      }
    }
    word = word.substring(1);
  }

  return result;
}

function getLastNumber(word) {
  let result;
  outer: while (true) {
    const num = parseInt(word.substring(word.length, word.length - 1));
    if (!isNaN(num)) {
      result = num;
      break outer;
    }
    for (const [number, value] of Object.entries(words)) {
      const reg = `${number}$`;
      const r = new RegExp(reg);
      if (r.test(word)) {
        result = value;
        break outer;
      }
    }
    word = word.substring(0, word.length - 1);
  }
  return result;
}

async function part2() {
  let data = inputData.map((d) => `${getFirstNumber(d)}${getLastNumber(d)}`);
  console.log(data);

  data = summarize(data);
  console.log('Part 2: ', data);
}

part2();
