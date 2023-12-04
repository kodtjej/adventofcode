import { promises as fs } from 'fs';
const input = await fs.readFile('input', 'utf-8');
const inputData = input.split('\n');
const numberRegex = /\d+/;

function part1() {
  let rows = inputData.map((s) => s.split(''));
  const numberSet = new Set();

  rows.forEach((row, rowindex) => {
    row.forEach((val, colindex) => {
      if (val === '.' || numberRegex.test(val)) {
        return;
      }

      for (let i = colindex - 1; i <= colindex + 1; i++) {
        if (numberRegex.test(rows[rowindex - 1][i])) {
          numberSet.add(findNumber(rows[rowindex - 1], i));
        }

        if (numberRegex.test(rows[rowindex + 1][i])) {
          numberSet.add(findNumber(rows[rowindex + 1], i));
        }
      }

      if (numberRegex.test(row[colindex - 1])) {
        numberSet.add(findNumber(row, colindex - 1));
      }
      if (numberRegex.test(row[colindex + 1])) {
        numberSet.add(findNumber(row, colindex + 1));
      }
    });
  });

  let sum = 0;
  numberSet.forEach((n) => (sum += n));
  console.log(sum);
}

function findNumber(row, index) {
  let number = '';
  for (let i = index; i--; i < row.length) {
    const currentChar = row[i];
    if (!numberRegex.test(currentChar)) {
      break;
    }
    number = currentChar + number;
  }

  for (let i = index; i++; i < row.length) {
    const currentChar = row[i - 1];
    if (!numberRegex.test(currentChar)) {
      break;
    }
    number = number + currentChar;
  }

  console.log(number);

  return parseInt(number);
}

part1();
