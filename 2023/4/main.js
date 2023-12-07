import { promises as fs } from 'fs';

const input = await fs.readFile('input', 'utf-8');

function part1() {
  const spaceRegex = /\s\s+/gm;
  const data = input.split('\n');
  let numbers = data.map((n) => n.split(':')[1]);
  numbers = numbers.map((n) => n.split('|'));
  let cards = numbers.map((n) => ({
    winningNumbers: n[0]
      .trim()
      .replace(spaceRegex, ' ')
      .split(' ')
      .map((v) => parseInt(v)),
    elfsNumbers: n[1]
      .trim()
      .replace(spaceRegex, ' ')
      .split(' ')
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
  console.log(
    'part 1:',
    cards.reduce((pv, cv) => (pv += cv.points), 0)
  );
}

part1();

function part2() {
  const spaceRegex = /\s\s+/gm;
  const data = input.split('\n');
  let cards = data.map((n) => n.split(':'));
  cards = cards.map((n) => ({
    card: parseInt(n[0].match(/\d+/g), 10),
    count: 1,
    winningNumbers: n[1]
      .split('|')[0]
      .replace(spaceRegex, ' ')
      .trim()
      .split(' ')
      .map((num) => parseInt(num, 10)),
    elfsNumbers: n[1]
      .split('|')[1]
      .replace(spaceRegex, ' ')
      .trim()
      .split(' ')
      .map((num) => parseInt(num, 10)),
  }));

  cards.forEach((card, index) => {
    let wins = card.elfsNumbers.filter((en) => card.winningNumbers.includes(en));

    for (let i = index + 1; i <= index + wins.length; i++) {
      if (cards[i]) {
        cards[i].count += card.count;
      }
    }
  });

  let sumOfCards = 0;
  cards.forEach((c) => (sumOfCards += c.count));

  console.log('part 2:', sumOfCards);
}
part2();
