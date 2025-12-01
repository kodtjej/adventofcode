import { promises as fs } from 'fs'
const input = await fs.readFile('input', 'utf-8')
const inputData = input.split('\n')

const res = inputData.map(report => {
  report = report.split(' ').map(Number)
  let inc = report[0] < report[1]

  for (let i = 0; i < report.length; i++) {
    let diff = Math.abs(report[i] - report[i + 1])
    if (inc && report[i] > report[i + 1]) {
      return 0
    }
    if (!inc && report[i] < report[i + 1]) {
      return 0
    }
    if (diff > 3 || diff < 1) {
      return 0
    }
  }

  return 1
})

console.log(res.reduce((cur, sum) => cur + sum, 0))
