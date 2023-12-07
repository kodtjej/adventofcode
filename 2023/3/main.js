import { promises as fs } from "fs";
const input = await fs.readFile("input", "utf-8");
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

  console.log(
    'part 1:',
    numbers.reduce((pv, cv) => pv + cv, 0)
  );
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
  return [parseInt(number), lastIndex];
}

part1();
function part2() {
  let rows = inputData.map((s) => s.split(''));
  let coordinates = populateNumbers(rows);
  let sum = 0;
  rows.forEach((row, rowIndex) => {
    row.forEach((val, colIndex) => {
      let surroundingNumbers = [];
      if (val === '*') {
        const left = `${rowIndex}.${colIndex - 1}`;
        const right = `${rowIndex}.${colIndex + 1}`;
        const top = `${rowIndex - 1}.${colIndex}`;
        const bottom = `${rowIndex + 1}.${colIndex}`;
        const topLeft = `${rowIndex - 1}.${colIndex - 1}`;
        const topRight = `${rowIndex - 1}.${colIndex + 1}`;
        const bottomLeft = `${rowIndex + 1}.${colIndex - 1}`;
        const bottomRight = `${rowIndex + 1}.${colIndex + 1}`;

        coordinates = coordinates.map((coord) => {
          coord.indexes.map((i) => {
            switch (i) {
              case left:
              case right:
              case top:
              case bottom:
              case topLeft:
              case topRight:
              case bottomLeft:
              case bottomRight:
                if (!coord.found) {
                  surroundingNumbers.push(coord.value);
                  coord.found = true;
                }
            }
          });
          return coord;
        });

        if (surroundingNumbers.length === 2) {
          sum += surroundingNumbers[0] * surroundingNumbers[1];
        }
      }
      coordinates.map((c) => (c.found = false));
    });
  });
  console.log('part 2:', sum);
}

function populateNumbers(rows) {
  const numbers = [];
  rows.forEach((row, rowIndex) => {
    let currentNumber = "";
    let indexesForNumber = [];
    for (let colIndex = 0; colIndex <= row.length; colIndex++) {
      const val = row[colIndex];
      if (numberRegex.test(val)) {
        currentNumber += val;
        indexesForNumber.push(`${rowIndex}.${colIndex}`);
        continue;
      }
      if (currentNumber !== "") {
        numbers.push({
          value: parseInt(currentNumber),
          indexes: indexesForNumber,
          found: false,
        });
        currentNumber = "";
        indexesForNumber = [];
      }
    }
  });
  return numbers;
}

part2();