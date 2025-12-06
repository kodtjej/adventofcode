import { promises as fs } from 'fs'
const input = await fs.readFile('input', 'utf-8')
const inputData = input.trim().split('\n')

function part1() {
  const results = inputData.map(line => maxKDigitsPreservingOrder(line, 2))
  const sum = results.reduce((sum, cv) => (sum += cv), 0)
  console.log('part 1: ', sum)
}

function part2() {
  const results = inputData.map(line => maxKDigitsPreservingOrder(line, 12))
  const sum = results.reduce((sum, cv) => (sum += cv), 0)
  console.log('part 2: ', sum)
}

function maxKDigitsPreservingOrder(s, k) {
  if (s.length < k) return null

  const digits = [...s]
  let toDrop = digits.length - k
  const stack = []

  for (const d of digits) {
    while (toDrop > 0 && stack.length && stack[stack.length - 1] < d) {
      stack.pop()
      toDrop--
    }
    stack.push(d)
  }

  return Number(stack.slice(0, k).join(''))
}

part1()
part2()
