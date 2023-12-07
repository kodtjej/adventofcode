import { promises as fs } from "fs";

const input = await fs.readFile("input", "utf-8");

function part1() {
    const spaceRegex = /\s\s+/gm
  const data = input.split("\r\n");
  let numbers = data.map((n) => n.split(":")[1]);
  numbers = numbers.map((n) => n.split("|"));
  let cards = numbers.map((n) => ({
    winningNumbers: n[0]
      .trim()
      .replace(spaceRegex, " ")
      .split(" ")
      .map((v) => parseInt(v)),
    elfsNumbers: n[1]
      .trim()
      .replace(spaceRegex, " ")
      .split(" ")
      .map((v) => parseInt(v)),
    points: 0,
  }));
  cards.forEach((card) => {
    card.elfsNumbers.forEach((en) => {
      if (card.winningNumbers.includes(en)) {
        if (card.points === 0) {
          card.points = 1;
        } else {
          card.points *= 2;
        }
      }
    });
  });
  console.log(cards)
  console.log(cards.reduce((pv, cv) => (pv += cv.points), 0));
}

part1();
