import { promises as fs } from 'fs';
const input = await fs.readFile('input', 'utf-8');
const inputData = input.split('\n');
const numberRegex = /\d+/;
let rows = inputData.map((s) => s.split(''));

function part1() {
  // hitta siffrorna
  // hitta delar utifrån siffrorna för att avgöra om de ska vara med
  let numbers = [];
  rows.forEach((row, rowindex) => {
    for (let colindex = 0; colindex < row.length; colindex++) {
      if (numberRegex.test(row[colindex]) && isNextToPart(rowindex, colindex)) {
        const [num, lastIndex] = findNumber(row, colindex);

        numbers.push(num);
        colindex = lastIndex;
      }
    }
  });

  console.log(numbers.reduce((pv, cv) => pv + cv, 0));
}

function isNextToPart(rowindex, colindex) {
  const isPart = new RegExp(/[^\d.\w]/); //js throwing around undefineds xD
  for (let i = colindex - 1; i <= colindex + 1; i++) {
    if (rows[rowindex - 1] && isPart.test(rows[rowindex - 1][i])) {
      return true;
    }

    if (rows[rowindex + 1] && isPart.test(rows[rowindex + 1][i])) {
      return true;
    }
  }

  if (isPart.test(rows[rowindex][colindex - 1])) {
    return true;
  }

  if (isPart.test(rows[rowindex][colindex + 1])) {
    return true;
  }

  return false;
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
  let lastIndex = index;

  for (let i = index; i++; i < row.length) {
    const currentChar = row[i - 1];
    if (!numberRegex.test(currentChar)) {
      break;
    }
    lastIndex = i;
    number = number + currentChar;
  }
  console.log(number);
  return [parseInt(number), lastIndex];
}

part1();
