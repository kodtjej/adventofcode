import { promises as fs } from 'fs'
const input = await fs.readFile('input', 'utf-8')
const inputData = input.split('\n')

function mippleInputData() {
  const col1 = []
  const col2 = []
  inputData
    .flatMap(i => i.split('  '))
    .forEach((val, index) => {
      if (index % 2 === 0) {
        col2.push(parseInt(val))
        return
      }
      col1.push(parseInt(val))
    })
  return [col1, col2]
}

function sum(nums) {
  return nums.reduce((acc, val) => acc + val, 0)
}

function part1() {
  const [col1, col2] = mippleInputData()
  col1.sort()
  col2.sort()
  const diffs = col1.map((val, index) => {
    return Math.abs(val - col2[index])
  })

  console.log(sum(diffs))
}

part1()

function part2() {
  const [col1, col2] = mippleInputData()
  const res = col1.map(val => {
    const foundInCol2 = col2.filter(v => v === val).length
    return val * (foundInCol2 ?? 0)
  })

  console.log(sum(res))
}

part2()
