import { promises as fs } from 'fs'
const input = await fs.readFile('input', 'utf-8')
let inputData = input.trim().split('\n')
inputData = inputData.map(row => row.split(''))

function dayFour() {
  let part1Movable = 0
  let part2TotalMoves = 0
  let isFirstRound = true
  while (true) {
    let movedPieces = false
    for (let rowIndex = 0; rowIndex < inputData.length; rowIndex++) {
      const row = inputData[rowIndex]
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        if (inputData[rowIndex][colIndex] === '.') {
          continue
        }
        let sum = 0
        for (
          let currentRow = rowIndex - 1;
          currentRow <= rowIndex + 1;
          currentRow++
        ) {
          if (currentRow === -1) {
            // first row, cant compare with anything
            continue
          }
          if (currentRow === row.length) {
            // last row, cant compare with anything
            continue
          }
          for (
            let currentCol = colIndex - 1;
            currentCol <= colIndex + 1;
            currentCol++
          ) {
            //check if exists
            if (currentCol === -1) {
              // first column, cant compare
              continue
            }
            if (currentCol === inputData[currentRow].length) {
              // cant compare
              continue
            }
            if (currentRow === rowIndex && currentCol === colIndex) {
              // this is the position we're working on currently so we shouldn't check it
              continue
            }

            if (
              inputData[currentRow][currentCol] === '@' ||
              inputData[currentRow][currentCol] === 'x'
            ) {
              sum++
            }
          }
        }
        if (sum < 4) {
          part2TotalMoves++
          inputData[rowIndex][colIndex] = 'x'
          movedPieces = true
        }
      }
    }
    inputData = inputData.map(row =>
      row.map(cell => (cell === 'x' ? '.' : cell)),
    )
    if (isFirstRound) {
      part1Movable = part2TotalMoves
      isFirstRound = false
    }
    if (!movedPieces) {
      break
    }
  }
  console.log('part 1: ', part1Movable)
  console.log('part 2: ', part2TotalMoves)
}

dayFour()
