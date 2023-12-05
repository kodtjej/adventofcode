import { promises as fs } from "fs";
const input = await fs.readFile("input", "utf-8");
const inputData = input.split("\r\n");
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
  console.log("part 1:",sum);
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

function part2() {
  let rows = inputData.map((s) => s.split(""));
  let coordinates = populateNumbers(rows);
  let sum = 0;
  rows.forEach((row, rowIndex) => {
    row.forEach((val, colIndex) => {
      let surroundingNumbers = [];
      if (val === "*") {
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
      coordinates.map(c => c.found = false);
    });
  });
  console.log("part 2:",sum);
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
