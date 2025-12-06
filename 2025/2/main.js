import { promises as fs } from 'fs'
const input = await fs.readFile('input', 'utf-8')
const inputData = input.split(',')

function part1() {
  const mappedInput = inputData.map(range =>
    range.split('-').map(id => parseInt(id)),
  )
  let sum = 0
  for (const range of mappedInput) {
    const start = range[0]
    const end = range[1]
    for (let i = start; i <= end; i++) {
      if (!isValidID(i.toString())) {
        sum = sum + i
      }
    }
  }
  console.log('part1: ', sum)
}

function isValidID(id) {
  if (id.substring(0, 1) === 0) return false

  if (id.length % 2 !== 0) {
    return true
  }
  const firstHalf = id.substring(0, id.length / 2)
  const secondHalf = id.substring(id.length / 2)
  if (firstHalf === secondHalf) return false

  return true
}

function part2() {
  const mappedInput = inputData.map(range =>
    range.split('-').map(id => parseInt(id)),
  )

  let sum = 0
  for (const range of mappedInput) {
    const start = range[0]
    const end = range[1]
    for (let i = start; i <= end; i++) {
      const stringi = i.toString()
      if (stringi.substring(0, 1) === '0') {
        sum += i
        continue
      }
      if (isRepeatedNumber(stringi)) {
        sum += i
        continue
      }
    }
  }
  console.log('part 2: ', sum)
}

function isRepeatedNumber(s) {
  const len = s.length
  if (len < 2) return false

  for (let k = 1; k <= Math.floor(len / 2); k++) {
    if (len % k !== 0) continue
    const base = s.slice(0, k)
    if (base.repeat(len / k) === s) return true
  }
  return false
}

part1()
part2()
